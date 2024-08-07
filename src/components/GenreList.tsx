import {
  Button,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import useMovieQueryStore from "../movieStore";

const GenreList = () => {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useMovieQueryStore((s) => s.movieQuery.genreId);
  const setSelectedGenreId = useMovieQueryStore((s) => s.setGenreId);
  const setSearchText = useMovieQueryStore((s) => s.setSearchText);
  const setSearchType = useMovieQueryStore((s) => s.setSearchType);

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Heading
        fontSize="2xl"
        marginTop={6}
        marginBottom={2}
        textAlign={"center"}
      >
        Genres
      </Heading>
      <SimpleGrid display="flex">
        <List textAlign={"center"} marginLeft={6}>
          {data?.genres.map((genre) => (
            <ListItem key={genre.id} paddingY="5px">
              <Button
                whiteSpace={"normal"}
                fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                onClick={() => {
                  setSelectedGenreId(genre.id);
                  setSearchText("");
                  setSearchType("Movie");
                }}
                fontSize={"md"}
                variant="link"
              >
                {genre.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </SimpleGrid>
    </>
  );
};

export default GenreList;
