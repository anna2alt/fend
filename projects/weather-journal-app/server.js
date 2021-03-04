// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log(`Server is running on localhost: ${port}`);
}

// get route
app.get('/all', getAll);

function getAll(req, res) {
    res.send(projectData);
}

//post route
app.post('/addData', addData);

function addData(req, res) {
    const newData = req.body;
    projectData.date = newData.date;
    projectData.temp = newData.temp;
    projectData.content = newData.content;
}