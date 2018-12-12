import React, { Component } from 'react'
import { connect } from 'react-redux'

class SpriteSheetGen extends Component{
  constructor(props)  {
    super(props)

    this.canvas = React.createRef()
  }

  componentDidMount = () => {
    this.ctx = this.canvas.current.getContext('2d')
    if (Object.keys(this.props.frames).length !== 0) {
      this.createSpriteSheet()
    }
  }

  componentDidUpdate = () =>  {
    if(Object.keys(this.props.frames).length !== 0) {
      this.createSpriteSheet()
    }

  }

  createSpriteSheet = () => {
  console.log(this.canvas)
  let canvas = this.canvas.current
  let frameKeys = Object.keys(this.props.frames)
  let margin = 40;
  console.log(frameKeys.length)

  canvas.style.width =  `${(this.props.canvasWidth * frameKeys.length) + margin * frameKeys.length}px`
  canvas.style.height = `${this.props.canvasHeight + margin}px`
  canvas.height = this.props.canvasHeight + margin
  canvas.width = (this.props.canvasWidth * frameKeys.length) + margin * frameKeys.length

  this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  this.ctx.fillStyle = "white"
  this.ctx.fillRect(0, 0, (this.props.canvasWidth * frameKeys.length) + margin * frameKeys.length, this.props.canvasHeight + margin);

  frameKeys.forEach((key, index) =>  {
    let tmpImg = new Image();
    tmpImg.onload = () => {
      console.log(margin)
      this.ctx.drawImage(tmpImg, (index * this.props.canvasWidth) + (margin / 2) * index, (margin / 2), this.props.canvasWidth, this.props.canvasHeight);
    }
    tmpImg.src = this.props.frames[key].base64
    
  })
  }

  render()  {

    return  (
    <canvas ref={this.canvas}/>
    )}
}

const mapStateToProps = (state) =>  {
  return  {
    frames: state.history.frames,
    canvasWidth: state.canvas.width,
    canvasHeight: state.canvas.height,
  }
}

export default connect(mapStateToProps)(SpriteSheetGen);
