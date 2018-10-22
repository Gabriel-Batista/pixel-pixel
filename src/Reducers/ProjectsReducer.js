const defaultState = {
    projects: [],
    projectId: null,
    projectName: "Untitled"
}

const ToolsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'PULL_PROJECTS':
            return { ...state, projects: action.payload }
        case 'SET_PROJECT_ID':
            return { ...state, projectId: action.payload}

        case 'CHANGE_PROJECT_NAME':
            return { ...state, projectName: action.payload }

        default:
            return state
    }
}

export default ToolsReducer