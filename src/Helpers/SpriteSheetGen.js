import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Grid } from "semantic-ui-react";

class SpriteSheetGen extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.download = React.createRef();
  }

  componentDidMount = () => {
    this.ctx = this.canvas.current.getContext("2d");
    if (Object.keys(this.props.frames).length !== 0) {
      this.createSpriteSheet();
    }
  };

  componentDidUpdate = () => {
    if (Object.keys(this.props.frames).length !== 0) {
      this.createSpriteSheet();
    }
  };

  createSpriteSheet = () => {
    console.log(this.canvas);
    let canvas = this.canvas.current;
    let frameKeys = Object.keys(this.props.frames);
    let margin = 40;
    console.log(frameKeys.length);

    canvas.style.width = `${this.props.canvasWidth * frameKeys.length +
      margin * frameKeys.length}px`;
    canvas.style.height = `${this.props.canvasHeight + margin}px`;
    canvas.height = this.props.canvasHeight + margin;
    canvas.width =
      this.props.canvasWidth * frameKeys.length + margin * frameKeys.length;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      0,
      this.props.canvasWidth * frameKeys.length + margin * frameKeys.length,
      this.props.canvasHeight + margin / 2
    );

    frameKeys.forEach((key, index) => {
      let tmpImg = new Image();
      tmpImg.onload = () => {
        console.log(margin);
        this.ctx.drawImage(
          tmpImg,
          index * this.props.canvasWidth + (margin / 2) * index,
          margin / 2,
          this.props.canvasWidth,
          this.props.canvasHeight
        );
      };
      tmpImg.src = this.props.frames[key].base64;
    });
  };

  downloadSpriteSheet = () => {
    var download = this.download.current;
    var image = this.canvas.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
  };

  render() {
    return <React.Fragment>
        <Modal.Content style={{ backgroundColor: "#333333" }}>
          <Grid centered columns={2}>
            <Grid.Column textAlign="center" style={{ overflowX: "auto", width: "100vw" }}>
              <canvas ref={this.canvas}  />
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions style={{ backgroundColor: "#333333" }}>
          <a ref={this.download} download="spriteSheet.png">
            <Button fluid size="massive" style={{ position: "relative", backgroundColor: "#515151", color: "#FFFFFF" }} type="button" onClick={this.downloadSpriteSheet}>
              Download
            </Button>
          </a>
        </Modal.Actions>
      </React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    frames: state.history.frames,
    canvasWidth: state.canvas.width,
    canvasHeight: state.canvas.height
  };
};

export default connect(mapStateToProps)(SpriteSheetGen);
