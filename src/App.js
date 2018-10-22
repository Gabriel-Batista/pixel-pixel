import React, { Component } from 'react';
import './App.css';

import Canvas from './Components/Canvas'
import ToolBox from './Components/ToolBox'
import Preview from './Components/Preview'
import Frame from './Components/Frame'
import Gif from './Components/Gif'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Projects from './Components/Projects'

import { Grid, Segment, Input } from 'semantic-ui-react'
import roundTo from './Helpers/RoundingHelper'

import { ProjectFetches } from './Helpers/ProjectAdapter'
import { UserFetches } from './Helpers/UserAdapter'

import { connect } from 'react-redux'


class App extends Component {
    constructor(props)   {
        super(props)
        const token = localStorage.getItem("token")
        if(token)   {
            this.props.userLoggedIn()

            UserFetches.fetchPersistUser(token)
            .then(res => {this.props.userLoggedIn(res.username)})
            .then(res => ProjectFetches.fetchProjects()
            .then(res => this.props.pullProjects(res)))
            
        }
    }

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
                        <Segment>
                            <Input
                                value={this.props.projectName}
                                onChange={(e) => this.props.changeProjectName(e.target.value)}
                            ></Input>
                        </Segment>
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
        history: state.history.selectedHistory,
        selectedFrame: state.canvas.frameId,
        status: state.users.status,
        projectName: state.canvas.projectName,
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        changeProjectName: (payload) => {
            dispatch({
                type: 'CHANGE_PROJECT_NAME',
                payload: payload
            })
        },
        pullProjects: (payload) => {
            dispatch({
                type: 'PULL_PROJECTS',
                payload: payload
            })
        },
        userLoggedIn: (payload) => {
            dispatch({
                type: 'USER_LOGGED_IN',
                payload: payload
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
