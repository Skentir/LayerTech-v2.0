const { Schema, model } = require('mongoose')

const OperationSchema = new Schema({
    serial_code: {type: String, required: [true, "No serial code provided"]},
    quantity: {type: Number, min: 0, required: [true, "No quantity provided"]},
});

const OperationModel = model('Operation', OperationSchema);
module.exports = OperationModel
//Methods