import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { loadUsers, createUserSuccess } from './actions';

const fetchUsersAsync = async () => (
    axios.get('http://localhost:4000/users')
        .then(res => res)
        .catch(err => err)
)

const postUserAsync = async (user) => (
    await postUser(user)
        .then(res => res.json())
        .catch(err => err)
)

const postUser = (user) => {
    const api = "http://localhost:4000/users";
    return fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res)
        .catch(err => err);
}

function* createUser({ payload }) {
    const user = {
        username: payload.username
    };
    try {
        const res = yield call(postUserAsync, user);
        yield put(createUserSuccess(res));
    } catch (err) {
        console.error('create user error', err)
    }
}

function* fetchUsers() {
    try {
        const res = yield call(fetchUsersAsync);
        yield put(loadUsers(res.data));
    } catch (error) {
        console.error('load users can\'t call', error)
    }
}

export function* watchCreateUsers() {
    yield takeEvery("CREATE_USER", createUser)
}

export function* watchGetUsers() {
    yield takeEvery("GET_USERS", fetchUsers);
}

export default function* rootSaga() {
    yield all([
        fork(watchGetUsers),
        fork(watchCreateUsers)
    ])
}