import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const Logout= (props) => {
    const logout= () => {
        localStorage.removeItem('token')
        props.userLoggedOut()
    }

    return (
        <Button 
            fluid
            onClick={logout}
            size="massive"
            style={{ backgroundColor: "#515151", color: "#FFFFFF"}}
        >LOGOUT</Button>
    )
}

const mapDispatchToProps= (dispatch) => {
    return {
        userLoggedOut: () =>    {
            dispatch({
                type: "USER_LOGGED_OUT"
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Logout)