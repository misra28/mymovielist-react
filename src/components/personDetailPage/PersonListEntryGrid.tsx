import {
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Text,
  Heading,
  Spinner,
  Button,
  HStack,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import CardContainer from "../movieSearchPage/MovieCardContainer";
import MovieCardSkeleton from "../movieSearchPage/MovieCardSkeleton";
import usePersonCredits from "../../hooks/usePersonCredits";
import MovieCard from "../movieSearchPage/MovieCard";
import { consolidateMovieArray } from "../../services/consolidate-object-array";
import usePersonListEntryCredits from "../../hooks/usePersonListEntryCredits";
import ListEntryCard from "../userMovieListPage/ListEntryCard";
import ListEntrySlab from "../userMovieListPage/ListEntrySlab";
import { dateStringDifference } from "../../services/date-conversion";
import useGetUserFavPerson from "../../hooks/useGetUserFavPerson";
import AddFavPersonButton from "./AddFavPersonButton";
import { useNavigate } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import useGetUserFavFilmsOfPerson from "../../hooks/useGetUserFavFilmsOfPerson";
import AddFavFilmOfPersonButton from "./AddFavFilmOfPersonButton";

interface Props {
  person_id: string;
}

const PersonListEntryGrid = ({ person_id }: Props) => {
  const navigate = useNavigate();
  let { data: credits, isLoading } = usePersonListEntryCredits(person_id);
  const { data: favPerson } = useGetUserFavPerson(person_id);
  const { data: favFilmsOfPerson } = useGetUserFavFilmsOfPerson(
    parseInt(person_id)
  );
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const isAuthenticated = !!localStorage.getItem("access_token");
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortByRating, setSortByRating] = useState(true);
  const isFavPerson = useMemo(
    () => !!favPerson && favPerson.length > 0,
    [favPerson]
  );

  const hasFavFilms = useMemo(() => !!favFilmsOfPerson, [favFilmsOfPerson]);

  if (!credits || credits.length == 0 || !isAuthenticated) return null;

  console.log(favPerson);

  if (sortByRating)
    credits.sort((a, b) => b.simplified_rating - a.simplified_rating);
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
        {(!isFavPerson && <AddFavPersonButton person_id={person_id} />) || (
          <Button
            marginLeft={3}
            marginTop={5}
            onClick={() => navigate("/user/favorites/")}
          >
            Added to Favorites
          </Button>
        )}
        <Button
          marginLeft={3}
          marginTop={5}
          onClick={() => setSortByRating(!sortByRating)}
        >
          {sortByRating ? "Sorted by Rating" : "Sorted by Date Watched"}
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
          {credits.map((listEntry) => (
            <React.Fragment key={listEntry.id}>
              <CardContainer key={listEntry.id}>
                {isFavPerson &&
                  ((hasFavFilms &&
                    favFilmsOfPerson!.filter(
                      (f) => f.listEntry === listEntry.id
                    ).length > 0 && (
                      <Button onClick={() => navigate("/user/favorites")}>
                        <HStack>
                          <>
                            <BsStarFill />
                            <Text>{`Favorite`}</Text>
                          </>
                        </HStack>
                      </Button>
                    )) || (
                    <AddFavFilmOfPersonButton
                      favPerson_id={favPerson![0].id.toString()}
                      listEntry_id={listEntry.id}
                    />
                  ))}
                <ListEntrySlab
                  consolidated={true}
                  listEntry={listEntry}
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
