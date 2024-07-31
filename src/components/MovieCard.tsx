import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import Movie from "../entities/Movie";
import getImage from "../services/backdrop-url";
import getCroppedImageUrl from "../services/image-url";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
  association?: string;
}

const MovieCard = ({ movie, association }: Props) => {
  let movieImage: string;
  let usingPoster = false;

  if (movie.poster_path) {
    usingPoster = true;
    movieImage = getImage(movie.poster_path);
  } else {
    movieImage = getImage();
  }

  return (
    <Card variant={"elevated"} bgColor="#121212" borderRadius={10}>
      <Link to={`/movies/${movie.id}`}>
        {/* {!usingPoster && <Image src={movieImage} />} */}
        <CardBody>
          {usingPoster && <Image src={movieImage} marginBottom={2} />}
          <Heading fontSize="2xl" fontWeight={"bold"}>
            {movie.release_date
              ? `${movie.title} (${movie.release_date.substring(0, 4)})`
              : `${movie.title}`}
          </Heading>
          {association && <Text>{association}</Text>}
        </CardBody>
      </Link>
    </Card>
  );
};

export default MovieCard;
