import React, { Component } from 'react'
import { connect } from 'react-redux'
import roundToNearest from '../Helpers/roundingHelper'

class Canvas extends Component   {

    componentDidMount= () =>    {
        this.props.setContext(this.refs.canvas.getContext('2d'))
        this.updateCanvas()
    }

    updateCanvas= () =>     {
        //Redraw canvas screen
    }

    getMousePosition= (e) => {
        let rect = this.refs.canvas.getBoundingClientRect();
        return {
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top)
        }
        
    }

    drawOnScreen= (position) => {
        console.log("x:", position.x.roundTo(24))
        console.log("y:", position.y.roundTo(24))
        this.props.pushHistory(position)
        this.props.context.fillRect(position.x.roundTo(24), position.y.roundTo(24), 24, 24)
    }

    // var canvas = document.getElementById('myCanvas');
    // var context = canvas.getContext('2d');

    render()    {
        return  (
            <canvas 
            ref="canvas" 
            height={"800px"} 
            width={"800px"} 
            style={{ border: "1px solid black" }}
            onMouseDown={(e) => this.drawOnScreen(this.getMousePosition(e))}
            ></canvas>
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
        }
    }
}

const mapStateToProps= (state) => {
    return {
        context: state.context
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)

Number.prototype.roundTo = function (num) {
    var remainder = this % num;
    if (remainder <= (num / 2)) {
        return this - remainder;
    } else {
        return this + num - remainder - 24;
    }
}