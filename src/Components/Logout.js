import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const Logout= (props) => {
    const logout= () => {
        localStorage.removeItem('token')
        props.userLoggedOut()
        props.context.clearRect(0, 0, props.canvasHeight, props.canvasWidth)
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

const mapStateToProps= (state) =>   {
    return {
        context: state.canvas.context,
        canvasHeight: state.canvas.height,
        canvasWidth: state.canvas.width
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Logout)