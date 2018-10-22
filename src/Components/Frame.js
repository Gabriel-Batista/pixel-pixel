import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Grid, Button } from 'semantic-ui-react';
import UUID from 'uuid/v4'
import { ProjectFetches } from '../Helpers/ProjectAdapter'

import Preview from './Preview'

class Frame extends Component   {

    newFrame = () => {
        const id = UUID()
        this.props.newFrame(id)

        // this.props.updateFrame({ id: this.props.selectedFrame, base64: this.props.canvasRef.current.toDataURL()})
        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        this.props.selectFrame(id)
    }

    deleteFrame= (id) => {
        ProjectFetches.fetchDeleteFrame(id)
        .then(res => this.props.deleteFrame(id))
        this.props.setFrameId("123")
    }

    bringCanvasToFront= (id) =>   {
        this.props.selectFrame(id)

        let tmpImg = new Image()
        console.log("focusFrame:", this.props.frames)
        tmpImg.src = this.props.frames[id].base64

        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        tmpImg.onload= () => {
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
                <Card.Header key={frame.id} data-id={frame.id} style={{ display: "inline-block", marginLeft:"25px", float:"left"}}>
                    <Grid
                        onClick={(e) => this.bringCanvasToFront(frame.id)}>
                        <Grid.Column width={4}>
                            <Preview canvasToRender={tmpImg}></Preview>
                            <Button onClick={() => this.deleteFrame(frame.id)}></Button>
                        </Grid.Column>
                        <Grid.Column width={12}>{frame.id}</Grid.Column>
                    </Grid>
                </Card.Header>
            )
        })
    }

    render()    {
        return  (
            <div style={{ overflowX: "scroll", display: "flex", flexDirection: "row" }}>
                {this.renderFrames()}
                <button onClick={this.newFrame}>NEW</button>
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
        frameId: state.canvas.frameId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectFrame: (payload) => {
            dispatch({
                type: 'SET_SELECTED_FRAME',
                payload: payload
            })
        },
        pushFrame: (payload) => {
            dispatch({
                type: 'PUSH_FRAME',
                payload: payload
            })
        },
        setFrameId: (payload) => {
            dispatch({
                type: "SET_FRAME_ID",
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