import React, { Component } from 'react';
import './App.css';

import Canvas from './Components/Canvas'
import ToolBox from './Components/ToolBox'
import Preview from './Components/Preview'
import Frame from './Components/Frame'

import _ from 'lodash'
import { Grid, Segment } from 'semantic-ui-react'
import roundTo from './Helpers/RoundingHelper'

import { connect } from 'react-redux'

class App extends Component {


    render() {
        
        return (
            <Grid  style={{ marginTop: "auto" }} centered columns={3}>
                <Grid.Row centered>

                    <Grid.Column width={3}>
                        <Segment>
                            <div>LOGO</div>
                        </Segment>
                        <Segment>
                            <div>TOOLBOX</div>
                            <ToolBox></ToolBox>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column >
                        <Segment style={{ position: "relative" }}>
                            <Canvas></Canvas>
                        </Segment>
                        <Segment>
                            <div>FRAMES</div>
                            <Frame></Frame>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <Segment>
                            <div>PREVIEW</div>
                            {this.props.canvasRef ? <Preview canvasToRender={this.props.canvasRef.current}></Preview>: null}
                        </Segment>
                        <Segment>
                            <div>LAYERS</div>
                        </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps= (state) =>   {
    return {
        canvasRef: state.canvas.canvasRef,
    }
}

export default connect(mapStateToProps)(App)
