const { Schema, model} = require('mongoose');

const OperationsSchema = new Schema({
    serial_id: {type: String, required: true},
    //supplier: {type: Schema.Types.ObjectId, ref: 'suppliers', required: true},
    batch_number: {type: Number, min: 0, required: true},
    product_status: {type: String, required: true},
    supplier: {type: String, required: true},
    product_title: {type: String, required: true},
    product_type: {type: String, required: true},
    product_code: {type: String, required: true},
    received_date: {type: Date, required: true, default: Date.now},
    expiration_date: {type: Date, required: false},
    unit: {type: String, required: true},
    packaging: {type: String, required: true},
    entry: {type: String, required: true, enum: ["In", "Out"]},
    dosage: {type: String, required: false},
    quantity: {type: Number, required: true, min: 0},
    original_quantity: {type: Number, required: false, min: 0},
    eggs_sold_s: {type: Number, required: false, min: 0},
    eggs_sold_m: {type: Number, required: false, min: 0},
    eggs_sold_l: {type: Number, required: false, min: 0},
})

const OperationsItem = model('operations', OperationsSchema);

module.exports = OperationsItem;