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
            console.log(action)
            let newFrames = [...state.frames, {history: state.history, element: action.payload}]
            return { frames: newFrames, history: [] }

        default:
            return state
    }
}

export default HistoryReducer