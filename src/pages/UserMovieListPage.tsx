import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import ListEntryCard from "../components/ListEntryCard";
import CardContainer from "../components/MovieCardContainer";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import useCredentialsQueryStore from "../credentialsStore";
import useGetMovieList from "../hooks/useGetMovieList";
import getUserInfo from "../services/get-user-info";
import authService from "../services/auth-service";
import SortMovieListSelector from "../components/SortMovieListSelector";
import ListEntrySlab from "../components/ListEntrySlab";

const UserMovieListPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access_token");
  if (!isAuthenticated) navigate("/user/");

  const user = getUserInfo();
  if (!user) return <Spinner />;

  const listSortType = useCredentialsQueryStore(
    (s) => s.credentialsQuery.listSortType
  );
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGetMovieList(listSortType!);
  const fetchedResultsCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const setUsername = useCredentialsQueryStore((s) => s.setUsername);
  const username = useCredentialsQueryStore((s) => s.credentialsQuery.username);
  const setUserId = useCredentialsQueryStore((s) => s.setUserId);
  const userId = useCredentialsQueryStore((s) => s.credentialsQuery.userId);

  const setListViewExpanded = useCredentialsQueryStore(
    (s) => s.setListViewType
  );
  const setListSortType = useCredentialsQueryStore((s) => s.setListSortType);
  const listViewExpanded = useCredentialsQueryStore(
    (s) => s.credentialsQuery.listViewType
  );

  let colCount = 0;
  if (listViewExpanded) colCount = 1;

  // useEffect(() => {
  //   setListSortType(listSortType);
  // }, [listSortType, setListSortType]);

  return (
    <>
      <Grid
        width="100vw"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {username && (
          <Heading marginBottom={"1rem"}>{`${username}'s MovieList`}</Heading>
        )}
        <Button
          width="6rem"
          marginBottom={"1rem"}
          marginRight={"1rem"}
          onClick={() => {
            authService.logout();
            setUsername();
            setUserId();
            navigate(`/movies`);
          }}
        >
          Log Out
        </Button>
        {/* <Button
          color={"red"}
          marginBottom={"1rem"}
          onClick={() => {
            authService.deleteAccount();
            setUsername();
            setUserId();
            navigate(`/movies`);
          }}
        >
          Delete Account
        </Button> */}

        <Card width={"70%"}>
          <CardBody>
            <HStack>
              <SortMovieListSelector />
              <Button
                backgroundColor={"#121212"}
                onClick={() => setListViewExpanded(!listViewExpanded)}
                marginBottom={"1rem"}
                marginLeft={"0.5rem"}
              >
                Toggle Expanded View
              </Button>
            </HStack>
            {listSortType != "-undefined" && (
              <InfiniteScroll
                dataLength={fetchedResultsCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<MovieCardSkeleton />}
              >
                <SimpleGrid
                  columns={{
                    base: 1,
                    md: 1,
                    lg: 1 + colCount,
                    xl: 1 + colCount,
                  }}
                  spacing={5}
                >
                  {isLoading &&
                    skeletons.map((skeleton) => (
                      <CardContainer key={skeleton}>
                        <MovieCardSkeleton />
                      </CardContainer>
                    ))}
                  {data?.pages.map((page, index) => (
                    <React.Fragment key={index}>
                      {(listViewExpanded &&
                        page.results.map((le) => (
                          <CardContainer key={le.id}>
                            {<ListEntryCard listEntry={le} />}
                          </CardContainer>
                        ))) ||
                        page.results.map((le) => (
                          <ListEntrySlab listEntry={le} />
                        ))}
                    </React.Fragment>
                  ))}
                </SimpleGrid>
              </InfiniteScroll>
            )}
          </CardBody>
        </Card>
      </Grid>
    </>
  );
};

export default UserMovieListPage;
