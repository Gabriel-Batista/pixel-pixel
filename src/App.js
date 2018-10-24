import React, { Component } from 'react';

import Canvas from './Components/Canvas'
import ToolBox from './Components/ToolBox'
import Preview from './Components/Preview'
import Frame from './Components/Frame'
import Gif from './Components/Gif'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Projects from './Components/Projects'
import SaveButton from './Components/Buttons/SaveButton'
import GridButton from './Components/Buttons/GridButton'

import { Grid, Segment, Input, Header, Icon } from 'semantic-ui-react'
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
                    {/* LEFT COLUMN */}
                    <Grid.Column width={3}>
                        {/* LOGO */}
                        <Segment>
                            <div>LOGO</div>
                            {this.props.status === "logged out" ? <Login/> : <Logout/>}
                        </Segment>
                        <Segment>
                            {/* TOOLBOX */}
                            <Header textAlign="center" size='huge' style={{marginTop:"20px"}}>
                                <Header.Content>TOOLBOX</Header.Content>
                            </Header>
                            <ToolBox></ToolBox>
                        </Segment>
                        <Segment>
                            
                            {this.props.status === "logged in" ? <SaveButton/> : null}
                            {this.props.status === "logged in" ? <Projects/> : null}
                            <GridButton></GridButton>
                        </Segment>
                    </Grid.Column>
                    {/* CENTER COLUMN */}
                    <Grid.Column >
                        {/* NAME INPUT */}
                        <Segment>
                            <Input
                                value={this.props.projectName}
                                onChange={(e) => this.props.changeProjectName(e.target.value)}
                                size="massive"
                                label="Title:"
                                style={{width:"100%"}}
                            ></Input>
                        </Segment>
                        {/* CANVAS */}
                        <Segment style={{ position: "relative" }}>
                            <Canvas></Canvas>
                        </Segment>
                        {/* FRAMES */}
                        <Segment>
                            <Header textAlign="left" size='large' style={{ marginTop: "10px", marginLeft: "25px" }}>
                                <Header.Content>FRAMES</Header.Content>
                            </Header>
                            <Frame></Frame>
                        </Segment>
                    </Grid.Column>
                    {/* RIGHT COLUMN */}
                    <Grid.Column width={3}>
                        {/* GIF */}
                        <Segment textAlign="center">
                            <Header textAlign="center" size='large'>
                                <Header.Content>GIF</Header.Content>
                            </Header>
                            <Gif></Gif>
                        </Segment>
                        {/* PREVIEW */}
                        <Segment textAlign="center">
                            <Header textAlign="center" size='large'>
                                <Header.Content>PREVIEW</Header.Content>
                            </Header>
                            {this.props.canvasRef ?
                                    <Preview 
                                        border
                                        canvasToRender={this.props.canvasRef.current} 
                                        history={this.props.history}
                                        style={{margin:"0"}}
                                    ></Preview>
                                
                            : null}
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
        projectName: state.projects.projectName,
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
