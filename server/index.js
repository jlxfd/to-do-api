const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const Product = require('../models/productModel')
const mongoose = require('mongoose');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/', (req,res) => {
    res.send(('Hello NODE API'))
})


app.get('/todo-entries', async(req, res) => {
    try {
        const todoEntries = await Product.find({})
        res.status(200).json(todoEntries)
    } catch (error) {
        console.log(500).json({message: error.message})
    }
})

app.get('/todo-entries/:id', async(req, res) => {
    try {
        const {id} = req.params
        const todoEntry = await Product.findById(id)
        res.status(200).json(todoEntry)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/todo-entries/:id', async(req, res) => {
    try {
        const {id} = req.params
        const todoEntry = await Product.findByIdAndUpdate(id, req.body)
        if (!todoEntry){
            return res.status(404).json({message: `cannot find todo entry with id ${id}`})
        }
        const updatedTodoEntry = await Product.findById(id)
        res.status(200).json(updatedTodoEntry)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/todo-entries', async(req, res) => {
    try {
        const todoEntry = await Product.create(req.body)
        res.status(200).json(todoEntry)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(500).json({message: error.message})
    }
})

app.delete('/todo-entries/:id', async(req, res) => {
    try {
        const {id} = req.params
        const todoEntry = await Product.findByIdAndDelete(id)
        if (!todoEntry){
            return res.status(404).json({message: `cannot find todo entry with id ${id}`})
        }
        res.status(200).json(todoEntry)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.
connect('mongodb+srv://admin:fCI4bQtest@cluster0.pnxdbkq.mongodb.net/ToDoApp?retryWrites=true&w=majority')
.then(() => {
    app.listen(PORT, () => {
        console.log(`To Do App is running on port ${PORT}`)
    })
    console.log('connected to mongoDB')
}).catch((error) => {
    console.log(error)
})