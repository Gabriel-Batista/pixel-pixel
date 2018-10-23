const eraserCursor = 'url("http://www.rw-designer.com/cursor-extern.php?id=85157"), pointer'
const brushCursor = 'url("http://www.rw-designer.com/cursor-extern.php?id=95695"), pointer'

const defaultState = {
    currentTool: 'brush',
    color: '#000',
    cursor: brushCursor
}

const ToolsReducer = (state= defaultState, action) =>  {
    switch(action.type) {
        case 'SELECT_BRUSH':
            return {...state, currentTool: 'brush', cursor: brushCursor}

        case 'SELECT_ERASER':
            return { ...state, currentTool: 'eraser', cursor: eraserCursor }

        case 'SELECT_COLOR':
        return {...state, color: action.payload}

        default:
        return state
    }
}

export default ToolsReducer