import useMovieVideos from "../hooks/useMovieVideos";
import { Spinner } from "@chakra-ui/react";
import Video from "../entities/Video";

interface Props {
  movie_id: string;
}

const MovieVideo = ({ movie_id }: Props) => {
  const {
    data: videoResults,
    isLoading,
    error,
  } = useMovieVideos(parseInt(movie_id!));

  let videoKey: string;
  let video: Video;

  if (isLoading) return <Spinner />;
  if (error || !videoResults) return null;

  let len = videoResults?.results?.length;
  if (!len || len === 0) return null;

  len = videoResults?.results.filter((v) => v.type === "Trailer").length;
  if (!len || len === 0) {
    video = videoResults?.results[0];
    videoKey = video.key!;
  } else {
    video = videoResults?.results.filter((v) => v.type === "Trailer")[0];
    videoKey = video.key || "";
  }

  if (!videoKey) return null;

  return (
    <iframe
      title={video.name}
      width="100%"
      height={"360px"}
      src={`https://www.youtube.com/embed/${videoKey}`}
    ></iframe>
  );
};

export default MovieVideo;
