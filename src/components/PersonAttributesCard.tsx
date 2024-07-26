import { Card, CardBody, SimpleGrid, Text } from "@chakra-ui/react";
import DefinitionItem from "./DefinitionItem";
import Movie from "../entities/Movie";
import minutesToHours from "../services/minutes-to-hours";
import React from "react";
import formatReleaseDate from "../services/date-conversion";
import Person from "../entities/Person";

interface Props {
  person: Person;
}

const PersonAttributesCard = ({ person }: Props) => {
  return (
    <Card marginTop={5}>
      <CardBody>
        <SimpleGrid columns={2} as="dl">
          {person.birthday && (
            <DefinitionItem term="DATE OF BIRTH">
              {formatReleaseDate(person.birthday!)}
            </DefinitionItem>
          )}

          <DefinitionItem term="PLACE OF BIRTH">
            {person.place_of_birth!}
          </DefinitionItem>

          {person.deathday && (
            <DefinitionItem term="DATE OF DEATH">
              {formatReleaseDate(person.deathday!)}
            </DefinitionItem>
          )}

          {person.also_known_as && person.also_known_as.length >= 1 && (
            <DefinitionItem term="ALSO KNOWN AS">
              <React.Fragment>
                {person.also_known_as &&
                  person.also_known_as.length >= 1 &&
                  person.also_known_as.map((alias) => <Text>{alias}</Text>)}
              </React.Fragment>
            </DefinitionItem>
          )}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default PersonAttributesCard;
