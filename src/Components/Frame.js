import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react';
import UUID from 'uuid/v4'
import { ProjectFetches } from '../Helpers/ProjectAdapter'
import Styles from '../Styles/Styles'

import FrameCard from './FrameCard'

class Frame extends Component   {

    newFrame = () => {
        const id = UUID()
        this.props.newFrame(id)

        // this.props.updateFrame({ id: this.props.selectedFrame, base64: this.props.canvasRef.current.toDataURL()})
        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        this.props.selectFrame(id)
        ProjectFetches.fetchCreateFrame({project_id: this.props.projectId, frame_id: id, base64: ""})
    }

    deleteFrame = (id) => {
        ProjectFetches.fetchDeleteFrame(id)
        .then(res => this.props.deleteFrame(id))
        this.bringCanvasToFront(Object.values(this.props.frames)[0].id)
    }

    bringCanvasToFront = (id) => {
        console.log("Hit")
        this.props.selectFrame(id)

        let tmpImg = new Image()
        tmpImg.src = this.props.frames[id].base64

        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        tmpImg.onload = () => {
            this.props.context.drawImage(tmpImg, 0, 0)

            this.props.previewContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
            this.props.previewContext.drawImage(tmpImg, 0, 0, (this.props.canvasWidth / 3), ((this.props.canvasHeight) / 3))
        }
    }

    renderFrames= () => {
        return Object.values(this.props.frames).map((frame) => {
            let tmpImg = new Image()
            tmpImg.src = frame.base64
            return (
                <FrameCard 
                    frame={frame} 
                    tmpImg={tmpImg} 
                    deleteFrame={this.deleteFrame} 
                    bringCanvasToFront={this.bringCanvasToFront}
                ></FrameCard>
            )
        })
    }

    render()    {
        return  (
            <div style={{ overflowX: "scroll", display: "flex", flexDirection: "row" }}>
                {this.renderFrames()}
                <Button 
                    icon
                    onClick={this.newFrame}
                    style={Styles.newFrameButton}
                >
                    <Icon 
                        name="add" 
                        size="huge"
                        style={{verticalAlign:"middle"}}
                    ></Icon>
                </Button>
            </div>
            
        )
    }
}

const mapStateToProps= (state) =>   {
    return {
        frames: state.history.frames,
        canvasRef: state.canvas.canvasRef,
        context: state.canvas.context,
        canvasWidth: state.canvas.width,
        canvasHeight: state.canvas.height,
        previewContext: state.canvas.previewContext,
        selectedFrame: state.canvas.selectedFrame,
        frameId: state.canvas.frameId,
        projectId: state.projects.projectId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectFrame: (payload) => {
            dispatch({
                type: 'SET_FRAME_ID',
                payload: payload
            })
        },
        pushFrame: (payload) => {
            dispatch({
                type: 'PUSH_FRAME',
                payload: payload
            })
        },
        newFrame: (payload) => {
            dispatch({
                type: "NEW_FRAME",
                payload: payload
            })
        },
        updateFrame: (payload) => {
            dispatch({
                type: "UPDATE_FRAME",
                payload: payload
            })
        },
        deleteFrame: (payload) => {
            dispatch({
                type: "DELETE_FRAME",
                payload: payload
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame)