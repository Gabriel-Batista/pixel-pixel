import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const ProjectCard = (props) => {
    return (
        <Card raised onClick={props.handleClick}>
            <Image src={props.base64} />
            <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>
                    <span>Frames:</span>
                </Card.Meta>
                <Card.Description></Card.Description>
            </Card.Content>
        </Card>
    )
}

export default ProjectCard