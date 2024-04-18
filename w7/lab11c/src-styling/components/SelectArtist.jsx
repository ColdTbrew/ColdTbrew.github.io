import './SelectArtist.css';
import ArtistOption from './ArtistOption.jsx';

const SelectArtist = (props) => {

   const handleChange = (e) => {
      //alert("changed =" + e.target.value);
      props.artistHandler(e.target.value);
   }

   if (props.artists && props.artists.length > 0) {
      return (
               <select className="select-css" onChange={handleChange}>
                  <option value="0">Select an artist</option>
                  { props.artists.map( a => <ArtistOption key={a.artistID} artist={a} /> ) }
               </select>
            );
   } else {
	   return null;
   }
   

}

export default SelectArtist;