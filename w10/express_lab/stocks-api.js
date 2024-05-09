const fs = require('fs');
const path = require('path');
const express = require('express');

// for now, we will get our data by reading the provided json file 
// const file = 'stocks-complete.json'; 
// // const jsonPath = path.join(__dirname, 'data', file); // read file contents synchronously 
// // const jsonData = fs.readFileSync(jsonPath, 'utf8'); // convert string data into JSON object 
//const stocks = JSON.parse(jsonData); 
// create an express app 
const app = express();

const provider = require('./scripts/data-provider.js');
const stocks = provider.data;

app.use('/static',
  express.static(path.join(__dirname, 'public')));

// set up route handling 
const router = require('./scripts/stock-router.js');
router.handleAllStocks(app);
router.handleSingleSymbol(app);
router.handleNameSearch(app);
// Use express to listen to port 
let port = process.env.PORT; app.listen(port, () => { 
  console.log("Server running at port= " + port); 
});