import { useState, useEffect }  from 'react';
import SelectArtist from './SelectArtist.jsx';
import PaintingList from './PaintingList.jsx';

const ArtistPaintings = (props) => {

   // this initializes a state variable, the useState function returns
   // a 2-element array, so we use array destructuring
   const [selectedArtist, setSelectedArtist] = useState(null);

   const [paintings, setPaintings] = useState([]);
   
   useEffect( () => {
      console.log('useEffect ');
      // Here we are using a json file in the public folder.
      // In a real-world example, you’d use the URL of a web API
      const url = '/paintings.json';
      fetch(url)
        .then( resp => resp.json() )
        .then( data => {
            setPaintings(data);/*  */
        })
        .catch( err => {console.error(err)});

    },[]);


   const specifyArtist = (id) => {
      const selected = props.artists.find(a => a.artistID == id);
      console.log(selected);
      setSelectedArtist(selected);
    };
  

    return (
      <div className="ArtistPaintingsContainer">         
        <header>           
          <SelectArtist artists={props.artists} artistHandler={specifyArtist} />
        </header>
        <main>
          <PaintingList artist={selectedArtist} paintings={paintings} />
        </main>
      </div>
     );   
  

};

export default ArtistPaintings;