import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/navbar';
import ExercisesList from './components/exercises-list';
import EditExercise from './components/edit-exercises';
import CreateExercise from './components/create-exercise';
import CreateUser from './components/create-user';

const App = () => (
    <Provider store={configureStore()}>
        <Router>
            <div className="container">
                <Navbar />
                <br />
                <Route path="/" exact component={ExercisesList} />
                <Route path="/edit/:id" component={EditExercise} />
                <Route path="/create" component={CreateExercise} />
                <Route path="/user" component={CreateUser} />
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));