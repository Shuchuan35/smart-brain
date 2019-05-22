const User = require('../models/User');
const Login = require('../models/Login');
const bcrypt = require('bcrypt-nodejs');


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
        
        const { email, password } = req.body;
       
        Login.findOne({email: email })
        .then(data => {
            // console.log(data);
            const isValid = bcrypt.compareSync(password, data.hash);
            // console.log(isValid);
            if(isValid) {
                User.findOne({email: email})
                .then(user => {
                    res.json(user);
                })
                .catch(err => res.status(400).json('error login'));
            } else {
                res.status(400).json('wrong credentials');
            }
        })
        .catch(err => res.status(400).json('wrong credentials'));

    });

    //=======================
    // create new user profile
    //========================

    app.post('/api/register', (req, res) => {
        const { email, password, name } = req.body;
        // console.log(email, password, name);

        const hash = bcrypt.hashSync(password);
        // bcrypt.hash(password, null, null, function (err, hash) {
        //     console.log(hash);
        // });
        const newEntry = { hash: hash, email: email }

        Login.create(newEntry)
            .then(loginData => {
                return User.create(req.body)
            })
            .then(userData => {
                console.log(userData);
                res.json(userData);
            })
            .catch(function (err) {
                res.status(400).json('unable to register');
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