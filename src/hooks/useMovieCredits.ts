import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchCredits } from "../services/api-client"
import Person from "../entities/Person";


const useMovieCredits = (movie_id: number) => {
    const apiClient = new APIClient<Person>(`/movie/${movie_id}/credits`);

    return useQuery<FetchCredits, Error>({
      queryKey: ['movieCredits', movie_id],
      queryFn: apiClient.getCredits,
      staleTime: 24 * 60 * 60 * 1000 // 24 hours
    })
}

export default useMovieCredits;