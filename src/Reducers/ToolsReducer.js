const defaultState = {
    draw: null,
    erase: null,
    currentTool: 'draw'
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