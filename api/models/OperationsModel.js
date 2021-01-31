const { Schema, model} = require('mongoose');

const OperationsSchema = new Schema({
    serial_id: {type: String, required: true},
    username: {type: String, required: true},
    quantity: {type: Number, min: 0, required: true},
    original_quantity: {type: Number, min: 0, required: true},
    entry: {type: String, required: true, enum: ['IN', 'OUT']},
    s_eggs_sold: {type: Number, min: 0, required: true},
    m_eggs_sold: {type: Number, min: 0, required: true},
    l_eggs_sold: {type: Number, min: 0, required: true},
})

const OperationsItem = model('operations', OperationsSchema);

module.exports = OperationsItem;