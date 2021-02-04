const { Schema, model} = require('mongoose');

const EmployeesSchema = new Schema({
    username: {type: String, unique: true, required: true}, 
    //to follow password encryption
    password: {type: String, required: true}, 
    first_name: {type: String, required: true}, 
    last_name: {type: String, required: true}, 
    contact_number: {type: String, required: true}, 
    role: {type: String, required: true},
    department: {type: String, required: true},
})

const SupplierItem = model('employees', EmployeesSchema);

module.exports = SupplierItem;