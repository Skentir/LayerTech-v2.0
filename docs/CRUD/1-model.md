tl:dr about mongo schemas

### First create a model.js(actual name up to you) file under api/models
![image](https://cdn.discordapp.com/attachments/694235353191809096/802898145457471488/unknown.png)

### Define your [Schema](https://docs.mongodb.com/realm/mongodb/document-schemas) 
The suppliers schema
```javascript
const { Schema, model} = require('mongoose');

const SuppliersSchema = new Schema({
    supplier_name: {type: String, required: true}, 
    files_link: {type: String, required: true}, 
    contact_num: {type: String, required: true}, 
    email: {type: String, required: true}, 
    company_name: {type: String, required: true}, 
    position: {type: String, required: true},
    supplier_id: {type: String, required: true}, 
})
/*
  its model('collection_name', schema)
*/
const SupplierItem = model('suppliers', SuppliersSchema);

module.exports = SupplierItem;
```

4 parts of the model.js file

1. Schema and model by require('mongoose')
2. The schema itself
3. model('collection_name', schema)
4. exporting

thats really it for schema
