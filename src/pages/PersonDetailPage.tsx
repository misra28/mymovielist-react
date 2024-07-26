import { GridItem, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import usePersonDetails from "../hooks/usePersonDetails";
import ExpandableText from "../components/ExpandableText";
import PersonProfileGrid from "../components/PersonProfileGrid";
import PersonAttributesCard from "../components/PersonAttributesCard";
import PersonCreditsGrid from "../components/PersonCreditsGrid";
import PersonKnownFor from "../components/PersonKnownFor";

const PersonDetailPage = () => {
  const { person_id } = useParams();
  const {
    data: person,
    isLoading,
    error,
  } = usePersonDetails(parseInt(person_id!));

  if (isLoading) return <Spinner />;
  if (error || !person) return null;

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} marginBottom={5}>
        <GridItem>
          <Heading marginBottom={3}>{person.name}</Heading>
          <ExpandableText>{person.biography!}</ExpandableText>
        </GridItem>
        <GridItem>
          <PersonProfileGrid person_id={person_id!} />
        </GridItem>
      </SimpleGrid>
      <PersonAttributesCard person={person!} />
      <PersonKnownFor person_id={person_id!} />
      <PersonCreditsGrid person_id={person_id!} type={"cast"} />
      <PersonCreditsGrid person_id={person_id!} type={"crew"} />
    </>
  );
};

export default PersonDetailPage;
