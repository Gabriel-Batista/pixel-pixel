import React, { Component } from 'react';
import './App.css';

import _ from 'lodash'
import { Grid, Image, Segment } from 'semantic-ui-react'

class App extends Component {


    render() {
        return (
            <Grid columns='equal' style={{margin:"100px"}}>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Segment>
                            <div>LOGO</div>
                        </Segment>
                        <Segment>
                            <div>TOOLBOX</div>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column stretched>
                            <canvas height={"600px"} width={"800px"} style={{ border: "1px solid black" }}></canvas>
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
