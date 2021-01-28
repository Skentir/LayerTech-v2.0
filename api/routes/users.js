const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const User = require('../models/User');
const verifyToken = require('./verifyToken');

/**
 * @route POST /users/register
 * @desc Register the User
 * @access Public
 */
router.post('/register', (req, res) => {
    let {
        username,
        password,
        confirm_password,
        first_name,
        last_name,
        contact_num,
        role,
        department
    } = req.body

    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Password do not match."
        });
    }
    // Check for the unique Username
    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Username is already taken."
            });
        }
    })

    // The data is valid and new we can register the user
    let newUser = new User({
        first_name,
        last_name,
        contact_num,
        role,
        department,
        username,
        password
    });

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is now registered."
                });
            });
        });
    });
});

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Username is not found.",
                success: false
            });
        }
        // If there is user we are now going to compare the password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // User's password is correct and we need to send the JSON Token for that user
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name
                }
                jwt.sign(payload, secret, {
                    expiresIn: 604800
                }, (err, token) => {
                    console.log("login success.");
                    return res.header('auth-token', token).json({
                        msg: "Login success.",
                        success: true
                    });
                })
            } else {
                return res.status(404).json({   // token is undefined since it doesn't exist
                    msg: "Incorrect password.",
                    success: false
                });
            }
        })
    });
});

/** FOR TESTING PURPOSES ONLY
 * 
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get('/profile', verifyToken, (req,res) => { 
    // return profile details
    res.json({
        name: 'Dan'
    });
});

module.exports = router;