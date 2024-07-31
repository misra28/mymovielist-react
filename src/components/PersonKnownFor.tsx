import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import usePersonCredits from "../hooks/usePersonCredits";
import CardContainer from "./MovieCardContainer";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import React from "react";
import consolidateArray, {
  consolidateMovieArray,
} from "../services/consolidate-object-array";

interface Props {
  person_id: string;
}

const PersonKnownFor = ({ person_id }: Props) => {
  const { data: movies, isLoading } = usePersonCredits(parseInt(person_id));

  if (!movies) return null;

  let topMovies = consolidateMovieArray(
    movies.cast.concat(movies.crew),
    "known for"
  )!
    .filter((m) => new Date(m.release_date!).getMilliseconds() <= Date.now())
    .sort((a, b) => b.popularity! - a.popularity!)
    .slice(0, 4);
  const skeletons = [1, 2, 3, 4];

  return (
    <Card marginTop={5}>
      <CardHeader marginLeft={3}>
        <Heading>Popular Associated Films</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid
          padding="10px"
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <MovieCardSkeleton />
              </CardContainer>
            ))}
          {topMovies.map((movie) => (
            <React.Fragment key={movie.id}>
              <CardContainer key={movie.id}>
                <MovieCard
                  movie={movie}
                  association={movie.character || movie.job}
                ></MovieCard>
              </CardContainer>
            </React.Fragment>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default PersonKnownFor;
