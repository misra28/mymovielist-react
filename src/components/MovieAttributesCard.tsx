import { Card, CardBody, SimpleGrid, Text } from "@chakra-ui/react";
import DefinitionItem from "./DefinitionItem";
import Movie from "../entities/Movie";
import minutesToHours from "../services/minutes-to-hours";
import React from "react";
import formatReleaseDate from "../services/date-conversion";
import getImage from "../services/backdrop-url";

interface Props {
  movie: Movie;
}

const MovieAttributesCard = ({ movie }: Props) => {
  return (
    <Card marginTop={5}>
      <CardBody>
        <SimpleGrid columns={2} as="dl">
          <DefinitionItem term="RELEASE DATE">
            {formatReleaseDate(movie.release_date!)}
          </DefinitionItem>

          <DefinitionItem term="RUNTIME">
            {minutesToHours(movie.runtime!)}
          </DefinitionItem>

          <DefinitionItem term="GENRES">
            {movie.genres!.map((genre) => (
              <Text key={genre.id}>{genre.name}</Text>
            ))}
          </DefinitionItem>

          <DefinitionItem term="PRODUCTION COMPANIES">
            <React.Fragment>
              {movie.production_companies!.map((company) => (
                <Text key={company.id}>{company.name}</Text>
              ))}
              {/* <Image src={getBackdrop(company.logo_path)}></Image> */}
            </React.Fragment>
          </DefinitionItem>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default MovieAttributesCard;
