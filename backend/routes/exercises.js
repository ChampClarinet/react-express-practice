const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        //.sort('username') //? Sort by example (In this case, sorting by username)
        .then(exercises => {
            const filtered = exercises.filter((exercise) => {
                return exercise.deleteAt == null;
            });
            res.status(200).json(filtered)
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/').post((req, res) => {
    console.log('recieving', req.body)
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    console.log('saving', newExercise)

    newExercise.save()
        .then(() => res.status(200).json('Exercise Added'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            if (exercise.deleteAt != null) res.status(204).json('deleted')
            res.status(200).json(exercise)
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Exercise.findById(req.params.id)
        .then((exercise) => {
            exercise.deleteAt = Date.now();
            exercise.save();
            res.status(200).json(`${req.params.id} deleted.`)
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').put((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            if (req.body.username) exercise.username = req.body.username;
            if (req.body.description) exercise.description = req.body.description;
            if (req.body.duration) exercise.duration = Number(req.body.duration);
            if (req.body.date) exercise.date = Date.parse(req.body.date);
            exercise.save()
                .then(() => res.status(200).json(`${req.params.id} updated.`))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;