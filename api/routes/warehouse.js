const { Router } = require('express')
const Warehouse = require('../models/WarehouseModel')
const router = Router();


router.get('/', async (req, res) => {

    try{
        console.log('Tried');
        const warehouse_items_list = await Warehouse.find();
        if(!swarehouse_items_list) throw new Error('No Warehouse Items')
        
        res.status(200).json(warehouse_items_list);

    }catch(error) {
        res.status(500).json({ message: error.message })
    }
})


router.post('/', async (req, res) => {

    const new_warehouse_item = new Warehouse(req.body)
    try{
        const warehouse_items_list = await new_warehouse_item.save()
        if(!warehouse_items_list) throw new Error('Error in saving to database')
    
        res.status(200).json(warehouse_items_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
        
    } 
})


router.put('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const response = await Warehouse.findByIdAndUpdate(id, req.body);
        if(!response) throw Error('Error in updating')
        const updated = { ...response._doc, ...req.body}
        res.status(200).json(updated);
    }catch(error){
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})   

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Warehouse.findByIdAndDelete(id)
        if (!removed) throw Error('Error in deleting')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
