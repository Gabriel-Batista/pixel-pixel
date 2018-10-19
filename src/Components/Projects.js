import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProjectFetches } from '../Helpers/ProjectAdapter'
import { Button, Modal, Grid } from 'semantic-ui-react'
import ProjectCard from './ProjectCard'

class Projects extends Component    {
    state = {
        open: false,
        username: "",
        password: ""
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    renderProjects= () =>   {
        ProjectFetches.fetchProjects()
        .then(res => res.forEach(project => {
            return <ProjectCard name={project.name}></ProjectCard>
        }))
    }

    render()    {
        const { open, dimmer } = this.state
        console.log(this.props.status);
        
        return(
            <div>
            { this.props.status === 'logged in' ? <Button onClick={this.show('blurring')}>Open</Button> : null }
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content>
                    <Modal.Description >
                        <Grid textAlign='center'>
                            {/* "render projects" */}

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
        status: state.users.status
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