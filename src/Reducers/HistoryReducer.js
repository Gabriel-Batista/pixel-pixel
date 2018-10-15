const defaultState = {
    history: [],
    frames: []
}

const HistoryReducer= (state= defaultState, action) => {
    switch(action.type) {
        case 'PUSH_HISTORY':
            let newHistory = [...state.history, action.payload]
            return { ...state, history: newHistory }

            case 'PUSH_FRAME':
            console.log(state)
            let newFrames = [...state.frames, {history: state.history, canvasURL: action.payload}]
            return { frames: newFrames, history: [] }

        default:
            return state
    }
}

export default HistoryReducer