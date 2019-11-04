import {all} from 'redux-saga/effects';
import users from './users/saga';
import exercise from './exercises/saga';

export default function* rootSaga(getState){
    yield all([
        users(),
        exercise()
    ]);
}