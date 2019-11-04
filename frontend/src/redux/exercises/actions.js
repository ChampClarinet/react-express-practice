export const createExercise = (exercise) => ({
    type: "CREATE_EXERCISE",
    payload: exercise
})

export const createExerciseSuccess = (res) => ({
    type: "EXERCISE_CREATED",
    payload: res
})

export const getExercises = (id = '') => {
    let payload = { type: "GET_EXERCISES" }
    if (id.length > 0) return { ...payload, payload: id };
    return payload;
}

export const loadExercises = (exercises) => ({
    type: "EXERCISE_LOADED",
    payload: exercises
})

export const editExercise = (id, exercise) => ({
    type: "EDIT_EXERCISE",
    payload: { id, exercise }
})

export const deleteExercise = (id) => ({
    type: "DELETE_EXERCISE",
    payload: id
})