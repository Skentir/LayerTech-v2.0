const { Schema, model} = require('mongoose');

const SuppliersSchema = new Schema({
    supplier_name: {type: String, required: true}, 
    files_link: {type: String, required: true}, 
    contact_num: {type: String, required: true}, 
    email: {type: String, required: true}, 
    company_name: {type: String, required: true}, 
    position: {type: String, required: true},
})

const SupplierItem = model('suppliers', SuppliersSchema);

module.exports = SupplierItem;