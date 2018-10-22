import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'
import { ProjectFetches } from '../Helpers/ProjectAdapter'

class ToolBox extends Component   {
    saveFrame= () => {
        // this.props.pushFrame(this.props.canvasRef.current.toDataURL())
        // this.props.context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        // this.props.selectFrame(this.props.selectedCanvas + 1)
        console.log(this.props.frames)
        ProjectFetches.fetchCreateProject({
            token: localStorage.getItem('token'),
            frames: this.props.frames
        })
    }

    handleChangeComplete = (color) => {
        console.log(color.rgb)
        this.props.selectColor(color.rgb)
    };

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
                <SketchPicker
                    color={this.props.color}
                    onChangeComplete={this.handleChangeComplete}
                    />
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
        },
        selectFrame: (payload) => {
            dispatch({
                type: 'SET_SELECTED_FRAME',
                payload: payload
            })
        },
        selectColor: (payload) => {
            dispatch({
                type: 'SELECT_COLOR',
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
        canvasHeight: state.canvas.height,
        selectedCanvas: state.canvas.selectedCanvas,
        color: state.tools.color,
        frames: state.history.frames
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox)