import { Heading } from "@chakra-ui/react";
import useMovieQueryStore from "../store";

const MovieHeader = () => {
  const { searchText, primaryReleaseYear } = useMovieQueryStore(
    (s) => s.movieQuery
  );

  let heading = "Popular Movies";
  if (primaryReleaseYear && searchText)
    heading = `Search Results for '${searchText}' Released in ${primaryReleaseYear}`;
  if (primaryReleaseYear) heading = `Popular Movies of ${primaryReleaseYear}`;
  if (searchText) heading = `Search Results for '${searchText}'`;

  return <Heading marginBottom={5}>{heading}</Heading>;
};

export default MovieHeader;
