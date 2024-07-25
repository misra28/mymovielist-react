import APIClient from '../services/api-client';
import Movie from '../entities/Movie';
import { useQuery } from '@tanstack/react-query';

const apiClient = new APIClient<Movie>('/movie');

const useMovieDetails = (movie_id: number) => useQuery({
    queryKey: ['movie', movie_id],
    queryFn: () => apiClient.get(movie_id),
    staleTime: 24 * 60 * 60 * 1000 // 24 hr
});

export default useMovieDetails;