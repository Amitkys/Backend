const mongoose = require('mongoose');
const { boolean } = require('zod');

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo; 