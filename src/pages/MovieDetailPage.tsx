import { GridItem, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import ExpandableText from "../components/ExpandableText";
import MoviePostersGrid from "../components/MoviePostersGrid";
import MovieAttributesCard from "../components/MovieAttributesCard";
import MovieCreditsCard from "../components/MovieCreditsCard";

const MovieDetailPage = () => {
  const { movie_id } = useParams();
  const {
    data: movie,
    isLoading,
    error,
  } = useMovieDetails(parseInt(movie_id!));

  if (isLoading) return <Spinner />;
  if (error || !movie) throw error;

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <GridItem>
          <Heading marginBottom={3}>{movie?.title}</Heading>
          {movie?.tagline && (
            <Text marginBottom={3} fontStyle={"italic"}>
              {movie.tagline}
            </Text>
          )}
          <ExpandableText>{movie?.overview!}</ExpandableText>
          <MovieCreditsCard movie_id={movie_id!} />
        </GridItem>
        <GridItem>
          <MoviePostersGrid
            movie_id={movie_id!}
            movie_language={movie.original_language!}
          />
          <MovieAttributesCard movie={movie} />
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default MovieDetailPage;
