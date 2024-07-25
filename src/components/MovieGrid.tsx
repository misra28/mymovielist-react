import { GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import useSearchMovies from "../hooks/useSearchMovies";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCardContainer from "./MovieCardContainer";
import MovieCard from "./MovieCard";
import useMovieQueryStore from "../store";
import useDiscoverMovies from "../hooks/useDiscoverMovies";
import InfiniteScroll from "react-infinite-scroll-component";

const MovieGrid = () => {
  const searchText = useMovieQueryStore((s) => s.movieQuery.searchText);
  const useMovies = searchText ? useSearchMovies : useDiscoverMovies;

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useMovies();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (error) return <Text>{error.message}</Text>;

  const fetchedMoviesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedMoviesCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<MovieCardSkeleton />}
    >
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
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((movie) => (
              <MovieCardContainer key={movie.id}>
                <MovieCard movie={movie}></MovieCard>
              </MovieCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default MovieGrid;
