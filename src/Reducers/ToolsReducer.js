const defaultState = {
    currentTool: 'brush'
}

const ToolsReducer = (state= defaultState, action) =>  {
    switch(action.type) {
        case 'SELECT_BRUSH':
            return {...state, currentTool: 'brush'}

        case 'SELECT_ERASER':
            return { ...state, currentTool: 'eraser' }

        default:
        return state
    }
}

export default ToolsReducer