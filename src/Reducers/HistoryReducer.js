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
            let newFrames = [...state.frames, state.history]
            return { frames: newFrames, history: [] }

        default:
            return state
    }
}

export default HistoryReducer