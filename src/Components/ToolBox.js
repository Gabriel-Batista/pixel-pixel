import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SketchPicker, CirclePicker } from 'react-color'
import { ProjectFetches } from '../Helpers/ProjectAdapter'
import { Button, Grid } from 'semantic-ui-react'
import Styles from '../Styles/Styles'

class ToolBox extends Component   {
    saveFrame= () => {
        ProjectFetches.fetchCreateProject({
            token: localStorage.getItem('token'),
            name: this.props.projectName,
            frames: this.props.frames
        })

        ProjectFetches.fetchProjects()
        .then(res => this.props.pullProjects(res))
    }

    handleChangeComplete = (color) => {
        console.log(color.rgb)
        this.props.selectColor(color.rgb)
    };

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
                    <Button
                        fluid
                        onClick={this.props.toggleGrid}
                        size="massive"
                        style={Styles.toolsButton}
                    >GRID</Button>
                    <Button
                        fluid
                        onClick={() => { this.saveFrame() }}
                        size="massive"
                        style={Styles.toolsButton}
                    >SAVE</Button>
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
        pullProjects: (payload) => {
            dispatch({
                type: 'PULL_PROJECTS',
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
        frames: state.history.frames,
        projectName: state.projects.projectName
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox)