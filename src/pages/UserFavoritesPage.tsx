import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  Text,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  CardHeader,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import ListEntryCard from "../components/userMovieListPage/ListEntryCard";
import CardContainer from "../components/movieSearchPage/MovieCardContainer";
import MovieCardSkeleton from "../components/movieSearchPage/MovieCardSkeleton";
import useCredentialsQueryStore from "../credentialsStore";
import useGetMovieList from "../hooks/useGetMovieList";
import getUserInfo from "../services/get-user-info";
import authService from "../services/auth-service";
import SortMovieListSelector from "../components/userMovieListPage/SortMovieListSelector";
import ListEntrySlab from "../components/userMovieListPage/ListEntrySlab";
import UserBioPanel from "../components/userFavoritesPage/UserBioPanel";
import useGetUserFavPeople from "../hooks/useGetUserFavPeople";
import UserFavPersonCard from "../components/userFavoritesPage/UserFavPersonCard";

const UserFavoritesPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access_token");
  if (!isAuthenticated) navigate("/user/");

  const user = getUserInfo();
  if (!user) return <Spinner />;

  const favoritesSortType = useCredentialsQueryStore(
    (s) => s.credentialsQuery.favoritesSortType
  );
  const setFavoritesSortType = useCredentialsQueryStore(
    (s) => s.setFavoritesSortType
  );

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const setUsername = useCredentialsQueryStore((s) => s.setUsername);
  const username = useCredentialsQueryStore((s) => s.credentialsQuery.username);
  const setUserId = useCredentialsQueryStore((s) => s.setUserId);
  const userId = useCredentialsQueryStore((s) => s.credentialsQuery.userId);

  const { data: favPeople, isLoading, error } = useGetUserFavPeople();
  if (error) return null;

  let colCount = 1;

  if (favPeople === undefined || favPeople.length === 0)
    return (
      <Card>
        <CardBody>
          <Text>Add your favorite actors and filmmakers!</Text>
        </CardBody>
      </Card>
    );

  // Sort list of favorite people
  favPeople.sort((a, b) => {
    if (!favoritesSortType || favoritesSortType == "fav_film_count") {
      if (a.fav_film_count > b.fav_film_count) return -1;
      else return 1;
    }
    if (b.person_name > a.person_name) return -1;
    else return 1;
  });

  return (
    <>
      <Grid
        width="100%"
        maxWidth="100vw"
        px={{ base: 2, md: 4 }} // Padding for better spacing
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {username && (
          <Heading
            marginBottom={"1rem"}
          >{`${username}'s Favorites Page`}</Heading>
        )}
        <Button
          width={{ base: "100%", sm: "8rem" }}
          onClick={() => navigate(`/user/list`)}
          marginBottom={"1rem"}
        >
          View MovieList
        </Button>
        <Button
          width={{ base: "100%", sm: "8rem" }} // Full width on mobile
          marginBottom={"1rem"}
          onClick={() => {
            authService.logout();
            setUsername();
            setUserId();
            navigate(`/movies`);
          }}
        >
          Log Out
        </Button>
        {/* <UserBioPanel /> */}

        <Card width={{ base: "90%", md: "80%", lg: "70%" }}>
          <CardHeader>
            <Heading>Favorite Actors/Filmmakers</Heading>
            <HStack>
              <Button
                marginTop={"1rem"}
                background={"#121212"}
                onClick={() => {
                  if (!favoritesSortType || favoritesSortType == "name") {
                    setFavoritesSortType("fav_film_count");
                  } else {
                    setFavoritesSortType("name");
                  }
                }}
              >
                Sorting by{" "}
                {!favoritesSortType || favoritesSortType === "fav_film_count"
                  ? "Film Count"
                  : "Name"}
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <SimpleGrid
              columns={{
                base: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1 + colCount,
              }}
              spacing={5}
            >
              {(isLoading &&
                skeletons.map((skeleton) => (
                  <CardContainer key={skeleton}>
                    <MovieCardSkeleton />
                  </CardContainer>
                ))) ||
                favPeople!.map((person) => (
                  <UserFavPersonCard key={person.id} favEntry={person} />
                ))}
            </SimpleGrid>
          </CardBody>
        </Card>
      </Grid>
    </>
  );
};

export default UserFavoritesPage;
