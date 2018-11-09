import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Modal, Card } from 'semantic-ui-react'
import ProjectCard from './ProjectCard'

import { ProjectFetches } from '../Helpers/ProjectAdapter'

class Projects extends Component    {
    state = {
        open: false,
        username: "",
        password: ""
    }

    loadProject= (project) =>   {
        this.props.setProjectId(project.id)
        this.props.changeProjectName(project.name)
        ProjectFetches.fetchProjectFrames(project.id)
            .then(res => this.props.loadProject(res))
            .then(res => this.bringCanvasToFront(Object.keys(this.props.frames)[0]))
    }

    //TODO: refactor to call this function from <Frame/>
    bringCanvasToFront = (id) => {
        this.props.previewContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        if (this.props.frames[id] !== undefined){
            this.props.selectFrame(id)

            let tmpImg = new Image()
            tmpImg.src = this.props.frames[id].base64

            tmpImg.onload = () => {
                this.props.context.drawImage(tmpImg, 0, 0)
                this.props.previewContext.drawImage(tmpImg, 0, 0, (this.props.canvasWidth / 3), ((this.props.canvasHeight) / 3))
            }
        }
        else {
            this.props.setFrameId("123")
        }
        
    }

    renderProjects = () =>  {
      console.log(this.props.projects)
        return this.props.projects.map((project, index) => {
            return <ProjectCard 
                        key={index}
                        name={project.name}
                        handleClick={() => this.loadProject(project)}
                        base64={project.frames[0].base64}
                    ></ProjectCard>
        })
    }

    show = dimmer => () => {
        ProjectFetches.fetchProjects()
        .then(res => this.props.pullProjects(res))
        .then(this.setState({ dimmer, open: true }))
    }

    close = () => this.setState({ open: false })

    render()    {
        const { open, dimmer } = this.state
        
        return(
            <div>
                {this.props.status === 'logged in' ? <Button fluid size="massive" style={{ marginBottom: "25px", backgroundColor: "#515151", color:"#FFFFFF"}} onClick={this.show('blurring')}>OPEN</Button> : null }
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content>
                    <Modal.Description >
                        <div textAlign='center'>
                            <Card.Group centered doubling stackable itemsPerRow={3}>
                            {this.renderProjects()}
                            </Card.Group>
                        </div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* "render buttons" */}
                </Modal.Actions>
            </Modal>
            </div>
        )
    }
}

const mapStateToProps= (state) =>   {
    return {
        status: state.users.status,
        projects: state.projects.projects,
        frames: state.history.frames,
        context: state.canvas.context,
        previewContext: state.canvas.previewContext,
        canvasHeight: state.canvas.height,
        canvasWidth: state.canvas.width
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        setProject: (payload) =>   {
            dispatch({
                type: "SET_PROJECT",
                payload: payload
            })
        },
        loadProject: (payload) => {
            dispatch({
                type: "LOAD_PROJECT",
                payload: payload
            })
        },
        selectFrame: (payload) => {
            dispatch({
                type: 'SET_FRAME_ID',
                payload: payload
            })
        },
        setProjectId: (payload) => {
            dispatch({
                type: 'SET_PROJECT_ID',
                payload: payload
            })
        },
        changeProjectName: (payload) => {
            dispatch({
                type: 'CHANGE_PROJECT_NAME',
                payload: payload
            })
        },
        pullProjects: (payload) => {
            dispatch({
                type: 'PULL_PROJECTS',
                payload: payload
            })
        },
        setFrameId: (payload) => {
            dispatch({
                type: "SET_FRAME_ID",
                payload: payload
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)