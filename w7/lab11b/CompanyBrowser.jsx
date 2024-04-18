
import CompanyList from './CompanyList.jsx';
import CompanyForm from './CompanyForm.jsx';

import { useState } from 'react';

const CompanyBrowser= (props) => {

   const [companies, setCompanies]  = useState(
      [
         {name: "FaceBook", symbol: "FB", 
           sector: "Internet Software", 
           hq: "Menlo Park, California",
          description: "Description for Facebook"},
         {name: "Alphabet Inc Class A", symbol: "GOOG", 
           sector: "Information Technology", 
           hq: "Mountain View, California",
           description: "Description for Google/Alphabet"},
         {name: "Apple", symbol: "AAPL", 
           sector: "Information Technology", 
           hq: "Cupertino, California",
           description: "Description for Apple"},
         {name: "AT&T", symbol: "T", 
           sector: "Telecommunications Services", 
           hq: "Dallas, Texas",
           description: "Description for AT&T"}
       ]
   );   


   return (
    <div className="container grid grid-cols-7 gap-4 text-lg text-gray-500 m-4 bg-gray-700 ">
      <div className="col-span-2 ">
         <CompanyList  />
      </div>
      
      <CompanyForm  />
    </div>      
   )

}

export default CompanyBrowser;