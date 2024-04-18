
import { Grid } from '@chakra-ui/react';
import PaintingList from "./PaintingList.jsx";
import Favorites from "./Favorites.jsx";

const ArtBrowser = (props)  => {


   return (
      <Grid templateColumns="6fr 1fr" gap={2} as="main">
         <PaintingList paintings={props.paintings}/>
         <Favorites />
      </Grid>   

   );
}

export default ArtBrowser;
