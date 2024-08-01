import { Heading } from "@chakra-ui/react";
import useMovieQueryStore from "../store";
import useGenre from "../hooks/useGenre";

const HomePageHeader = () => {
  const { searchType, searchText, primaryReleaseYear, genreId } =
    useMovieQueryStore((s) => s.movieQuery);
  const genre = useGenre(genreId);

  if (searchType === "Person") {
    if (!searchText) {
      return <Heading marginBottom={5}>{`Popular Actors`}</Heading>;
    }
    return (
      <Heading marginBottom={5}>{`Search Results for '${searchText}'`}</Heading>
    );
  }

  let heading = `Popular ${genre?.name || ""} Movies`;

  if (primaryReleaseYear && searchText)
    heading = `Search Results for '${searchText}' Released in ${primaryReleaseYear}`;
  if (primaryReleaseYear)
    heading = `Popular ${genre?.name || ""} Movies of ${primaryReleaseYear}`;
  if (searchText) heading = `Search Results for '${searchText}'`;

  return <Heading marginBottom={5}>{heading}</Heading>;
};

export default HomePageHeader;
