import useMovieCredits from "../hooks/useMovieCredits";
import BuildMovieCredits from "./BuildMovieCredits";

interface Props {
  movie_id: string;
}

const MovieCreditsCard = ({ movie_id }: Props) => {
  const {
    data: credits,
    isLoading,
    error,
  } = useMovieCredits(parseInt(movie_id));

  if (!credits || error) return null;

  return (
    <>
      <BuildMovieCredits
        people={credits?.cast!}
        type={"cast"}
      ></BuildMovieCredits>
      <BuildMovieCredits
        people={credits?.crew!}
        type={"crew"}
      ></BuildMovieCredits>
    </>
  );
};

export default MovieCreditsCard;
