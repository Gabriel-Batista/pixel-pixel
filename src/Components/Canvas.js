import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getMousePosition } from '../Helpers/MouseTracker'


class Canvas extends Component   {
    constructor(props)  {
        super(props)
        this.canvasRef = React.createRef()
        this.gridRef = React.createRef()
        this.props.setCanvasRef(this.canvasRef)
        this.props.setGridRef(this.gridRef)
    }

    componentDidMount= () =>    {
        this.props.setContext(this.canvasRef.current.getContext('2d'))
        this.props.setGridContext(this.gridRef.current.getContext('2d'))
    }

    // updateCanvas= () =>     {
    //     this.props.history.each(step => {
    //         if(step.action === "draw")  {
    //             this.draw(step)
    //         }
    //     })
    // }

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

    //===============================TOOLS================================

    draw= (position) => {
        this.props.pushHistory({ action: "draw", x: position.x, y: position.y})
        this.props.context.fillRect(position.x, position.y, this.props.pixelSize, this.props.pixelSize)
    }

    erase= (position) => {
        this.props.pushHistory({ action: "draw", x: position.x, y: position.y })
        this.props.context.clearRect(position.x, position.y, this.props.pixelSize, this.props.pixelSize)
    }

    getTool= () => {
        switch(this.props.currentTool)  {
            case 'brush':
            console.log(this.draw)
                return this.draw
            case 'eraser':
                return this.erase
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
            <React.Fragment>
                <canvas 
                ref={this.canvasRef} 
                height={this.props.canvasHeight + "px"} 
                width={this.props.canvasWidth + "px"}
                style={{ border: "1px solid black", position:"absolute" }}
                onMouseDown={(e) => this.getTool()(getMousePosition(e))}
                ></canvas>
                <canvas
                    ref={this.gridRef}
                    height={this.props.canvasHeight + "px"}
                    width={this.props.canvasWidth + "px"}
                    style={{ border: "1px solid black"}}
                ></canvas>
            </React.Fragment>
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
            console.log(payload)
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
    }
}

const mapStateToProps= (state) => {
    return {
        context: state.canvas.context,
        gridContext: state.canvas.gridContext,
        pixelSize: state.canvas.pixelSize,
        grid: state.canvas.grid,
        currentTool: state.tools.currentTool,
        history: state.history.history,
        canvasHeight: state.canvas.height,
        canvasWidth: state.canvas.width

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)