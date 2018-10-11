const defaultState = {
    context: null,
    history: []
}

const rootReducer = (state= defaultState, action) =>  {
    switch(action.type) {
        case 'SET_CONTEXT':
        console.log(action.payload)
            return {...state, context: action.payload}

        case 'PUSH_HISTORY':
            let newHistory= [...state.history, action.payload]
            return {...state, history: newHistory}

        default:
        return state
    }
}

export default rootReducer