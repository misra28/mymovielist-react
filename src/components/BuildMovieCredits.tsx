import React, { useState } from "react";
import Person from "../entities/Person";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import getImage from "../services/backdrop-url";
import noPerson from "../assets/no-person-image.png";

interface Props {
  people: Person[];
  type: "cast" | "crew";
}

const BuildMovieCredits = ({ people, type }: Props) => {
  const [expanded, setExpanded] = useState(false);
  let hideButton = false;

  let getCredits = people
    .filter((person) => person.profile_path)
    .map((person) => (
      <React.Fragment>
        <div className="box">
          <Image
            src={person.profile_path ? getImage(person.profile_path) : noPerson}
            background={"white"}
            borderRadius={"11px"}
          />
          <Text>{person.name}</Text>
          <Text color={"gray"}>
            {type === "cast" ? person.character : person.job}
          </Text>
        </div>
      </React.Fragment>
    ));

  if (getCredits?.length && getCredits.length <= 5) {
    hideButton = true;
  }

  let buttonLabel = "Show Less";

  if (!expanded) {
    getCredits = getCredits?.slice(0, 5);
    buttonLabel = "Show More";
  }

  return (
    <Card marginTop={5}>
      <CardHeader display={"flex"} paddingBottom={0}>
        <Heading as="h1" width={"50%"}>
          {type === "cast" ? "Cast" : "Crew"}
        </Heading>
        <Button
          size="sm"
          marginLeft={"40%"}
          marginTop={"2"}
          colorScheme="gray"
          onClick={() => setExpanded(!expanded)}
          hidden={hideButton}
        >
          {buttonLabel}
        </Button>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={5}>
          {getCredits}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default BuildMovieCredits;
