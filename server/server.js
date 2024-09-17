const express = require('express')
const app = express()
const cors = require('cors')
const port = 8080

//Config =======================================================
const mongoose = require('mongoose')
require('dotenv').config()

const db = process.env.MONGO_URI

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`${db} is connected`))
    .catch(err => console.error(err))
// ==============================================================

app.use(express.json({ limit: '50mb' }), express.urlencoded({ extended: true }))
app.use(cors({ orgin: 'http://localhost:3000', credentials: true }))


// Model ==========================================================
const { Schema } = mongoose

const TaskSchema = new Schema({
    title: String,
    text: String,
    date: String
}, { timestamps: true })

const Task = new mongoose.model("Task", TaskSchema)
//==================================================================



// Create   ============================== Routes ====================
app.post('/newTask', (req, res) => {
    Task.create(req.body)
        .then(created => res.json(created))
        .catch(err => console.error(err))
})

// GET
app.get('/task', (req, res) => {
    Task.find()
        .then(found => res.json(found))
        .catch(err => console.error(err))
})

// Update
app.put('/updateTask/:id', (req, res) => {

    Task.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false })
        .then((found) => res.json(found))
        .catch((err) => console.log(err))
})

// Delete
app.put('/removeTask/:id', (req, res) => {

    Task.findByIdAndDelete(req.params.id)
        .then((removed) => res.json(removed))
        .catch((err) => console.error(err))
})

//========================  // Routes ===============================  

app.listen(port, () => console.log(`${port} is running`))