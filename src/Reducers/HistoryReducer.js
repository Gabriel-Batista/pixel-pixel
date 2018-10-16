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

        case 'UPDATE_FRAME':
        let updateFrames = [...state.frames]
        console.log(state)
            updateFrames[action.payload.index] = { ...state.frames[action.payload.index], canvasURL: action.payload.canvasURL }
            return{...state, frames: updateFrames}

        default:
            return state
    }
}

export default HistoryReducer