import React, { Component } from 'react'
import { connect } from 'react-redux'

class ToolBox extends Component   {

    cloneCanvas= (oldCanvas) => {
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    context.drawImage(oldCanvas, 0, 0);

    return newCanvas;
}

    saveFrame= () => {
        this.props.pushFrame(this.cloneCanvas(this.props.canvasRef.current))
        console.log("context", this.props.context)
        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
    }

    render() {
        console.log(this.props)
        return  (
            <div>
                <button
                    onClick={this.props.selectBrush}>
                    Brush
                </button>
                <button
                    onClick={this.props.selectEraser}>
                    Eraser
                </button>
                <button
                    onClick={this.props.toggleGrid}>
                    Grid
                </button>
                <button
                    onClick={() => {this.saveFrame()}}>
                    Save
                </button>
            </div>
        )
    }
}

const mapDispatchToProps= (dispatch) =>   {
    return {
        selectBrush: () => {
            dispatch({
                type: "SELECT_BRUSH"
            })
        },
        selectEraser: () => {
            dispatch({
                type: "SELECT_ERASER"
            })
        },
        toggleGrid: () => {
            dispatch({
                type: 'TOGGLE_GRID'
            })
        },
        pushFrame: (payload) => {
            dispatch({
                type: 'PUSH_FRAME',
                payload: payload
            })
        }
        
    }
}

const mapStateToProps= (state) => {
    return {
        canvasRef: state.canvas.canvasRef,
        context: state.canvas.context,
        canvasWidth: state.canvas.width,
        canvasHeight: state.canvas.height
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox)