import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SketchPicker, CirclePicker } from 'react-color'
import { ProjectFetches } from '../Helpers/ProjectAdapter'
import { Button, Grid } from 'semantic-ui-react'
import Styles from '../Styles/Styles'

class ToolBox extends Component   {
    handleChangeComplete = (color) => {
        console.log(color.rgb)
        this.props.selectColor(color.rgb)
    };

//                    BLACK       RED       GREEN      BLUE      YELLOW      BROWN
    colorPalette = ['#000000', '#850101', '#002F00', '#00002F', '#2F2F00', '#2D1502',
                    '#454545', '#A40000', '#008C00', '#00008C', '#8C8C00', '#4B2303', 
                    '#8B8B8B', '#FF0000', '#00E800', '#0000E8', '#E8E800', '#793705', 
                    '#D0D0D0', '#FF7373', '#45FF45', '#4545FF', '#FFFF45', '#A54B06', 
                    '#FFFFFF', '#FFE7E7', '#E7FFE7', '#E7E7FF', '#FFFFA2', '#CD9C77',]

    render() {
        return  (
            <Grid>
                <Grid.Row width={7}>
                    <div style={Styles.colorPicker}>
                        <CirclePicker
                            circleSize={90}
                            width="100%"
                            height="25em"
                            color={this.props.color}
                            colors={this.colorPalette}
                            onChangeComplete={this.handleChangeComplete}
                        />
                    </div>
                    
                </Grid.Row>
                <Grid.Row width={7}>
                    <Button
                        fluid
                        onClick={this.props.selectBrush}
                        size="massive"
                        style={Styles.toolsButton}
                    >BRUSH</Button>
                    <Button
                        fluid
                        onClick={this.props.selectEraser}
                        size="massive"
                        style={Styles.toolsButton}
                    >ERASER</Button>
                    
                </Grid.Row>
            </Grid>
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
        pushFrame: (payload) => {
            dispatch({
                type: 'PUSH_FRAME',
                payload: payload
            })
        },
        selectFrame: (payload) => {
            dispatch({
                type: 'SET_FRAME_ID',
                payload: payload
            })
        },
        selectColor: (payload) => {
            dispatch({
                type: 'SELECT_COLOR',
                payload: payload
            })
        },
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
        frames: state.history.frames,
        projectName: state.projects.projectName
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox)