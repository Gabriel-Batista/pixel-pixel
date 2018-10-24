import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

class Gif extends Component {
    constructor(props)  {
        super(props)
        this.gifRef = React.createRef()
        this.state = {
            currentFrame: 0
        }
    }

    componentDidMount= () =>    {
        this.gifContext = this.gifRef.current.getContext('2d')
        this.renderGifFrame()
    }

    renderGifFrame= () =>   {
        setInterval(() => {
            if(Object.keys(this.props.frames).length !== 0)  {
                this.setState({
                    currentFrame: (this.state.currentFrame + 1) % Object.keys(this.props.frames).length
                })
                const tmpImg = new Image()
                tmpImg.src = Object.values(this.props.frames)[this.state.currentFrame].base64
                this.gifContext.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
                this.gifContext.drawImage(tmpImg,0, 0, this.props.canvasWidth/3, this.props.canvasHeight/3)
            }
        }, 1000)
            
    }

    render()    {
        return  (
            <Card raised style={{width: `${this.props.canvasWidth / 3 + 2}px`}}className="ui centered">
                <canvas
                    ref={this.gifRef}
                    height={(this.props.canvasHeight/3) + 2 + "px"}
                    width={(this.props.canvasWidth/3) + 2 + "px"}
                ></canvas>
            </Card>
        )
    }

}

const mapStateToProps= (state) => {
    return  {
        frames: state.history.frames,
        canvasWidth: state.canvas.width,
        canvasHeight: state.canvas.height,
        gif: state.history.gif,
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        saveGif: (payload) => {
            dispatch({
                type: 'SAVE_GIF',
                payload: payload
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gif)