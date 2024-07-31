import {
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Text,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";
import usePersonCredits from "../hooks/usePersonCredits";
import MovieCard from "./MovieCard";
import { consolidateMovieArray } from "../services/consolidate-object-array";

interface Props {
  person_id: string;
  type: "cast" | "crew";
}

const PersonCreditsGrid = ({ person_id, type }: Props) => {
  const { data: movies, isLoading } = usePersonCredits(parseInt(person_id));
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (!movies) return null;

  let credits = movies.crew;
  if (type === "cast") credits = movies.cast;

  if (credits.length === 0) return null;

  credits = type === "cast" ? credits : consolidateMovieArray(credits, type)!;
  if (!credits) return null;

  return (
    <Card marginTop={5}>
      <CardHeader>
        <Heading marginLeft={3}>
          {type === "cast" ? "Acting Credits" : "Production Credits"}
        </Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid
          padding="10px"
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <MovieCardContainer key={skeleton}>
                <MovieCardSkeleton />
              </MovieCardContainer>
            ))}
          {credits.map((movie) => (
            <React.Fragment key={movie.id}>
              <MovieCardContainer key={movie.id}>
                <MovieCard
                  movie={movie}
                  association={type === "crew" ? movie.job : movie.character}
                ></MovieCard>
              </MovieCardContainer>
            </React.Fragment>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default PersonCreditsGrid;
