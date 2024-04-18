import ArtistPaintings from './ArtistPaintings.js';

const HomeStyles = () => 

	const [artists, setArtists] = useState([]);
	const [paintings, setPaintings] = useState([]);
	
   useEffect( () => {
      console.log('useEffect ');
      const url = "https://randyconnolly.com/funwebdev/3rd/api/art/artists.php";

      if (artists.length <= 0) {
         console.log('pre-fetch');
         fetch(url)
         .then( resp => resp.json() )
         .then( data => setArtists(data))
         .catch( err => {console.error(err)});
      }
    },[]);	
 
  
    return (
      <ArtistPaintings artists={this.state.artists} />
    );
  
}

export default HomeStyles;
