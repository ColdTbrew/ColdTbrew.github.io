import { useState } from 'react';
import TutorialHeader from './TutorialHeader.jsx';


const TransferLists = (props) => {
   // starting data
   const movies = [
      { "id": 13, "title": "American Beauty" },
      { "id": 14, "title": "Be Cool" },
      { "id": 48, "title": "The Hateful Eight"},
      { "id": 102, "title": "A Beautiful Mind"},
      { "id": 212, "title": "Jaws"},
      { "id": 229, "title": "The Wild Bunch"},
      { "id": 306, "title": "Gangs of New York"},
      { "id": 352, "title": "Diamonds Are Forever"},
      { "id": 399, "title": "The Last of the Mohicans"}
   ];
 

   return (      
      <main >
         <TutorialHeader subtitle="Component Data Flow" />
         <article className="columns">

         </article>        
      </main>      
   );
   
}

export default TransferLists;