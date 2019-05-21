const User = require('../models/User');
const Login = require('../models/Login');
const bcrypt = require('bcrypt-nodejs');

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'apple',
            entries: 0,
            joined: new Date()
        }
    ]
}

module.exports = function (app) {

    //========================
    // get all users profiles
    //========================

    app.get('/api/users', (req, res) => {
        User.find({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            })
    });

    //========================
    // sign in user
    //========================

    app.post('/api/signin', (req, res) => {
        console.log('Hi');
        const { email, password } = req.body;
        console.log(email, password);
        console.log(req.body.email, req.body.password);
        if (email === database.users[0].email &&
            password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(400).json('error sign in');
        }
    });

    //=======================
    // create new user profile
    //========================

    app.post('/api/register', (req, res) => {
        const { email, password, name } = req.body;
        console.log(email, password, name);
        bcrypt.hash(password, null, null, function (err, hash) {
            console.log(hash);
        });

        User.create(req.body)
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    });

    //========================
    // get single user profile
    //========================

    app.get('/api/profile/:id', (req, res) => {
        const { id } = req.params;
        User.findOne({
            _id: id
        })
            .then(data => {
                if (data) {
                    res.json(data);
                } else {
                    res.status(404).json('user not found!');
                }
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

    //========================
    // update user profile
    //========================

    app.put('/api/image', (req, res) => {
        const { id } = req.body;
        // console.log('id=====', id);
        return User.findOneAndUpdate({ _id: id }, { $inc: { entries: 1 } }, { new: true })
            .then(data => {
                res.json(data);
                // console.log('user updated:=====', data);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
}