import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Grid } from 'semantic-ui-react';

import Preview from './Preview'

class Frame extends Component   {
    renderFrames= () => {
        return this.props.frames.map((frame, index) => {
            return (
                <Card.Header key={index} style={{ display: "inline-block", marginLeft:"25px", float:"left"}}>
                    <Grid
                        onClick={(e) => this.props.selectFrame(index)}>
                        <Grid.Column width={4}>
                            <Preview canvasToRender={frame.element}></Preview>
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
        frames: state.history.frames
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