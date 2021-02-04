const { Router } = require('express')
const router = Router();
const Employee = require('../models/EmployeesModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const verifyToken = require('./verifyToken');


// Get
router.get('/', async (req, res) => {
    try{
        const employees_list = await Employee.find()
        if(!employees_list) throw new Error('No Employees')
    
        res.status(200).json(employees_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @route POST /users/register
 * @desc Register the User
 * @access Public
 */
router.post('/register', (req, res) => {
    // To ensure that you only get the following properties
    let user = {
        username,
        password,
        first_name,
        last_name,
        contact_num,
        role,
        department
    } = req.body

    // Check for the unique Username
    Employee.findOne({
        username: req.body.username
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Username is already taken."
            });
        }
    })

    // The data is valid and new we can register the user
    let newUser = new Employee(req.body);

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return res.status(400).json({error: err})
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(200).json({
                    user: user,
                    success: true,
                    msg: "User is now registered."
                });
            });
        });
    });
});

//Update
router.put('/:id', async (req, res) => {
    try{
        const response = await Employee.findByIdAndUpdate(req.body);
        if(!response) throw Error('Something went wrong')
        const updated = { ...response._doc, ...req.body}
        res.status(200).json(updated);
    }catch(error){
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})   

// delete
router.delete('/:id', async (req, res) => {
    try{
        const removed = await Employee.findByIdAndDelete(req.params.id);
        if(!removed) throw Error('Something went wrong')
        res.status(200).json(removed);
    }catch(error){
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})   

// Login
/**
 * @route POST api/users/login
 * @desc Authenticate user
 * @access Public
 */
router.post('/login', (req, res) => {
    Employee.findOne({
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
                    return res.status(200).json({
                        "auth-token": token,
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

/** FOR TESTING PURPOSES ONLY and example use case of private server-side routes
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
