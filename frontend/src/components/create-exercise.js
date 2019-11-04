import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createExercise, getUsers } from '../redux/actions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateExerciseComp = ({ createExercise, getUsers, message, users }) => {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        try {
            setUsername(users[0].username)
        } catch (err) { setUsername('') }
    }, [users]);
    useEffect(() => {
        getUsers()
    }, [getUsers]);
    useEffect(() => {
        if (message && message.length > 0) console.log('exercise', message);
    }, [message]);
    const onSubmit = (e) => {
        e.preventDefault();
        const exercise = { username, description, duration, date }
        createExercise(exercise);
        window.location = '/';
    }
    return (
        <div>
            <h3>Create new exercise log</h3>
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
                    <input type="submit" value="Create Exercise!" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = ({ exercises, users }) => ({
    message: exercises.message,
    users: users
})

export default connect(mapStateToProps, { createExercise, getUsers })(CreateExerciseComp);