import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Grid } from 'semantic-ui-react';

import Preview from './Preview'

class Frame extends Component   {
    bringCanvasToFront= (index) =>   {
        console.log(index)
        this.props.selectFrame(index)

        let tmpImg = new Image()
        tmpImg.src = this.props.frames[index].canvasURL

        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        tmpImg.onload= () => {
            this.props.context.drawImage(tmpImg, 0, 0)
        }
    }

    renderFrames= () => {
        return this.props.frames.map((frame, index) => {
            let tmpImg = new Image()
            tmpImg.src = frame.canvasURL
            tmpImg.onload= () => {
                console.log("onload")
            }
            console.log("outside")
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
            </div>
            
        )
    }
}

const mapStateToProps= (state) =>   {
    return {
        frames: state.history.frames,
        context: state.canvas.context,
        frames: state.history.frames,
        canvasWidth: state.canvas.width,
        canvasHeight: state.canvas.height
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectFrame: (payload) => {
        dispatch({
            type: 'SET_SELECTED_FRAME',
            payload: payload
        })
}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame)