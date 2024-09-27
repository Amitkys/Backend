const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit'); // rate limiter
const todoRouter = require('./routes/todo.js'); // todo routes
const notificationRouter = require('./routes/notification.js'); // notification routes

// Define rate limit
const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 3, // limit each IP to 3 requests per windowMs
    message: 'Too many requests, please wait and try again.',
});

app.use(limiter);
app.use(bodyParser.json());
app.use('/todos', todoRouter);
app.use('/notification', notificationRouter);

mongoose.connect(process.env.DB_URL).then(() => console.log('connected to db'));

app.get('/', (req, res) => {
    res.send('<h1> this is home page </h1>');
});

app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));