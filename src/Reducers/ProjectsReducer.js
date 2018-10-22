const defaultState = {
    projects: [],
}

const ToolsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'PULL_PROJECTS':
            return { ...state, projects: action.payload }

        default:
            return state
    }
}

export default ToolsReducer