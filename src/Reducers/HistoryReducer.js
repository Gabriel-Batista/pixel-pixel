const defaultState = {
    history: [],
    frames: [],
    gif: null,
    saved: true
}

const HistoryReducer= (state= defaultState, action) => {
    switch(action.type) {
        case 'PUSH_HISTORY':
            let newHistory = [...state.history, action.payload]
            return { ...state, history: newHistory }

        case 'PUSH_FRAME':
            let newFrames = [...state.frames, {history: state.history, canvasURL: action.payload}]
            return { frames: newFrames, history: [] }

        //TODO: Implement Gif Feature
        // case 'SAVE_GIF':
        //     return {...state, gif: action.payload}

        case 'UPDATE_FRAME':
        let updateFrames = [...state.frames]
        updateFrames[action.payload.index] = { ...state.frames[action.payload.index], canvasURL: action.payload.canvasURL }
        return {...state, frames: updateFrames}

        case 'SAVED_PROJECT':
            return {...state, saved: true}

        default:
            return state
    }
}

export default HistoryReducer