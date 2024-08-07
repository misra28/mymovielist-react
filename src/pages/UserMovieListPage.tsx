import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import ListEntryCard from "../components/ListEntryCard";
import CardContainer from "../components/MovieCardContainer";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import useCredentialsQueryStore from "../credentialsStore";
import useGetMovieList from "../hooks/useGetMovieList";
import getUserInfo from "../services/get-user-info";
import authService from "../services/auth-service";

const UserMovieListPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access_token");
  if (!isAuthenticated) navigate("/user/");

  console.log("isAuthenticated: ", isAuthenticated);

  const user = getUserInfo();
  if (!user) return <Spinner />;

  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGetMovieList();
  const fetchedResultsCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const setUsername = useCredentialsQueryStore((s) => s.setUsername);
  const setUserId = useCredentialsQueryStore((s) => s.setUserId);

  return (
    <>
      <Box>
        <Heading marginBottom={"1rem"}>{`View Your MovieList`}</Heading>
        <Button
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
      </Box>
      <Card>
        <CardBody>
          <InfiniteScroll
            dataLength={fetchedResultsCount}
            hasMore={!!hasNextPage}
            next={() => fetchNextPage()}
            loader={<MovieCardSkeleton />}
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 3 }} spacing={5}>
              {isLoading &&
                skeletons.map((skeleton) => (
                  <CardContainer key={skeleton}>
                    <MovieCardSkeleton />
                  </CardContainer>
                ))}
              {data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.results.map((le) => (
                    <CardContainer key={le.id}>
                      <ListEntryCard listEntry={le} />
                    </CardContainer>
                  ))}
                </React.Fragment>
              ))}
            </SimpleGrid>
          </InfiniteScroll>
        </CardBody>
      </Card>
    </>
  );
};

export default UserMovieListPage;
