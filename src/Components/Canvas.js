import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getMousePosition } from '../Helpers/MouseTracker'


class Canvas extends Component   {
    constructor(props)  {
        super(props)
        this.canvasRef = React.createRef()
        this.props.setCanvasRef(this.canvasRef)
    }

    

    componentDidMount= () =>    {
        console.log(this.refs)
        console.log(this.canvasRef)
        this.props.setContext(this.canvasRef.current.getContext('2d'))
        this.updateCanvas()
    }

    updateCanvas= () =>     {
        //Redraw canvas screen
    }



    drawGrid= () =>  {
        const width = this.canvasRef.current.width
        const height = this.canvasRef.current.height

        console.log("width:", width)
        console.log("height:", height)
        this.props.context.beginPath()
        for (let x = 0; x <= width; x += this.props.pixelSize) {
            this.props.context.moveTo(x, 0);
            this.props.context.lineTo(x, height);
        }

        for (let y = 0; y <= height; y += this.props.pixelSize) {
            this.props.context.moveTo(0, y);
            this.props.context.lineTo(width, y);
        }

        this.props.context.stroke();
    }

    drawOnScreen= (position) => {
        console.log("x:", position.x.roundTo(this.props.pixelSize))
        console.log("y:", position.y.roundTo(this.props.pixelSize))
        this.props.pushHistory({ x: position.x, y: position.y})
        this.props.context.fillRect(position.x, position.y, this.props.pixelSize, this.props.pixelSize)
    }



    render()    {
        console.log(this.props)
        if (this.props.context !== null) {
            this.drawGrid()
        }
        return  (
            <React.Fragment>
                <canvas 
                ref={this.canvasRef} 
                height={"816px"} 
                width={"816px"}
                style={{ border: "1px solid black" }}
                onMouseDown={(e) => this.drawOnScreen(getMousePosition(e))}
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
        }
    }
}

const mapStateToProps= (state) => {
    return {
        context: state.canvas.context,
        pixelSize: state.canvas.pixelSize
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)