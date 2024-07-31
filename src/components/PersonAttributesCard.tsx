import { Card, CardBody, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import Person from "../entities/Person";
import formatReleaseDate from "../services/date-conversion";
import DefinitionItem from "./DefinitionItem";

interface Props {
  person: Person;
}

const PersonAttributesCard = ({ person }: Props) => {
  let columnCount = 0;

  if (person.birthday) columnCount++;
  if (person.place_of_birth) columnCount++;
  if (person.deathday) columnCount++;
  if (person.also_known_as && person.also_known_as.length >= 1) columnCount++;

  if (columnCount === 0) return null;

  return (
    <Card marginTop={5}>
      <CardBody>
        <SimpleGrid columns={columnCount} as="dl">
          {person.birthday && (
            <DefinitionItem term="DATE OF BIRTH">
              {formatReleaseDate(person.birthday!)}
            </DefinitionItem>
          )}

          {person.deathday && (
            <DefinitionItem term="DATE OF DEATH">
              {formatReleaseDate(person.deathday!)}
            </DefinitionItem>
          )}

          {person.place_of_birth && (
            <DefinitionItem term="PLACE OF BIRTH">
              {person.place_of_birth}
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
