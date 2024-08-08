import { SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import useSearchMovies from "../hooks/useSearchMovies";
import MovieCardSkeleton from "./MovieCardSkeleton";
import CardContainer from "./MovieCardContainer";
import MovieCard from "./MovieCard";
import useMovieQueryStore from "../movieStore";
import useDiscoverMovies from "../hooks/useDiscoverMovies";
import InfiniteScroll from "react-infinite-scroll-component";
import useSearchPeople from "../hooks/useSearchPeople";
import usePopularPeople from "../hooks/usePopularPeople";
import Movie from "../entities/Movie";
import PersonCard from "./PersonCard";
import Person from "../entities/Person";
import { FetchResponse } from "../services/tmdb-client";

const HomePageGrid = () => {
  const searchType = useMovieQueryStore((s) => s.movieQuery.searchType);
  const setSearchType = useMovieQueryStore((s) => s.setSearchType);
  if (!searchType) setSearchType("Movie");

  const searchText = useMovieQueryStore((s) => s.movieQuery.searchText);

  const useMovies = searchText ? useSearchMovies : useDiscoverMovies;
  const usePeople = searchText ? useSearchPeople : usePopularPeople;

  const useMoviesOrPeople = searchType === "Movie" ? useMovies : usePeople;

  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useMoviesOrPeople();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (error) return <Text>{error.message}</Text>;

  let fetchedResultsCount = 0;
  for (let page of data?.pages!) {
    fetchedResultsCount += page.results.length;
  }

  // data?.pages.reduce(
  //   (total: number, page: FetchResponse<Movie> | FetchResponse<Person>) =>
  //     total + page.results.length,
  //   0
  // ) || 0;

  const addColumns = searchType === "Person" ? 1 : 1;

  return (
    <InfiniteScroll
      dataLength={fetchedResultsCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<MovieCardSkeleton />}
    >
      <SimpleGrid
        padding="10px"
        columns={{
          sm: 1 + addColumns,
          md: 2 + addColumns,
          lg: 3 + addColumns,
          xl: 4 + addColumns,
        }}
        spacing={6}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <CardContainer key={skeleton}>
              <MovieCardSkeleton />
            </CardContainer>
          ))}
        {searchType === "Movie" &&
          data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((movie) => (
                <CardContainer key={movie.id}>
                  <MovieCard movie={movie as Movie}></MovieCard>
                </CardContainer>
              ))}
            </React.Fragment>
          ))}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((person) => (
              <CardContainer key={person.id}>
                <PersonCard person={person as Person} />
              </CardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default HomePageGrid;
