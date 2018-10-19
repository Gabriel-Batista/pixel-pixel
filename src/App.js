import React, { Component } from 'react';
import './App.css';

import Canvas from './Components/Canvas'
import ToolBox from './Components/ToolBox'
import Preview from './Components/Preview'
import Frame from './Components/Frame'
import Gif from './Components/Gif'
import Login from './Components/Login'
import Logout from './Components/Logout'

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
                            {this.props.status === "logged out" ? <Login/> : <Logout/>}
                            {this.props.status === "logged in" ? <Projects/> : null}
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
                            {this.props.canvasRef ? 
                                <Preview 
                                    canvasToRender={this.props.canvasRef.current} 
                                    history={this.props.history}
                                ></Preview>
                            : null}
                        </Segment>
                        <Segment>
                            <div>LAYERS</div>
                                <Gif></Gif>
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
        history: state.history.history,
        selectedFrame: state.canvas.selectedFrame,
        status: state.users.status
        
    }
}

export default connect(mapStateToProps, null)(App)
