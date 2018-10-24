import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { ProjectFetches } from '../../Helpers/ProjectAdapter'
import UUID from 'uuid/v4'


const NewButton = (props) =>    {
    const newProject= () => {
        props.context.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
        props.clearHistory()
        props.clearProjects()
        newFrame()
    }

    //TODO: Remove this and pass reference from frame component
    const newFrame = () => {
        const id = UUID()
        props.newFrame(id)

        // this.props.updateFrame({ id: this.props.selectedFrame, base64: this.props.canvasRef.current.toDataURL()})
        props.context.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
        props.selectFrame(id)
        if (props.projectId !== null) {
            ProjectFetches.fetchCreateFrame({ project_id: props.projectId, frame_id: id, base64: "" })
        }
    }

    return (
        <Button
            fluid
            size="massive"
            onClick={newProject}
            style={{backgroundColor:"#515151", color:"#FFFFFF", marginBottom:"25px"}}
        >NEW</Button>
    )
}

const mapStateToProps= (state) =>   {
    return {
        context: state.canvas.context,
        canvasWidth: state.canvas.width,
        canvasHeight: state.canvas.height,
        projectId: state.projects.projectId
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        clearHistory: () => {
            dispatch({
                type: "CLEAR_HISTORY"
            })
        },
        clearProjects: () => {
            dispatch({
                type: "CLEAR_PROJECTS"
            })
        },
        newFrame: (payload) => {
            dispatch({
                type: "NEW_FRAME",
                payload: payload
            })
        },
        selectFrame: (payload) => {
            dispatch({
                type: 'SET_FRAME_ID',
                payload: payload
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewButton)