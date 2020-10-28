// import data
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
// import the route

app.use(bodyParser.json());
app.use(express.json());
const apiRoute = require('./routes/api');
app.use('/api', apiRoute);

mongoose.connect(process.env.DBPATH, {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('W-Deposit mongoDB connected successfuly');
}) 
    


const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`listen to requests : http://localhost: ${port} `));