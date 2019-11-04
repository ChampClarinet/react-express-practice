export const getUsers = () => ({
    type: "GET_USERS"
})

export const loadUsers = (users) => ({
    type: "LOAD_USERS",
    payload: users
})

export const createUser = (user) => ({
    type: "CREATE_USER",
    payload: user
})

export const createUserSuccess = (res) => ({
    type: "USER_CREATED",
    payload: res
})