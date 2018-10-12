import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Grid } from 'semantic-ui-react';

import Preview from './Preview'

class Frame extends Component   {
    renderFrames= () => {
        return this.props.frames.map(frame => {
            return (
                <Card.Header style={{ display: "inline-block", }}>
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
            <React.Fragment>
                {this.renderFrames()}
            </React.Fragment>
            
        )
    }
}

const mapStateToProps= (state) =>   {
    return {
        frames: state.history.frames
    }
}

export default connect(mapStateToProps, null)(Frame)