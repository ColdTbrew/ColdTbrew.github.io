const path = require("path");
const fs = require("fs");

// for now, we will get our data by reading the provided json file
const file = process.env.STOCKFILE; // 'stocks-complete.json';
const jsonPath = path.join(__dirname, '../data', file );
const jsonData = fs.readFileSync(jsonPath, 'utf8');
// convert string data into JSON object
const stocks = JSON.parse(jsonData);

module.exports = { 
   filename: file,
   data: stocks
 };