const defaultState = {
    selectedHistory: [],
    frames: {},
    gif: null,
    saved: true,
    base64: ""
}

const HistoryReducer= (state= defaultState, action) => {
    switch(action.type) {
        case 'PUSH_HISTORY':
            let newHistory = [...state.selectedHistory, action.payload]
            return { ...state, selectedHistory: newHistory }

        case 'PUSH_FRAME':
            let pushedFrames = {...state.frames}
            pushedFrames[action.payload.id] = { id: action.payload.id, history: state.selectedHistory, base64: action.payload.base64 }
            return { ...state, frames: pushedFrames, selectedHistory: [] }

        case 'NEW_FRAME':
            let newFrames = { ...state.frames }
            newFrames[action.payload] = { id: action.payload, base64: "" }
            return {...state, frames: newFrames}

        case 'UPDATE_FRAME':
            let updateFrames = {...state.frames }
            updateFrames[action.payload.id] = { ...state.frames[action.payload.id], base64: action.payload.base64 }
            return {...state, frames: updateFrames}

        case 'SAVED_PROJECT':
            return {...state, saved: true}

        case 'LOAD_PROJECT':
            return {...state, frames: action.payload, selectedHistory: []}

        case 'DELETE_FRAME':
            let deleteFrames= {...state.frames}
            delete deleteFrames[action.payload]
            return { ...state, frames: deleteFrames }
            
        default:
            return state
    }
}

export default HistoryReducer