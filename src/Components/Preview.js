import React, { Component } from 'react'
import { connect } from 'react-redux'

class Preview extends Component   {
    constructor(props)  {
        super(props)
        this.previewRef = React.createRef()
        
        this.state = {
            previewContext: null
        }
    }
    
    componentDidMount= () => {
        if (this.props.previewContext === null) {
            this.props.setPreviewContext(this.previewRef.current.getContext('2d'))
        }
        console.log(this.props.selectedFrame)
        this.setState({
            previewContext: this.previewRef.current.getContext('2d')
        })
    }

    componentDidUpdate= (prevProps) =>   {
        this.state.previewContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        if(this.props.canvasToRender.tagName === 'IMG') {
            this.props.canvasToRender.onload = () => {
                this.state.previewContext.drawImage(this.props.canvasToRender, 0, 0, (this.props.canvasWidth / 3), ((this.props.canvasHeight) / 3))
            }
        }
        else    {
            this.state.previewContext.drawImage(this.props.canvasToRender, 0, 0, (this.props.canvasWidth / 3), ((this.props.canvasHeight) / 3))
        }
    }

    render()    {
        return (
            <canvas
                ref={this.previewRef}
                height={(this.props.canvasHeight/3) + 1 + "px"}
                width={(this.props.canvasWidth/3) + "px"}
                style={{ border: "1px solid black"}}
            ></canvas>
        )
    }
}

const mapStateToProps= (state) =>   {
    return {
        canvasHeight: state.canvas.height,
        canvasWidth: state.canvas.width,
        previewContext: state.canvas.previewContext
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        setPreviewContext: (payload) => {
            dispatch({
                type: "SET_PREVIEW_CONTEXT",
                payload: payload
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)