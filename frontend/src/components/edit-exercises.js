import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getExercises, getUsers, editExercise } from '../redux/actions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExerciseComp = ({
    getExercises, getUsers, editExercise,
    message, exercise, users, match
}) => {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const id = match.params.id;
    //*CDM
    useEffect(() => {
        getExercises(id);
        getUsers();
    }, [getExercises, getUsers, id]);
    useEffect(() => {
        if (message && message.length > 0) console.log('exercise', message);
    }, [message]);
    useEffect(() => {
        if (!(exercise instanceof Array)) {
            setUsername(exercise.username);
            setDescription(exercise.description);
            setDuration(exercise.duration);
            setDate(new Date(exercise.date));
        }
    }, [exercise]);
    const onSubmit = (e) => {
        e.preventDefault();
        const exercise = { username, description, duration, date }
        editExercise(id, exercise);
        window.location = '/';
    }
    return (
        <div>
            <h3>Edit exercise log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                        {users.map((user, i) => (
                            <option key={i} value={user.username}>{user.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (min): </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker selected={date} onChange={(date) => setDate(date)} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Exercise!" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = ({ exercises, users }) => ({
    exercise: exercises.data,
    message: exercises.message,
    users: users
})

export default connect(mapStateToProps, { getExercises, getUsers, editExercise })(EditExerciseComp);