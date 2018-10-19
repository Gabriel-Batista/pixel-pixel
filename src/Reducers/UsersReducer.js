const defaultState = {
    userId: null,
    status: "logged out",
    error: "none"
}

const UsersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'AWAITING_USER_LOGIN':
            return {...state, status: "waiting"}

        case 'USER_LOGGED_IN':
            return {...state, status: "logged in"}

        case 'USER_LOGGED_OUT':
            return {...state, status: "logged out"}

        case 'ERROR':
            if (action.payload === 'signup')    {
                return {...state, error: "signup"}
            }
            else if (action.payload === 'login')   {
                return {...state, error: "login"}
            }
            else    {
                return {...state, error: "none"}
            }
            

        default:
            return state
    }
}

export default UsersReducer