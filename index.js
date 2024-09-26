const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const mongoose = require('mongoose');
const { createTodo, updateTodo } = require('./zod');
const {Todo} = require('./db');
const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(cors()); 

async function main(){
    try{
        await mongoose.connect('mongodb://localhost:27017/todo');
        console.log('connected to database');
    }catch(err){
        console.error(err);
    }
}

app.post('/todo', async (req, res) => {
    // verify input, by zod
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: 'you send wrong input',
        });
        return;
    }
    // put it into mongoDB
    await Todo.create({
        title: createPayload.title,
        description: createPayload.description
    });
    res.json({
        msg: 'Todo created.'
    })
});

app.get('/todo', async (req, res) => {
    const todos = await Todo.find({});
    res.json({todos});
})

app.put('/completed', async(req, res) => {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: 'you have sent wrong input',
        })
    }
    await Todo.updateOne({
        _id: updatePayload.id
    }, {
        isCompleted: true
    });
    res.json({
        msg: 'Taks completed!'
    });

});



app.listen(port, () => {
    console.log(`app is listening on ${port}`);
})
main();