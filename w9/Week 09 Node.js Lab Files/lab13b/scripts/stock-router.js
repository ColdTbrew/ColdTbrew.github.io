/* Module for handling specific requests/routes for stock data  */  

const provider = require('./stock-provider.js');
const stocks = provider.data;

// error messages need to be returned in JSON format
const jsonMessage = (msg) => {
   return { message : msg };
};

const handleCurlTest = (app) => {



};


// return all the stocks when a root request arrives
const handleAllStocks = (app) => {    
   app.get('/stock', (req,resp) => { resp.json(stocks) } );
};

// return just the requested stock
const handleSingleSymbol = (app) => {
   // GET request: Retrieve data for single stock
   app.get('/stock/:symbol', (req,resp) => {
      // change user supplied symbol to upper case
      const symbolToFind = req.params.symbol.toUpperCase();
      // search the array of objects for a match
      const matches = stocks.filter(s => symbolToFind === s.symbol);
      // return the matching stock
      if (matches.length > 0) {
         resp.json(matches);
      } else {
         resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
      }
   });


};
// return all the stocks whose name contains the supplied text
const handleNameSearch = (app) => {
   app.get('/stock/name/:substring', (req,resp) => {
      // change user supplied substring to lower case
      const substring = req.params.substring.toLowerCase();
      // search the array of objects for a match 
      const matches = stocks.filter( s => s.name.toLowerCase().includes(substring) );
      // return the matching stocks
      if (matches.length > 0) {
         resp.json(matches);
      } else {
         resp.json(jsonMessage(`No symbol matches found for ${substring}`));
      }
   });
};

module.exports = {
   handleCurlTest,
   handleAllStocks,
   handleSingleSymbol,
   handleNameSearch
};
