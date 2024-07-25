import { SimpleGrid, Image } from "@chakra-ui/react";
import useMoviePosters from "../hooks/useMoviePosters";
import getImage from "../services/backdrop-url";

interface Props {
  movie_id: string;
  movie_language: string;
}

const MoviePostersGrid = ({ movie_id, movie_language }: Props) => {
  const {
    data: posters,
    isLoading,
    error,
  } = useMoviePosters(parseInt(movie_id));

  if (isLoading) return null;
  if (error) throw error;

  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 4 }} spacing={2}>
      {posters?.["posters"]
        .filter(
          (file) => file.iso_639_1 === "en" || file.iso_639_1 === movie_language
        )
        .map((file) => <Image src={getImage(file.file_path)} />)
        .slice(0, 8)}
    </SimpleGrid>
  );
};

export default MoviePostersGrid;
