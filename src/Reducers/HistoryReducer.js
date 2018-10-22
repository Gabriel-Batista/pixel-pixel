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
        console.log("action:", action)
            let newFrames = { ...state.frames }
            newFrames[action.payload] = { id: action.payload, base64: "" }
            return {...state, frames: newFrames}

        case 'UPDATE_FRAME':
        let updateFrames = {...state.frames }
        console.log("this thingy", updateFrames[action.payload.id])
        updateFrames[action.payload.id] = { ...state.frames[action.payload.id], base64: action.payload.base64 }
        return {...state, frames: updateFrames}

        case 'SAVED_PROJECT':
            return {...state, saved: true}

        default:
            return state
    }
}

export default HistoryReducer