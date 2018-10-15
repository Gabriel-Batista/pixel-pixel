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
        this.setState({
            previewContext: this.previewRef.current.getContext('2d')
        })
    }

    componentDidUpdate= () =>   {
        this.state.previewContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
        if(this.props.canvasToRender !== null)   {
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
        canvasRef: state.canvas.canvasRef,
        canvasHeight: state.canvas.height,
        canvasWidth: state.canvas.width,
        history: state.history.history
    }
}

export default connect(mapStateToProps, null)(Preview)