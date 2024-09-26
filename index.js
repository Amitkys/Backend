const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.js'); // todo routes

app.use(bodyParser.json());
app.use('/todos', todoRouter);

mongoose.connect(process.env.DB_URL).then(() => console.log('connected to db'));

app.get('/', (req, res) => {
    res.send('<h1> this is home page </h1>');
});

app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));