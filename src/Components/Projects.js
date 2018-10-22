import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Modal, Grid } from 'semantic-ui-react'
import ProjectCard from './ProjectCard'

class Projects extends Component    {
    state = {
        open: false,
        username: "",
        password: ""
    }

    renderProjects = () =>  {
        return this.props.projects.map(project => {
            return <ProjectCard name={project.name}></ProjectCard>
        })
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
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
        projects: state.projects.projects
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        setProject: (payload) =>   {
            dispatch({
                type: "SET_PROJECT",
                payload: payload
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)