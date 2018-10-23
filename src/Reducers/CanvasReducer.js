const defaultState = {
    frameId: null,
    context: null,
    gridContext: null,
    previewContext: null,
    pixelSize: 24,
    height: 1200,
    width: 1200,
    grid: true,
    canvasRef: null,
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

        case 'SET_PREVIEW_CONTEXT':
            return {...state, previewContext: action.payload}

        case 'SET_FRAME_ID':
            return {...state, frameId: action.payload}
        default:
            return state
    }
}

export default CanvasReducer