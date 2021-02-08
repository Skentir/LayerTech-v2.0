const { Router } = require('express')
const Warehouse = require('../models/WarehouseModel')
const router = Router();


router.get('/', async (req, res) => {

    try{
        console.log('Tried');
        const warehouse_items_list = await Warehouse.find();
        if(!warehouse_items_list) throw new Error('No Warehouse Items')
        
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

router.get('/alerts', async (req, res) => {
    try {
        const warehouse_items_list = await Warehouse.find();
        if(!warehouse_items_list) throw new Error('No Warehouse Items')

        const alertsList = []
        warehouse_items_list.forEach((item, index) => {
            var notifType = 0
            if(item.stock_quantity <= item.critical_volume && item.stock_quantity > 1){
                notifType=1
            }
            const current = Date.now();
            const expDate = new Date(item.expiration_date);
            const diffTime = Math.abs(expDate - current);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            if(diffDays == 1){
                notifType=3
            }
            else if(diffDays <= 7){
                notifType=2
            }
            if(notifType){
                alertsList.push({
                    batch_number: item.batch_number,
                    item_name: item.product_title,
                    type: notifType,
                })
            }
        })
        res.status(200).json(alertsList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
