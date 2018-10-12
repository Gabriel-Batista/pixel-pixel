const defaultState = {
    draw: null,
    erase: null,
    currentTool: 'brush'
}

const ToolsReducer = (state= defaultState, action) =>  {
    switch(action.type) {
        case 'CHANGE_CURRENT_TOOL':
            return {...state, currentTool: action.payload}

        default:
        return state
    }
}

export default ToolsReducer