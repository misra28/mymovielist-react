import React from "react";
import Person from "../entities/Person";
import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import getImage from "../services/backdrop-url";

interface Props {
  person: Person;
}

const PersonCard = ({ person }: Props) => {
  return (
    <Card variant={"elevated"} bgColor="#121212" borderRadius={10}>
      <Link to={`/people/${person.id}`}>
        <CardBody>
          <Image
            src={
              person.profile_path ? getImage(person.profile_path) : getImage()
            }
            width={"100%"}
          />
          {/* <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
            {person.known_for?.map((m) => (
              <Image
                src={m.poster_path ? getImage(m.poster_path) : getImage()}
              ></Image>
            ))}
          </SimpleGrid> */}
          <Heading fontSize="1.3rem" fontWeight={"bold"} marginTop={1}>
            {person.name}
          </Heading>
          <Text>{person.known_for_department}</Text>
        </CardBody>
      </Link>
    </Card>
  );
};

export default PersonCard;
