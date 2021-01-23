const { Router } = require('express')
const ChickenModel = require('../models/ChickenModel')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const chickens = await ChickenModel.find()
        if (!chickens) throw new Error('No chickens')
        const sorted = chickens.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newChicken = new ChickenModel(req.body)
    try {
        const chicken = await newChicken.save()
        if (!chicken) throw new Error('Something went wrong saving the chicken')
        res.status(200).json(chicken)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await ChickenModel.findByIdAndUpdate(id, req.body)
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
        const removed = await ChickenModel.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router