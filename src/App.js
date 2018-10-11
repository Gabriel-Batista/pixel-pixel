import React, { Component } from 'react';
import './App.css';

import Canvas from './Components/Canvas'

import _ from 'lodash'
import { Grid, Segment } from 'semantic-ui-react'

class App extends Component {


    render() {
        return (
            <Grid  style={{ marginTop: "auto" }} centered columns={2}>
                <Grid.Row centered>

                    <Grid.Column width={3}>
                        <Segment>
                            <div>LOGO</div>
                        </Segment>
                        <Segment>
                            <div>TOOLBOX</div>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column >
                            <Canvas></Canvas>
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
