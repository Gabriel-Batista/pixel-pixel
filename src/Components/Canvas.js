import React, { Component } from 'react'
import { connect } from 'react-redux'

class Canvas extends Component   {

    componentDidMount= () =>    {
        
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

    // var canvas = document.getElementById('myCanvas');
    // var context = canvas.getContext('2d');

    render()    {
        return  (
            <canvas 
            ref="canvas" 
            height={"800px"} 
            width={"800px"} 
            style={{ border: "1px solid black" }}
            onClick={(e) => this.props.pushHistory(this.getMousePosition(e))}
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

export default connect(null, mapDispatchToProps)(Canvas)