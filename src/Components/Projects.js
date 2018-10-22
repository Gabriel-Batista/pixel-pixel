import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Modal, Grid } from 'semantic-ui-react'
import ProjectCard from './ProjectCard'

import { ProjectFetches } from '../Helpers/ProjectAdapter'

class Projects extends Component    {
    state = {
        open: false,
        username: "",
        password: ""
    }

    loadProject= (project) =>   {
        console.log(project)
        this.props.setProjectId(project.id)
        this.props.changeProjectName(project.name)
        ProjectFetches.fetchProjectFrames(project.id)
            .then(res => this.props.loadProject(res))
            .then(res => this.bringCanvasToFront(Object.keys(this.props.frames)[0]))
    }

    //TODO: refactor to call this function from <Frame/>
    bringCanvasToFront = (id) => {
        this.props.selectFrame(id)
        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)

        let tmpImg = new Image()
        tmpImg.src = this.props.frames[id].base64

        tmpImg.onload = () => {
            this.props.context.drawImage(tmpImg, 0, 0)

            this.props.previewContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
            this.props.previewContext.drawImage(tmpImg, 0, 0, (this.props.canvasWidth / 3), ((this.props.canvasHeight) / 3))
        }
    }

    renderProjects = () =>  {
        return this.props.projects.map((project, index) => {
            console.log(project)
            return <ProjectCard 
                        key={index}
                        name={project.name}
                handleClick={() => this.loadProject(project)}
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
            { this.props.status === 'logged in' ? <Button onClick={this.show('blurring')}>Open</Button> : null }
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content>
                    <Modal.Description >
                        <Grid textAlign='center'>
                            <ul>
                            {this.renderProjects()}
                            </ul>
                        </Grid>
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
                type: 'SET_SELECTED_FRAME',
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)