import React, { Component } from 'react'
import { connect } from 'react-redux'
import UUID from 'uuid/v4'

import { ProjectFetches } from '../Helpers/ProjectAdapter'

import { getMousePosition } from '../Helpers/MouseTracker'


class Canvas extends Component   {
    constructor(props)  {
        super(props)
        this.gridRef = React.createRef()
        this.canvasRef = React.createRef()
        this.props.setCanvasRef(this.canvasRef)
        this.props.setGridRef(this.gridRef)
    }

    componentDidMount= () =>    {
        this.props.setContext(this.canvasRef.current.getContext('2d'))
        this.props.setGridContext(this.gridRef.current.getContext('2d'))
        
        if (Object.keys(this.props.frames).length === 0 )    {
            let id = UUID()
            this.props.pushFrame({ id: id, base64: "" })
            this.props.selectFrame(id)
        }
        else    {
            this.props.selectFrame(this.props.frames[Object.keys(this.props.frames)[0].id])
        }
    }



    drawGrid= () =>  {
        const width = this.gridRef.current.width
        const height = this.gridRef.current.height

        this.props.gridContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)

        this.props.gridContext.beginPath()
        for (let x = 0; x <= width; x += this.props.pixelSize) {
            this.props.gridContext.moveTo(x, 0);
            this.props.gridContext.lineTo(x, height);
        }

        for (let y = 0; y <= height; y += this.props.pixelSize) {
            this.props.gridContext.moveTo(0, y);
            this.props.gridContext.lineTo(width, y);
        }

        this.props.gridContext.lineWidth = .5
        this.props.gridContext.stroke();
    }

    updateProject= () => {
        this.props.updateFrame({ id: this.props.selectedCanvas, base64: this.props.canvasRef.current.toDataURL() })
        console.log(this.props.projectName)
        ProjectFetches.fetchUpdateProject({
            projectId: this.props.projectId,
            frameId: this.props.selectedCanvas,
            token: localStorage.getItem('token'),
            name: this.props.projectName,
            frame: this.props.canvasRef.current.toDataURL()
        })
    }

    //===============================TOOLS================================

    draw= (position, original) => {
        // Makes sure that user isn't drawing over the same square repeatedly
        if (this.props.history.length === 0 || position.x !== this.props.history[this.props.history.length - 1].x || position.y !== this.props.history[this.props.history.length - 1].y){
            this.props.pushHistory({ action: "draw", x: position.x, y: position.y, originalX: original.x, originalY: original.y })
            this.props.context.fillStyle = 'rgb(' + this.props.color.r + ',' + this.props.color.g + ',' + this.props.color.b + ',' + this.props.color.a + ')'
            this.props.context.fillRect(position.x, position.y, this.props.pixelSize, this.props.pixelSize)
            
        }
    }

    erase= (position) => {
        this.props.pushHistory({ action: "draw", x: position.x, y: position.y })
        this.props.context.clearRect(position.x, position.y, this.props.pixelSize, this.props.pixelSize)
    }

    getTool= () => {
        switch(this.props.currentTool)  {
            case 'brush':
                return this.draw
            case 'eraser':
                return this.erase
            default:
                return this.draw
        }
    }
    //============================ENDTOOLS================================


    render()    {
        if (this.props.context !== null)    {
            this.props.gridContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
            if (this.props.grid === true) {
                this.drawGrid()
            }
        }
        
        return  (
            <div>
                <canvas
                    ref={this.gridRef}
                    height={this.props.canvasHeight + "px"}
                    width={this.props.canvasWidth + "px"}
                    style={{ border: "1px solid black", position: "absolute", left: "27.5px", zIndex:"9999" }}
                    onMouseDown={(e) => this.getTool()(getMousePosition(e), { x: e.clientX, y: e.clientY })}
                    onMouseMove={(e) => {
                        if (e.buttons === 1) {
                            this.getTool()(getMousePosition(e), { x: e.clientX, y: e.clientY })
                        }
                    }}
                    onMouseUp={() => this.updateProject()}
                ></canvas>
                <canvas 
                ref={this.canvasRef} 
                height={this.props.canvasHeight + "px"} 
                width={this.props.canvasWidth + "px"}
                style={{ border: "1px solid black", position: "absolute", left:"27.5px", zIndex:"0" }}
                ></canvas>
                <canvas
                    display="hidden"
                    height={this.props.canvasHeight + "px"}
                    width={this.props.canvasWidth + "px"}
                    style={{ zIndex: "-100" }}
                ></canvas>
            </div>
        )
    }
}



const mapDispatchToProps= (dispatch) =>   {
    return {
        setContext: (payload) => {
            dispatch({
                type: 'SET_CONTEXT',
                payload: payload
            })
        },
        setGridContext: (payload) => {
            dispatch({
                type: 'SET_GRID_CONTEXT',
                payload: payload
            })
        },
        pushHistory: (payload) => {
            dispatch({
                type: 'PUSH_HISTORY',
                payload: payload
            })
        },
        setCanvasRef: (payload) => {
            dispatch({
                type: 'SET_CANVAS_REF',
                payload: payload
            })
        },
        setGridRef: (payload) => {
            dispatch({
                type: 'SET_GRID_REF',
                payload: payload
            })
        },
        updateFrame: (payload) =>   {
            dispatch({
                type: 'UPDATE_FRAME',
                payload: payload
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
    }
}

const mapStateToProps= (state) => {
    return {
        context: state.canvas.context,
        gridContext: state.canvas.gridContext,
        pixelSize: state.canvas.pixelSize,
        grid: state.canvas.grid,
        currentTool: state.tools.currentTool,
        history: state.history.selectedHistory,
        canvasHeight: state.canvas.height,
        canvasWidth: state.canvas.width,
        canvasRef: state.canvas.canvasRef,
        color: state.tools.color,
        selectedCanvas: state.canvas.frameId,
        frames: state.history.frames,
        projectId: state.projects.projectId,
        projectName: state.projects.projectName
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)