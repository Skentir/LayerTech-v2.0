const { Schema, model } = require('mongoose')

const ChickenSchema = new Schema({
    //batch_num(PK) = automatic
    //supplier: {type: Schema.Types.ObjectId, ref: 'suppliers', required: [true, "no supplier id provided"]}, 
    batch_number: {type: Number, min: 0, required: [true, "No batch number provided"]},
    called_out_quantity: {type: Number, min: 0, required: [true, "No called out quantity provided"]},
    supplier_name: {type: String, required: [true, "No supplier_name provided"]},
    breed: {type: String, required: [true, "No breed provided"]},
    chicken_type: {type: String, required: [true, "No title provided"]},
    population: {type: Number, min: 0, required: [true, "No title provided"]},
    mortality_rate: {type: Number, min: 0, required: [true, "No mortality rate provided"]},
    morbidity_rate: {type: Number, min: 0, required: [true, "No morbidity rate provided"]},
    feed_requirement: {type: String, required: [true, "No feed requirement provided"]},
    vaccination_schedule: {type: String, required: [true, "No vaccination schedule provided"]},
    date_received: {type: Date, default: Date.now, required: [true, "No date received provided"]},
    person_in_charge: {type: String, required: [true, "No person in-charge provided"]},
    section: {type: String, required: [true, "No section provided"]},
    building: {type: String, required: [true, "No building provided"]},
});

const ChickenModel = model('Chicken', ChickenSchema);
module.exports = ChickenModel
//Methods
