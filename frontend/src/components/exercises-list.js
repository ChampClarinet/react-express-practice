import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getExercises, deleteExercise } from '../redux/actions';

const ExerciseList = ({ exercises, getExercises, deleteExercise }) => {
    useEffect(() => {
        getExercises();
    }, [getExercises]);
    return exercises && exercises.length > 0 ?
        (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map(
                            exercise => (
                                <tr key={exercise._id}>
                                    <td>{exercise.username || ''}</td>
                                    <td>{exercise.description || ''}</td>
                                    <td>{exercise.duration || ''}</td>
                                    <td>{exercise.date.substring(0, 10) || ''}</td>
                                    <td>
                                        <Link
                                            to={"/edit/" + exercise._id}>
                                            {"Edit"}
                                        </Link>
                                        {" | "}
                                        <a href="#"
                                            onClick={() => deleteExercise(exercise._id)}>
                                            {"Delete"}
                                        </a>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        ) :
        <h3>No Exercises Yet.</h3>;
}

const mapStateToProps = ({ exercises }) => ({
    exercises: exercises.data
})

export default connect(mapStateToProps, { getExercises, deleteExercise })(ExerciseList)