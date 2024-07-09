const express = require('express');
const app = express();
const expressError = require('./expressError.js');
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
})

const checkToken = (req, res, next) => {
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    throw new expressError(384, "Access Denied");
}

app.get("/api", checkToken, (req, res) => {
    res.send("data");
})
app.get('/err', (req, res) => {
    abc = def;
})
app.get('/admin', (req, res) => {
    throw new expressError(367, "Access is forbidden for admin");
})

app.use((err, req, res, next) => {
    let {status = 500, message = "Something Went wrong"} = err;
    res.status(status).send(message); 
})

app.listen(port, () => {
    console.log('app is listing at 3000');
})