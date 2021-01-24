const { Router } = require('express')
const Suppliers = require('../models/SupplierModel')
const router = Router();

// Get
router.get('/', async (req, res) => {
    try{
        const suppliers_list = await Suppliers.find()
        if(!suppliers_list) throw new Error('No Suppliers')
    
        res.status(200).json(suppliers_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
    }
})

//Add
router.post('/', async (req, res) => {

    const new_supplier = new Suppliers(req.body)
    try{
        const suppliers_list = await new_supplier.save()
        if(!suppliers_list) throw new Error('something went wrong')
    
        res.status(200).json(suppliers_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
        
    } 
})

//Update

router.put('/:id', async (req, res) => {
    try{
        const response = await Suppliers.findOneAndUpdate({supplier_id: req.params.id}, req.body);
        if(!response) throw Error('Something went wrong')
        const updated = { ...response._doc, ...req.body}
        res.status(200).json(updated);
    }catch(error){
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})   

module.exports = router;
