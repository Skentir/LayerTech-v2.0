tl;dr for routes
reference [video](https://youtu.be/vr6O-IYebXA?t=679)
as sent by Axel

### create your route_name.js file under api/routes/api 

define your constants

```javascript
const { Router } = require('express')
const Suppliers = require('../models/SupplierModel')
const router = Router();
```

Important:
  1. require Router from express
  2. your model
  3. setting the router
  
### Get/Read
```javascript
router.get('/', async (req, res) => {
    try{
        const suppliers_list = await Suppliers.find()
        if(!suppliers_list) throw new Error('No Suppliers')
    
        res.status(200).json(suppliers_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
    }
})
```

### Post/Add or Save
```javascript
router.post('/', async (req, res) => {

    const new_supplier = new Suppliers(req.body)
    try{
        const suppliers_list = await new_supplier.save()
        /*
          suppliers_list here is NOT the list of all suppliers
          its just the variable that holds the NEWLY created supplier
        */
        if(!suppliers_list) throw new Error('something went wrong')
    
        res.status(200).json(suppliers_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
        
    } 
})
```

### Put/Update
```javascript
router.put('/:id', async (req, res) => {
    /*
      :id is the objectId
    */
    try{
        const response = await Suppliers.findByIdAndUpdate(req.body);
        if(!response) throw Error('Something went wrong')
        /*  
          below is just a way to store the new data of the supplier in updated
        */
        const updated = { ...response._doc, ...req.body}
        res.status(200).json(updated);
    }catch(error){
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})
```

### Delete
- check reference [video](https://youtu.be/vr6O-IYebXA?t=924)

When yall done with routes don't forget to export ther router
```javascript
module.exports = router;
```
