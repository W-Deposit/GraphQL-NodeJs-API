// import data
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
// import the route
const apiRoute = require('./routes/api');
app.use('/api', apiRoute);

app.use(bodyParser.json());

mongoose.connect(process.env.DBPATH, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('wdeposit mongoDB connected successfuly');
}) 
    


const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`listen to requests on port: ${port} ........`));