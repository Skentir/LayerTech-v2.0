const { Router } = require('express')
const router = Router();
const Employee = require('../models/EmployeesModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const verifyToken = require('./verifyToken');


/**
 * @route GET /employees/
 * @desc Get Employees Collection
 * @access Public
 */
router.get('/', async (req, res) => {
    try{
        // get employees collection excluding the password field
        const employees_list = await Employee.find();
        if(!employees_list) throw new Error('No Employees')
        
        // assign null to password to hide
        employees_list.forEach((employee) => {
            employee.password = null;
        });

        // respond with object of employee
        res.status(200).json(employees_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @route POST /employees/register
 * @desc Register the Employee
 * @access Public
 */
router.post('/register', async (req, res) => {
    let new_user = new Employee(req.body)
    try{
        /*
            had to mirror your functions using await since we are using await/async promises (iirc thats the term)
            for the routes

            1. Generates 'salt'
            2. hashes password
            3. assign new hashed password to new_user
            4. new_user.save() to db
            5. return new_user with success: true
        */
        const salt = await bcrypt.genSalt(10);
        const hashed_pass = await bcrypt.hash(new_user.password, salt);
        new_user.password = hashed_pass;

        const user_list = await new_user.save()
        if(!user_list) throw new Error('something went wrong')

        // set password property to '' before returning
        user_list.password = '';
                
        const response = {
            user: user_list,
            success: true,
        }
        res.status(200).json(response);
    }catch(error) {
        /*
            We can handle non-unique usernames by not returning an error
            but handling the issue properly by sending a success: false
            if and only if try/catch detects error code 11000 = non-uniqueness found
        */
        if (error.name === 'MongoError' && error.code === 11000){
            /*
                Code 11000 is for duplicate unique element found
            */
            const error_ret = {
                success: false,
            }
            res.status(200).json(error_ret);
        }
        else {
            /*
                Any other error we cannot or will not handle
            */
            console.log(error.message)
            res.status(500).json({ message: error.message })
        }
    }
});

/**
 * @route POST /employees/:id
 * @desc Update Employee data
 * @access Public
 */
router.put('/:id', async (req, res) => {
    try{
        if (req.body.password === null) { // if not changing pass
            // Find and update
            console.log(req.body);
            const response = await Employee.findByIdAndUpdate(req.params.id, req.body);
            if(!response) throw Error('Failed to update employee.')
            const updated = { ...response._doc, ...req.body}
            res.status(200).json(updated);
        } else { // if changing pass
            let newPassword = req.body.password;
            // Hash the password
            bcrypt.genSalt(10, (err, salt) => {     
                bcrypt.hash(newPassword, salt, async (err, hash) => {
                    if (err) return res.status(400).json({error: err})
                    req.body.password = hash;
                    console.log(req.body.password);
                    // Find and update
                    const response = await Employee.findByIdAndUpdate(req.params.id, req.body);
                    if(!response) throw Error('Failed to update employee.')
                    const updated = { ...response._doc, ...req.body}
                    res.status(200).json(updated);
                    
                });
            });
        }  
    } catch(error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})   

/**
 * @route DELETE /employees/:id
 * @desc Delete Employee data
 * @access Public
 */
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
 * @route POST /employees/login
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
 * @route POST /employees/profile 
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
