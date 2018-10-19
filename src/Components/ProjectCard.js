import React from 'react'
import { Card } from 'semantic-ui-react'

const ProjectCard = (props) => {
    return (
        <Card raised>
            <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>
                    <span>Frames:</span>
                </Card.Meta>
                <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default ProjectCard