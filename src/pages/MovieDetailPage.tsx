import {
  Button,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import ExpandableText from "../components/ExpandableText";
import MoviePostersGrid from "../components/MoviePostersGrid";
import MovieAttributesCard from "../components/MovieAttributesCard";
import MovieCreditsCard from "../components/MovieCreditsCard";
import MovieVideo from "../components/MovieVideo";
import useCredentialsQueryStore from "../credentialsStore";
import AddListEntryButton from "../components/AddListEntryButton";

const MovieDetailPage = () => {
  const { movie_id } = useParams();
  const navigate = useNavigate();
  const {
    data: movie,
    isLoading,
    error,
  } = useMovieDetails(parseInt(movie_id!));
  const userId = useCredentialsQueryStore((s) => s.credentialsQuery.userId);

  if (isLoading) return <Spinner />;
  if (error || !movie) return null;

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <GridItem>
          <Heading marginBottom={3}>{movie.title}</Heading>
          {movie.tagline && (
            <Text marginBottom={3} fontStyle={"italic"}>
              {movie.tagline}
            </Text>
          )}
          <ExpandableText>{movie.overview!}</ExpandableText>
          <MovieCreditsCard movie_id={movie_id!} />
        </GridItem>
        <GridItem>
          {(userId && <AddListEntryButton movie_id={movie_id!} />) || (
            <Button marginBottom={"1rem"} onClick={() => navigate(`/user`)}>
              Log in to add to your MovieList
            </Button>
          )}
          <MoviePostersGrid
            image_count={8}
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
