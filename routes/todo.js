const express = require('express');
const router = express.Router();
const Todo = require('../db.js');
const mongoose = require('mongoose');

// show all todo
router.get('/', async(req, res) => {
    const all_todo = await Todo.find({});
    res.json({all_todo});
});
// show one todo by specified id
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    res.json({todo});
});
// add todo
router.post('/', async(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const newTodoData = {title, description};
    const newTodo = await Todo.create(newTodoData);
    res.json({
        message: 'new todo created',
        todoId: newTodo._id
    });
});

// update todo
router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const newTodoData = {title, description};
    const updatedTodo = await Todo.findByIdAndUpdate(id, newTodoData); 
    res.json({
        message: 'todo updated'
    })
});
// delete todo
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.json({
        message: 'Todo deleted'
    })

})


module.exports = router;