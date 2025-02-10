import {
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Text,
  Heading,
  Spinner,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";
import usePersonCredits from "../hooks/usePersonCredits";
import MovieCard from "./MovieCard";
import { consolidateMovieArray } from "../services/consolidate-object-array";
import usePersonListEntryCredits from "../hooks/usePersonListEntryCredits";
import ListEntrySlab from "./ListEntrySlab";
import ListEntryCard from "./ListEntryCard";
import { dateStringDifference } from "../services/date-conversion";

interface Props {
  person_id: string;
}

const PersonListEntryGrid = ({ person_id }: Props) => {
  let { data: credits, isLoading } = usePersonListEntryCredits(person_id);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const isAuthenticated = !!localStorage.getItem("access_token");
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortByRating, setSortByRating] = useState(true);

  if (!credits || credits.length == 0 || !isAuthenticated) return null;

  if (sortByRating) credits.sort((a, b) => b.rating - a.rating);
  else
    credits.sort((a, b) =>
      dateStringDifference(b.date_watched, a.date_watched)
    );

  const creditLength = credits.length;
  if (!isExpanded) credits = credits.slice(0, 3);

  return (
    <Card marginTop={5}>
      <CardHeader>
        <Heading marginLeft={3}>{"Credits In Your List"}</Heading>
        <Button
          marginLeft={3}
          marginTop={5}
          onClick={() => setSortByRating(!sortByRating)}
        >
          {sortByRating ? "Sort by Date Watched" : "Sort by Rating"}
        </Button>
        {creditLength > 3 && (
          <Button
            marginLeft={3}
            marginTop={5}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
        )}
      </CardHeader>
      <CardBody>
        <SimpleGrid
          padding="10px"
          // columns={{ sm: 3, md: 4, lg: 5, xl: 6 }}
          columns={3}
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
                <ListEntrySlab
                  consolidated={true}
                  listEntry={movie}
                ></ListEntrySlab>
              </CardContainer>
            </React.Fragment>
          ))}
        </SimpleGrid>
        {isExpanded && (
          <Button
            marginLeft={3}
            marginTop={5}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Show Less
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default PersonListEntryGrid;
