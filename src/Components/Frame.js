import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Grid } from 'semantic-ui-react';

import Preview from './Preview'

class Frame extends Component   {
    renderFrames= () => {
        return this.props.frames.map(frame => {
            return (
                <Card.Header style={{ display: "inline-block", marginLeft:"25px", float:"left"}}>
                    <Grid>
                        <Grid.Column width={4}>
                            <Preview></Preview>
                        </Grid.Column>
                        <Grid.Column width={12}>Hello World!</Grid.Column>
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

export default connect(mapStateToProps, null)(Frame)