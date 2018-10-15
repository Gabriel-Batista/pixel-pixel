import React, { Component } from 'react'
import { connect } from 'react-redux'

class ToolBox extends Component   {
    saveFrame= () => {
        
        this.props.pushFrame(this.props.canvasRef.current.toDataURL())
        this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
    }

    render() {
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