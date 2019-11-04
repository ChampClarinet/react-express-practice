const INIT_STATE = {
    data: [],
    message: ""
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case "EXERCISE_CREATED":
            return {
                ...state,
                message: "EXERCISE_CREATED"
            }
        case "EXERCISE_LOADED":
            return {
                ...state,
                data: action.payload
            }
        default: return state
    }
}