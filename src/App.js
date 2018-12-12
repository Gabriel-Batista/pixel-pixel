import React, { Component } from "react";

import Canvas from "./Components/Canvas";
import ToolBox from "./Components/ToolBox";
import Preview from "./Components/Preview";
import Frame from "./Components/Frame";
import Gif from "./Components/Gif";
import Login from "./Components/Buttons/LoginButton";
import Logout from "./Components/Logout";
import Projects from "./Components/Projects";
import SaveButton from "./Components/Buttons/SaveButton";
import GridButton from "./Components/Buttons/GridButton";
import NewButton from "./Components/Buttons/NewButton";

import { Grid, Segment, Input, Header, Modal, Button } from "semantic-ui-react";
import roundTo from "./Helpers/RoundingHelper.js";

import { ProjectFetches } from "./Helpers/ProjectAdapter";
import { UserFetches } from "./Helpers/UserAdapter";

import AppStyles from "./Styles/AppStyles";

import { connect } from "react-redux";
import SpriteSheetGen from "./Helpers/SpriteSheetGen";

class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    if (token) {
      this.props.userLoggedIn();

      UserFetches.fetchPersistUser(token)
        .then(res => {
          this.props.userLoggedIn(res.username);
        })
        .then(res =>
          ProjectFetches.fetchProjects().then(res =>
            this.props.pullProjects(res)
          )
        );
    }
    this.state = {
      titleEdit: false
    };
  }

  toggleTitleEdit = () => {
    this.setState({
      titleEdit: !this.state.titleEdit
    });
  };

  render() {
    return (
      <Grid style={{ marginTop: "auto" }} centered columns={16}>
        <Grid.Row centered columns={16}>
          {/* LEFT COLUMN */}
          <Grid.Column width={3} style={{ backgroundColor: "#1F1F1F" }}>
            {/* LOGO */}
            <Segment style={AppStyles.SegmentBGColor}>
              <Header
                as="h1"
                textAlign="center"
                style={{ marginTop: "10px", color: "#FFFFFF" }}
              >
                <Header.Content>--PIXEL-PIXEL--</Header.Content>
              </Header>
            </Segment>
            <Segment
              style={{
                ...AppStyles.SegmentBGColor,
                ...AppStyles.ToolBoxSegmentStyles
              }}
            >
              {/* TOOLBOX */}
              <Header
                textAlign="center"
                size="huge"
                style={{ marginTop: "30px" }}
              >
                <Header.Content style={{ color: "#FFFFFF" }}>
                  TOOLBOX
                </Header.Content>
              </Header>
              <ToolBox />
            </Segment>
          </Grid.Column>
          {/* CENTER COLUMN */}
          <Grid.Column columns={10} width={6}>
            {/* NAME INPUT */}
            <Segment style={AppStyles.SegmentBGColor}>
              {this.state.titleEdit ? (
                <Input
                  autoFocus
                  value={this.props.projectName}
                  onChange={e => this.props.changeProjectName(e.target.value)}
                  onBlur={() => {
                    this.toggleTitleEdit();
                    if (this.props.projectId !== null) {
                      ProjectFetches.fetchUpdateProject({
                        projectId: this.props.projectId,
                        frameId: this.props.selectedCanvas,
                        token: localStorage.getItem("token"),
                        name: this.props.projectName,
                        frame: this.props.canvasRef.current.toDataURL()
                      });
                    }
                  }}
                  size="massive"
                  label="Title:"
                  style={{ width: "100%" }}
                />
              ) : (
                <Header
                  as="h1"
                  size="huge"
                  textAlign="center"
                  onClick={this.toggleTitleEdit}
                  style={{ color: "#FFFFFF", margin: "15px 0px" }}
                >
                  {this.props.projectName}
                </Header>
              )}
            </Segment>
            {/* CANVAS */}
            <Segment style={{ backgroundColor: "#515151" }} textAlign="center">
              <Canvas />
            </Segment>
            {/* FRAMES */}
            <div style={AppStyles.SegmentBGColor}>
              <Header
                textAlign="left"
                size="large"
                style={{
                  marginTop: "25px",
                  marginLeft: "25px",
                  color: "#FFFFFF"
                }}
              >
                <Header.Content style={{ marginTop: "25px" }}>
                  FRAMES
                </Header.Content>
              </Header>
              <Frame />
            </div>
          </Grid.Column>
          {/* RIGHT COLUMN */}
          <Grid.Column width={3}>
            {/* GIF */}
            <Segment textAlign="center" style={AppStyles.SegmentBGColor}>
              <Header textAlign="center" size="large">
                <Header.Content style={{ color: "#FFFFFF" }}>
                  GIF
                </Header.Content>
              </Header>
              <Gif />
            </Segment>
            {/* PREVIEW */}
            <Segment textAlign="center" style={AppStyles.SegmentBGColor}>
              <Header textAlign="center" size="large">
                <Header.Content style={{ color: "#FFFFFF" }}>
                  PREVIEW
                </Header.Content>
              </Header>
              {this.props.canvasRef ? (
                <Preview
                  border
                  canvasToRender={this.props.canvasRef.current}
                  history={this.props.history}
                />
              ) : null}
            </Segment>
            <Segment style={AppStyles.SegmentBGColor}>
              <Header
                textAlign="center"
                size="huge"
                style={{
                  marginTop: "20px",
                  marginBottom: "40px",
                  color: "#FFFFFF"
                }}
              >
                <Header.Content>MENU</Header.Content>
              </Header>
              <NewButton />
              {this.props.status === "logged in" ? <SaveButton /> : null}
              {this.props.status === "logged in" ? <Projects /> : null}
              <Modal
              size="large"
                style={{ backgroundColor: "#333333", overflow: "hidden" }}
                trigger={
                  <Button
                    fluid
                    size="massive"
                    style={{
                      position: "relative",
                      backgroundColor: "#515151",
                      color: "#FFFFFF",
                      marginBottom: "25px"
                    }}
                  >
                    SPRITESHEET
                  </Button>
                }
              >
                  <SpriteSheetGen />
              </Modal>
              <GridButton />
              {this.props.status === "logged out" ? <Login /> : <Logout />}
            </Segment>
            <div id="spritesheet" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    canvasRef: state.canvas.canvasRef,
    history: state.history.selectedHistory,
    selectedFrame: state.canvas.frameId,
    status: state.users.status,
    projectName: state.projects.projectName,
    frames: state.history.frames
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeProjectName: payload => {
      dispatch({
        type: "CHANGE_PROJECT_NAME",
        payload: payload
      });
    },
    pullProjects: payload => {
      dispatch({
        type: "PULL_PROJECTS",
        payload: payload
      });
    },
    userLoggedIn: payload => {
      dispatch({
        type: "USER_LOGGED_IN",
        payload: payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
