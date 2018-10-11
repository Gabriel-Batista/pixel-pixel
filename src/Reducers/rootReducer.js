const defaultState = {
    context: null,
    history: []
}

const rootReducer = (state= defaultState, action) =>  {
    switch(action.type) {
        case 'SET_CONTEXT':
            if(state.context === null)  {
                return {...state, context: action.payload}
            }
            return state

        case 'PUSH_HISTORY':
            let newHistory= [...state.history, action.payload]
            return {...state, history: newHistory}
            
        default:
        return state
    }
}

export default rootReducer