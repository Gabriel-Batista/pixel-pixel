import React from 'react'
import Styles from '../Styles/Styles'
import { Card, Grid, Button } from 'semantic-ui-react'
import { ProjectFetches } from '../Helpers/ProjectAdapter'
import { connect } from 'react-redux'

import Preview from './Preview'


const FrameCard= (props) => {
    

    return (
            <Card 
                raised 
                style={{ ...Styles.frameCard, width: `${props.canvasWidth / 3 + 2}px`}}
            >
                <Card.Header>
                    <Preview 
                        canvasToRender={props.tmpImg}
                        onClick={(e) => props.bringCanvasToFront(props.frame.id)}
                    ></Preview>
                </Card.Header>
                <Button 
                    onClick={() => props.deleteFrame(props.frame.id)}
                    style={Styles.deleteButton}
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