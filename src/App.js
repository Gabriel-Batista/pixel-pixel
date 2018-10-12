import React, { Component } from 'react';
import './App.css';

import Canvas from './Components/Canvas'

import _ from 'lodash'
import { Grid, Segment } from 'semantic-ui-react'
import roundTo from './Helpers/RoundingHelper'

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
                        <Segment>
                            <Canvas></Canvas>
                        </Segment>
                        <Segment>
                            <div>FRAMES</div>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <Segment>
                            <div>PREVIEW</div>
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

export default App;
