import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchGenres } from "../services/tmdb-client"
import Genre from "../entities/Genre";


const useGenres = () => {
    const apiClient = new APIClient<Genre>(`/genre/movie/list`);

    return useQuery<FetchGenres, Error>({
      queryKey: ['genres'],
      queryFn: apiClient.getGenres,
      staleTime: 24 * 60 * 60 * 1000 // 24 hours
    })
}

export default useGenres;