import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import CollectionForm from "../../../components/marketplace/CollectionForm";
export default function CreateCollectionPage() {
  return (
    <Container maxW="container.sm">
      <Heading my={4}>Create a Collection</Heading>
      <CollectionForm />
    </Container>
  );
}
