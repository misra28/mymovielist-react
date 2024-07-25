import { useQuery } from "@tanstack/react-query";
import Poster from "../entities/Poster";
import APIClient, { FetchResponse } from "../services/api-client";

const useMoviePosters = (movie_id: number) => {
  const apiClient = new APIClient<Poster>(`movie/${movie_id}/images`);

  return useQuery({
    queryKey: ['posters', movie_id],
    queryFn: apiClient.getPosters
  });
}

export default useMoviePosters;