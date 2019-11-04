import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../redux/actions';

const CreateUserComp = ({ createUser }) => {
    const [username, setUsername] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        const user = { username }
        // console.log(user)
        createUser(user)
        window.location = '/';
    }
    return (
        <div>
            <h3>Create new user</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise!" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default connect(() => ({}), { createUser })(CreateUserComp)