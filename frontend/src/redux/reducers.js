import {combineReducers} from 'redux';
import users from './users/reducer';
import exercises from './exercises/reducer';

export default combineReducers({
    users,
    exercises
})