const defaultState = {
    history: [],
    frames: [],
    gif: null
}

const HistoryReducer= (state= defaultState, action) => {
    switch(action.type) {
        case 'PUSH_HISTORY':
            let newHistory = [...state.history, action.payload]
            return { ...state, history: newHistory }

        case 'PUSH_FRAME':
            let newFrames = [...state.frames, {history: state.history, canvasURL: action.payload}]
            return { frames: newFrames, history: [] }

        case 'SAVE_GIF':
            return {...state, gif: action.payload}

        default:
            return state
    }
}

export default HistoryReducer