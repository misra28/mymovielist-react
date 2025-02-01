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
import { dateStringDifference } from "../services/date-conversion";

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

  credits.sort((a, b) =>
    dateStringDifference(b.release_date!, a.release_date!)
  );
  const today = new Date().toISOString().split("T")[0];
  const dateToday = new Date(today);
  const upcomingCredits = credits.filter(
    (c) => new Date(c.release_date!) > dateToday
  );
  credits = credits.filter((c) => new Date(c.release_date!) <= dateToday);

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
          columns={{ sm: 3, md: 4, lg: 5, xl: 6 }}
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
          {upcomingCredits.map((movie) => (
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
