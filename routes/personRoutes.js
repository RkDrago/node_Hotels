import express from 'express';
const router = express.Router();
import Person from '../models/Person.js';

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log("data saved")
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

//Get method to get all the persons
router.get('/', async (req, res) => {
    try {
        const response = await Person.find()
        console.log("data fetched")
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (id == 'chef' || id == 'manager' || id == 'waiter') {
            const response = await Person.find({ work: id })
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

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const response = await Person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: "Person not found!" })
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
        const response = await Person.findByIdAndDelete(id)

        if (!response) {
            return res.status(404).json({ error: "Person not found!" })
        }

        console.log("Data is deleted!")
        res.status(200).json({ message: "Person is deleted successfully!" })
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server Error!")
    }
})

export default router