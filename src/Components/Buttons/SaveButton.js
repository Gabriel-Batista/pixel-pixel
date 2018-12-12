import React from "react";
import { Button, Modal, Header, Icon } from "semantic-ui-react";
import { ProjectFetches } from "../../Helpers/ProjectAdapter";
import { connect } from "react-redux";

const SaveButton = props => {
  const saveFrame = () => {
    ProjectFetches.fetchCreateProject({
      token: localStorage.getItem("token"),
      name: props.projectName,
      frames: props.frames
    });

    ProjectFetches.fetchProjects().then(res => props.pullProjects(res));
  };

  return (
    <Modal
      trigger={
        <Button
          fluid
          onClick={() => {
            saveFrame();
          }}
          size="massive"
          style={{
            marginBottom: "25px",
            backgroundColor: "#515151",
            color: "#FFFFFF"
          }}
        >
          SAVE
        </Button>
      }
      basic
      size="small"
    >
      <Header icon="archive" content="Project Was Saved!" />
      <Modal.Content>
        <p>
          Your project has been save!
          Click on 'Projects' to view it!
        </p>
      </Modal.Content>
      
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    projectName: state.projects.projectName,
    frames: state.history.frames
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pullProjects: payload => {
      dispatch({
        type: "PULL_PROJECTS",
        payload: payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveButton);
