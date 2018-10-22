const defaultState = {
    frameId: null,
    context: null,
    gridContext: null,
    previewContext: null,
    pixelSize: 24,
    height: 817,
    width: 816,
    grid: true,
    canvasRef: null,
    projectName: "Untitled"
}

const CanvasReducer= (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_CANVAS_REF':
            return { ...state, canvasRef: action.payload}

        case 'SET_GRID_CONTEXT':
            return { ...state, gridContext: action.payload }

        case 'SET_CONTEXT':
            return { ...state, context: action.payload }

        case 'TOGGLE_GRID':
            return { ...state, grid: !state.grid }

        case 'SET_SELECTED_FRAME':
            return {...state, frameId: action.payload}

        case 'SET_PREVIEW_CONTEXT':
            return {...state, previewContext: action.payload}

        case 'CHANGE_PROJECT_NAME':
            return {...state, projectName: action.payload}

        case 'SET_FRAME_ID':
            return {...state, frameId: action.payload}
        default:
            return state
    }
}

export default CanvasReducer