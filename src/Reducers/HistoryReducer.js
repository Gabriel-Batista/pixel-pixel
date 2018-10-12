const defaultState = {
    history: [],
}

const HistoryReducer= (state= defaultState, action) => {
    switch(action.type) {
        case 'PUSH_HISTORY':
            let newHistory = [...state.history, action.payload]
            return { ...state, history: newHistory }

        default:
            return state
    }
}

export default HistoryReducer