// import data
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`listen to requests on port: ${port} ........`));