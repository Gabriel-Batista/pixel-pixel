import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Form, Grid, Input, Label } from 'semantic-ui-react'
import { UserFetches } from '../Helpers/UserAdapter'

import { connect } from 'react-redux'

class Login extends Component {
    state = {
        open: false,
        username: "",
        password: ""
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    login= () => {
        UserFetches.fetchUser({username: this.state.username, password: this.state.password})
        .then(res => {
            console.log(res)
            return res
        })
        .then(res => {
            if('error' in res)    {
                this.props.toggleError('login')
            }
            else    {
                this.props.userLoggedIn(res.user.username)
                localStorage.setItem('token', res.user.token)
            }
        })
    }

    signup= () => {
        UserFetches.fetchCreateUser({ username: this.state.username, password: this.state.password })
        .then(res => {
            console.log(res)
            return res
        })
        .then(res => {
            if ('error' in res) {
                this.props.toggleError('signup')
            }
            else {
                this.props.userLoggedIn(res.username)
                localStorage.setItem('token', res.token)
            }
        })
    }

    clearError= () =>   {
        if(this.props.error)    {
            this.props.toggleError()
        }
    }

    render() {
        const { open, dimmer } = this.state

        return (
            <div>
                <Button onClick={this.show('blurring')}>Log in</Button>

                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Log in</Modal.Header>
                    <Modal.Content>
                        <Modal.Description >
                            <Grid textAlign='center'>
                                <Form size="massive">
                                    <br/>
                                    {this.props.error === 'login' ? <Header as='h4' color='red' textAlign='center'>Invalid Username or Password</Header> : null}
                                    {this.props.error === 'signup' ? <Header as='h4' color='red' textAlign='center'>The choosen username alreadt exists</Header> : null}
                                    <br/>
                                    <Form.Input 
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Username'
                                        error={this.props.error !== 'none'}
                                        value={this.state.username}
                                        onChange={(e) => this.setState({ username: e.target.value })}
                                        onFocus={this.clearError}
                                    ></Form.Input>
                                    <br />
                                    <Form.Input 
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        error={this.props.error !== 'none'}
                                        value={this.state.password}
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                        onFocus={this.clearError}
                                    ></Form.Input>
                                    <br/>
                                </Form>
                            </Grid>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            color='lightgrey' 
                            onClick={this.signup}
                        >
                            Sign up
                        </Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Login"
                            onClick={this.login}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    return {
        status: state.users.status,
        error: state.users.error
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        loadingUser: () => {
            dispatch({
                type: 'AWAITING_USER_LOGIN'
            })
        },
        userLoggedIn: (payload) => {
            dispatch({
                type: 'USER_LOGGED_IN',
                payload: payload
            })
        },
        toggleError: (payload) => {
            dispatch({
                type: 'ERROR',
                payload: payload
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
