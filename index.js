const express = require("express");
const app = express();
var Twit = require("twit");
var bodyParser = require('body-parser');
const port = 8080;

const getRouter = require('./routes/get');
const postRouter = require('./routes/post');

app.use('/get',getRouter);

// app.use(bodyParser.json());
app.use('/post',postRouter);

app.listen(port, ()=>{
    console.log(`The server is serving on ${port}`);
})