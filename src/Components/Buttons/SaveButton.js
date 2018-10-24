import React from 'react'
import { Button } from 'semantic-ui-react'
import { ProjectFetches } from '../../Helpers/ProjectAdapter'
import { connect } from 'react-redux';
import Styles from '../../Styles/Styles'

const SaveButton = (props) =>   {
    const saveFrame = () => {
        ProjectFetches.fetchCreateProject({
            token: localStorage.getItem('token'),
            name: props.projectName,
            frames: props.frames
        })

        ProjectFetches.fetchProjects()
            .then(res => props.pullProjects(res))
    }

    return (
        <Button
            fluid
            onClick={() => { saveFrame() }}
            size="massive"
            style={{ marginBottom: "25px", backgroundColor: "#515151", color: "#FFFFFF"}}
        >SAVE</Button>
    )
}

const mapStateToProps = (state) =>  {
    return {
        projectName: state.projects.projectName,
        frames: state.history.frames
    }
}

const mapDispatchToProps = (dispatch) =>    {
    return  {
        pullProjects: (payload) => {
            dispatch({
                type: 'PULL_PROJECTS',
                payload: payload
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton)