const defaultState = {
    currentTool: 'brush',
    color: '#000'
}

const ToolsReducer = (state= defaultState, action) =>  {
    switch(action.type) {
        case 'SELECT_BRUSH':
            return {...state, currentTool: 'brush'}

        case 'SELECT_ERASER':
            return { ...state, currentTool: 'eraser' }

        case 'SELECT_COLOR':
        return {...state, color: action.payload}

        default:
        return state
    }
}

export default ToolsReducer