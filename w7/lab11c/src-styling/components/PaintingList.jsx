import { useState, useEffect }  from 'react';
import './PaintingList.css';
import PaintingItem from './PaintingItem.jsx';

const PaintingList = (props) => {

   if (props.artist) {
      const filtered = props.paintings.filter(p => p.artist.artistID == props.artist.artistID);
      return (
        <section>
            <h3>Paintings for {props.artist.firstName} {props.artist.lastName}</h3>     
            <div id="paintingList">
            { filtered.map( p => 
                <PaintingItem key={p.paintingID} painting={p} /> ) }
           </div>                  
        </section>);
   } else {
      return (<section>No artist selected yet</section>);
   }
       

};

export default PaintingList;