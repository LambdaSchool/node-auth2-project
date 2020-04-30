const router = require('express').Router();

//import bcrypt

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

//this allwos us to look up users and add them to the DB
const Users = require('../users/users_model')


//extract the user object from the 'req.body'
//hash the password with bcrypt and store on the user object
//hash format = [vers][cost][salt][hash]
router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

    router.post('/login', (req, res) => {
        let {username, password} = req.body;
        Users.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                console.log('hello');
                const token = genToken(user);
                res.status(200).json({message: `Welcome ${user.name}!`, token})
            } else {
                res.status(401).json({message: 'invalid credentials'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
    })
    function genToken(user) {
        const payload = {
            userid: user.id,
            username: user.username
        }
        const options = {
            expiresIn: '1h'
            }
        const token = jwt.sign(payload, secrets.jwtSecret, options)

        return token;
    }

module.exports = router;