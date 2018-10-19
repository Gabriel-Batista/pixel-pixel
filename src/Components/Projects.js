import React, { Component } from 'react'
import { connect } from 'react-redux'

class Projects extends Component    {
    state = {
        open: false,
        username: "",
        password: ""
    }

    render()    {
        show = dimmer => () => this.setState({ dimmer, open: true })
        close = () => this.setState({ open: false })

        return(
            <div>
            { this.props.status === 'logged in' ? <Button onClick={this.show('blurring')}>Open</Button> : null }
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content>
                    <Modal.Description >
                        <Grid textAlign='center'>
                            {/* "render projects" */}
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* "render buttons" */}
                </Modal.Actions>
            </Modal>
            </div>
        )
    }
}