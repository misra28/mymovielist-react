import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import Movie from "../entities/Movie";
import getImage from "../services/backdrop-url";
import getCroppedImageUrl from "../services/image-url";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card>
      <Link to={`${movie.id}`}>
        <Image
          src={movie.backdrop_path ? getImage(movie.backdrop_path) : getImage()}
        />
        <CardBody>
          <Heading fontSize="2xl" fontWeight={"bold"}>
            {movie.release_date
              ? `${movie.title} (${movie.release_date.substring(0, 4)})`
              : `${movie.title}`}
          </Heading>
        </CardBody>
      </Link>
    </Card>
  );
};

export default MovieCard;
