const defaultState = {
    userId: null,
    status: "logged off",
    error: false
}

const UsersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'AWAITING_USER_LOGIN':
            return {...state, userLogIn: "waiting"}

        case 'USER_LOGGED_IN':
            return {...state, userLogIn: "logged in"}

        case 'ERROR':
            if (action.payload === 'signup')    {
                return {...state, error: "signup"}
            }
            else    {
                return {...state, error: "login"}
            }
            

        default:
            return state
    }
}

export default UsersReducer