const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/').post((req, res) => {
    const username = req.body.username;
    User.find()
        .then(users => users.forEach(user => {
            if (user.username == username) res.status(403).json('Duplicate username');
        }))
    const newUser = new User({ username });
    console.log('adding user', username)
    newUser.save()
        .then(() => res.status(200).json('User Added'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;