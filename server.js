// Purpose: This file is the entry point for the application. It creates an express server and listens on port 3000.

// Import express
import express from 'express'
const app = express()
import db from './db.js'

import personRoutes from './routes/personRoutes.js'
import menuRoutes from './routes/menuRoutes.js'

//new comment added for testing
import bodyParser from 'body-parser'
app.use(bodyParser.json())//req.body


app.get('/', function (req, res) {
    res.send('Welcome to our hotel!')
})

//use the routes
app.use('/menu', menuRoutes)
app.use('/person', personRoutes)

app.listen(3000, () => {
    console.log("listening on port 3000")
})