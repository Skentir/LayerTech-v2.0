const { Schema, model} = require('mongoose');

const WarehouseSchema = new Schema({
    //IDs
    item_id: {type: String, required: true},
    serial_id: {type: String, required: true},
    //fields
    item_name: {type: String, required: true},
    product_type: {type: String, required: true},
    stock_quantity: {type: Number, min: 0, required: true},
    pulled_out_quantity: {type: Number, min: 0, required: true},
    liquidated_quantity: {type: Number, min: 0, required: true},
    critical_volume: {type: Number, min: 0, required: true},
    unit: {type: String, required: true},
    expiration_date: {type: Date, required: true, default: Date.now},
    received_date: {type: Date, required: true, default: Date.now},
    dosage: {type: String, required: true},
    status: {type: String, required: true},
})

const WarehouseModel = model('warehouse', WarehouseSchema);

module.exports = WarehouseModel;