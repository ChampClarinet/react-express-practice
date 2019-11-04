import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { createExerciseSuccess, loadExercises, getExercises } from './actions';

//*View Exercises
const fetchExercisesAsync = async (payload) => (
    axios.get("http://localhost:4000/exercises" + payload)
        .then(res => res).catch(err => err)
)

function* fetchExercises({ payload }) {
    const id = payload !== undefined ? `/${payload}` : '';
    try {
        const res = yield call(fetchExercisesAsync, id);
        yield put(loadExercises(res.data))
    } catch (err) {
        console.error('Error: ', err)
    }
}

export function* watchFetchExercise() {
    yield takeEvery("GET_EXERCISES", fetchExercises)
}

//*Create Exercise
const postExerciseAsync = async (exercise) => (
    await postExercise(exercise)
        .then(res => res).catch(err => err)
)

const postExercise = (exercise) => (
    fetch("http://localhost:4000/exercises", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exercise)
    }).then(res => res).catch(err => err)
);

function* createExercise({ payload }) {
    try {
        const res = yield call(postExerciseAsync, payload);
        yield put(createExerciseSuccess(res))
    } catch (err) {
        console.error('create exercise error', err)
    }
}

export function* watchCreateExercise() {
    yield takeEvery("CREATE_EXERCISE", createExercise)
}

//*Edit Exercise
export function* watchEditExercise() {
    yield takeEvery("EDIT_EXERCISE", editExercise);
}

function* editExercise({ payload }) {
    const { id, exercise } = payload;
    try {
        const res = yield call(editExerciseAsync, id, exercise);
        console.log('edit exercise result:', res);
    } catch (err) {
        console.error('edit exercise error: ', err);
    }
}

const editExerciseAsync = async (id, exercise) => (
    await callEditExcercise(id, exercise)
        .then(res => res).catch(err => err)
)

const callEditExcercise = (id, exercise) => (
    fetch(
        "http://localhost:4000/exercises/" + id,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
        }
    ).then(res => res).catch(err => err)
)

//*Delete Exercise
const deleteExerciseAsync = async (id) => (
    await deleteExercise(id)
        .then(res => res).catch(err => err)
)

const deleteExercise = (id) => (
    fetch(
        "http://localhost:4000/exercises/" + id,
        { method: "DELETE" }
    ).then(res => res).catch(err => err)
);

function* handleDeleteExercise({ payload }) {
    console.log('del ex', payload)
    try {
        const res = yield call(deleteExerciseAsync, payload)
        res.json().then(body =>
            console.log('delete exercise result:', body)
        )
        yield put(getExercises())
    } catch (err) {
        console.error('delete exercise error', err)
    }
}

export function* watchDeleteExercise() {
    yield takeEvery("DELETE_EXERCISE", handleDeleteExercise);
}

export default function* rootSaga() {
    yield all([
        fork(watchCreateExercise),
        fork(watchFetchExercise),
        fork(watchEditExercise),
        fork(watchDeleteExercise)
    ])
}