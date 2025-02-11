import express from 'express';
const router = express.Router();
import Menu from '../models/Menu.js';

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newMenu = new Menu(data)
        const response = await newMenu.save()
        console.log("data saved")
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await Menu.find()
        console.log("data is fetched!")
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server Error!")
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (id == 'spicy' || id == 'sweet' || id == 'sour' || id == 'bitter' || id == 'salty') {
            const response = await Menu.find({ taste: id })
            console.log("data is fetched!")
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: "Request not found!" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server Error!")
    }
})

router.put('/:id', async (req, res ) => {
    try {
        const id = req.params.id
        const data = req.body
        const response = await Menu.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: "Request not found!" })
        }

        console.log("Data is updated!")
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server Error!")
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await Menu.findByIdAndDelete(id)
        if (!response) {
            return res.status(404).json({ error: "Request not found!" })
        }
        console.log("Data is deleted!")
        res.status(200).json({ message: "Data is deleted successfully!" })
        } catch (err) {
            console.log(err)
            res.status(500).json("Internal server Error!")
        }
})


export default router