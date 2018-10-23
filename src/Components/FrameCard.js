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
                onClick={(e) => props.bringCanvasToFront(props.frame.id)}
                style={{ ...Styles.frameCard, width: `${props.canvasWidth / 3 + 2}px`}}
            >
                <Preview canvasToRender={props.tmpImg}></Preview>
                <Card.Header 
                    key={props.frame.id} 
                    data-id={props.frame.id} 
                    style={{ display: "inline-block", marginLeft: "25px", float: "left" }}
                >
                    <Grid>
                        <Grid.Column width={4} style={{ padding: "25px" }}>
                            <Button onClick={() => props.deleteFrame(props.frame.id)}>DELETE</Button>
                        </Grid.Column>
                        <Grid.Column width={12}>{props.frame.id}</Grid.Column>
                    </Grid>
                </Card.Header>
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