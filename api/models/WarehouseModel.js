const { Schema, model} = require('mongoose');

const WarehouseSchema = new Schema({
    //attributes present in add item modal
    serial_id: {type: String, unique: true, required: true},
    //supplier: {type: Schema.Types.ObjectId, ref: 'suppliers', required: true},
    supplier: {type: String, required: true},
    product_title: {type: String, required: true},
    product_type: {type: String, required: true},
    product_code: {type: String, required: true},
    dosage: {type: String, required: true},
    received_date: {type: Date, required: true, default: Date.now},
    expiration_date: {type: Date, required: true, default: Date.now},
    stock_quantity: {type: Number, min: 0, required: true},
    critical_volume: {type: Number, min: 0, required: true},
    unit: {type: String, required: true},
    packaging: {type: String, required: true},
    //hidden attributes
    batch_number: {type: Number, min: 0, required: true},
    batch_status: {type: String, required: true},
    product_status: {type: String, required: true},
    pulled_out_quantity: {type: Number, min: 0, required: true},
    liquidated_quantity: {type: Number, min: 0, required: true},
})

const WarehouseModel = model('warehouses', WarehouseSchema);

module.exports = WarehouseModel;