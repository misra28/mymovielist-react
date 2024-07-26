import { SimpleGrid, Image, Spinner, CardBody, Card } from "@chakra-ui/react";
import useMoviePosters from "../hooks/useMoviePosters";
import getImage from "../services/backdrop-url";

interface Props {
  movie_id: string;
  movie_language: string;
  image_count: number;
}

const MoviePostersGrid = ({ movie_id, movie_language, image_count }: Props) => {
  const {
    data: posters,
    isLoading,
    error,
  } = useMoviePosters(parseInt(movie_id));

  if (isLoading) return <Spinner />;
  if (error || !posters) return null;

  const getPosters = posters.posters;
  if (!getPosters) return null;

  return (
    <Card>
      <CardBody>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 4 }} spacing={2}>
          {getPosters
            .filter(
              (file) =>
                file.iso_639_1 === "en" || file.iso_639_1 === movie_language
            )
            .map((file) => (
              <Image
                alt={file.file_path}
                key={file.file_path}
                src={getImage(file.file_path)}
              />
            ))
            .slice(0, image_count)}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default MoviePostersGrid;
