import React from 'react'
import FrameCardStyles from '../Styles/FrameCardStyles'
import { Card, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Preview from './Preview'


const FrameCard= (props) => {
    

    return (
            <Card 
                raised
                style={FrameCardStyles.frameCard}
            >
                <Card.Header onClick={(e) => props.bringCanvasToFront(props.frame.id)}>
                    <Preview style={{height: "100%", width: "100%"}}
                        canvasToRender={props.tmpImg}
                    ></Preview>
                </Card.Header>
                <Button 
                    onClick={() => props.deleteFrame(props.frame.id)}
                    size="massive"
                    style={FrameCardStyles.deleteButton}
                >DELETE</Button>
            </Card>
    )
}

const mapStateToProps= (state) =>   {
    return {
        canvasWidth: state.canvas.width,
        cavnasHeight: state.canvas.height,
        frames: state.history.frames
    }
}

export default connect(mapStateToProps, null)(FrameCard)