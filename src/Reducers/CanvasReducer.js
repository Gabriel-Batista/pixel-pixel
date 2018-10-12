const defaultState = {
    context: null,
    gridContext: null,
    pixelSize: 24,
    height: 817,
    width: 816,
    grid: true,
    canvasRef: null
}

const CanvasReducer= (state = defaultState, action) => {
    switch(action.type) {
        case 'SET_CANVAS_REF':
            return { ...state, canvasRef: action.payload}

        case 'SET_GRID_CONTEXT':
            return { ...state, gridContext: action.payload }

        case 'SET_CONTEXT':
            console.log(action.payload)
            return { ...state, context: action.payload }

        case 'TOGGLE_GRID':
            return { ...state, grid: !state.grid }

        default:
            return state
    }
}

export default CanvasReducer