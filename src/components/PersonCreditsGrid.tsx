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
import CardContainer from "./MovieCardContainer";
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
          columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={6}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <MovieCardSkeleton />
              </CardContainer>
            ))}
          {credits.map((movie) => (
            <React.Fragment key={movie.id}>
              <CardContainer key={movie.id}>
                <MovieCard
                  movie={movie}
                  association={type === "crew" ? movie.job : movie.character}
                ></MovieCard>
              </CardContainer>
            </React.Fragment>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default PersonCreditsGrid;
