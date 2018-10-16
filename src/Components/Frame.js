import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Grid } from 'semantic-ui-react';

import Preview from './Preview'

class Frame extends Component   {

    newFrame = () => {
        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        this.props.pushFrame(this.props.canvasRef.current.toDataURL())
        this.props.selectFrame(this.props.selectedCanvas + 1)
    }

    bringCanvasToFront= (index) =>   {
        this.props.selectFrame(index)

        let tmpImg = new Image()
        tmpImg.src = this.props.frames[index].canvasURL

        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        tmpImg.onload= () => {
            this.props.context.drawImage(tmpImg, 0, 0)

            this.props.previewContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
            this.props.previewContext.drawImage(tmpImg, 0, 0, (this.props.canvasWidth / 3), ((this.props.canvasHeight) / 3))
        }
    }

    renderFrames= () => {
        return this.props.frames.map((frame, index) => {
            let tmpImg = new Image()
            tmpImg.src = frame.canvasURL
            return (
                <Card.Header key={index} style={{ display: "inline-block", marginLeft:"25px", float:"left"}}>
                    <Grid
                        onClick={(e) => this.bringCanvasToFront(index)}>
                        <Grid.Column width={4}>
                            <Preview canvasToRender={tmpImg}></Preview>
                        </Grid.Column>
                        <Grid.Column width={12}>{index}</Grid.Column>
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
        selectedCanvas: state.canvas.selectedFrame
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame)