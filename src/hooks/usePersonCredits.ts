import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Movie from "../entities/Movie";

const usePersonCredits = (person_id: number) => {
  const apiClient = new APIClient<Movie>(`person/${person_id}/movie_credits`);

  return useQuery({
    queryKey: ['person_credits', person_id],
    queryFn: apiClient.getPersonCredits
  });
}

export default usePersonCredits;