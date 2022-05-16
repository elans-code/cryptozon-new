import React from "react";
import { Grid } from "@chakra-ui/react";
import CollectionItem from "./CollectionItem";
export default function CollectionList({ collections }) {
  return (
    <Grid
      templateColumns="repeat(auto-fill, 24rem)"
      gap="1.5rem"
      autoRows="minmax(24rem,max-content)"
      justifyContent="center"
    >
      {!!collections.length &&
        collections.map((coll) => <CollectionItem key={coll.id} coll={coll} />)}
    </Grid>
  );
}
