import { Heading } from "@chakra-ui/react";
import useMovieQueryStore from "../store";
import useGenre from "../hooks/useGenre";

const MovieHeader = () => {
  const { searchText, primaryReleaseYear, genreId } = useMovieQueryStore(
    (s) => s.movieQuery
  );
  const genre = useGenre(genreId);

  let heading = `Popular ${genre?.name || ""} Movies`;
  if (primaryReleaseYear && searchText)
    heading = `Search Results for '${searchText}' Released in ${primaryReleaseYear}`;
  if (primaryReleaseYear)
    heading = `Popular ${genre?.name || ""} Movies of ${primaryReleaseYear}`;
  if (searchText) heading = `Search Results for '${searchText}'`;

  return <Heading marginBottom={5}>{heading}</Heading>;
};

export default MovieHeader;
