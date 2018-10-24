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
    colorPalette = ["#000000", "#FFFF00", "#1CE6FF", "#FF34FF", "#FF4A46", "#008941", "#006FA6", "#A30059",
        "#FFDBE5", "#7A4900", "#0000A6", "#63FFAC", "#B79762", "#004D43", "#8FB0FF", "#997D87",
        "#5A0007", "#809693", "#FEFFE6", "#1B4400", "#4FC601", "#3B5DFF", "#4A3B53", "#FF2F80",
        "#61615A", "#BA0900", "#6B7900", "#00C2A0", "#FFAA92", "#FF90C9", "#B903AA", "#D16100",
        "#DDEFFF", "#000035", "#7B4F4B", "#A1C299", "#300018", "#0AA6D8", "#013349", "#00846F",
        "#372101", "#FFB500", "#C2FFED", "#A079BF", "#CC0744", "#C0B9B2", "#C2FF99", "#001E09",
        "#00489C", "#6F0062", "#0CBD66", "#EEC3FF", "#456D75", "#B77B68", "#7A87A1", "#788D66",
        "#885578", "#FAD09F", "#FF8A9A", "#D157A0",]

        // ["#A04049", "#407059", "#D14030", "#57C848", "#000000", "#F7C848", "#695971", "#D05037",
        //  "#"]

    render() {
        return  (
            <React.Fragment>
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
            </Grid>
                    <Button
                        fluid
                        onClick={this.props.selectBrush}
                        size="massive"
                        style={{ marginTop: "75px", backgroundColor: "#515151", color: "#FFFFFF" }}
                    >BRUSH</Button>
                    <Button
                        fluid
                        onClick={this.props.selectEraser}
                        size="massive"
                        style={{ marginTop: "25px", backgroundColor: "#515151", color: "#FFFFFF"}}
                    >ERASER</Button>
                </React.Fragment>

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