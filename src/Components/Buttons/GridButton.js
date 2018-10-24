import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const GridButton = (props) =>   {
    return (
        <Button
            fluid
            onClick={props.toggleGrid}
            size="massive"
            style={{ marginBottom: "25px", backgroundColor: "#515151", color: "#FFFFFF"}}
        >GRID</Button>
    )
}

const mapStateToProps = (state) =>  {
    return {
    }
}

const mapDispatchToProps = (dispatch) =>    {
    return {
        toggleGrid: () => {
            dispatch({
                type: 'TOGGLE_GRID'
            })
        },
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(GridButton)