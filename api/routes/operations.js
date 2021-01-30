const { Router } = require('express')
const OperationModel = require('../models/OperationModel')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const operations = await OperationModel.find()
        if (!operations) throw new Error('No operations')
        const sorted = operations.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newOperation = new OperationModel(req.body)
    try {
        const operation = await newOperation.save()
        if (!operation) throw new Error('Something went wrong saving the operation')
        res.status(200).json(operation)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await OperationModel.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await OperationModel.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router