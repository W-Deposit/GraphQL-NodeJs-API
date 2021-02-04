// import data
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
// import the route

app.use(express.json());
const apiRoute = require('./routes/api');
app.use('/api', apiRoute);

mongoose.connect(process.env.DBPATH, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, () => {
    console.log('W-Deposit mongoDB connected successfuly');
})
    


const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`Server is running at : http://localhost: ${port} `));