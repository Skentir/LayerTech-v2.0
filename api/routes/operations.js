const { Router } = require('express')
const Operations = require('../models/OperationsModel')
const router = Router();

router.get('/', async (req, res) => {
    try{
        const operations_list = await Operations.find()
        if(!operations_list) throw new Error('No Operations Items')
    
        res.status(200).json(opearations_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {

    const new_operations_item = new Operations(req.body)
    try{
        const operations_list = await new_operations_item.save()
        if(!operations_list) throw new Error('Error with inserting new object into DB')
    
        res.status(200).json(operations_list);
    }catch(error) {
        res.status(500).json({ message: error.message })
        
    } 
})

router.put('/:id', async (req, res) => {
    try{
        const response = await Operations.findByIdAndUpdate(req.body);
        if(!response) throw Error('Something went wrong')
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
        const removed = await Operations.findByIdAndDelete(id)
        if (!removed) throw Error('Error in deleting')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
