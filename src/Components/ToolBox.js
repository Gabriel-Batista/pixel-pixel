import React, { Component } from 'react'
import { connect } from 'react-redux'

class ToolBox extends Component   {

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
        }
        
    }
}

export default connect(null, mapDispatchToProps)(ToolBox)