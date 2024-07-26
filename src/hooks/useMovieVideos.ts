import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import Video from "../entities/Video";

const useMovieVideos = (movie_id: number) => {
  const apiClient = new APIClient<Video>(`movie/${movie_id}/videos`);

  return useQuery({
    queryKey: ['posters', movie_id],
    queryFn: apiClient.getAll
  });
}

export default useMovieVideos;