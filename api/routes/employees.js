const { Router } = require('express')
const Employee = require('../models/EmployeesModel')
const router = Router();

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

//Add
router.post('/', async (req, res) => {

    const new_employee = new Employee(req.body)
    try{
        const employees_list = await new_employee.save()
        if(!employees_list) throw new Error('something went wrong')
    
        res.status(200).json(employees_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
        
    } 
})

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

//to follow delete

module.exports = router;
