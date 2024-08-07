import { useInfiniteQuery } from "@tanstack/react-query";
import Movie from "../entities/Movie"
import APIClient, { FetchResponse } from "../services/tmdb-client"
import useMovieQueryStore from "../movieStore";

const apiClient = new APIClient<Movie>('/discover/movie');

const useDiscoverMovies = () => {
    const movieQuery = useMovieQueryStore((s) => s.movieQuery);
    
    const getMovies = ({pageParam = 1}) => apiClient.getAll({
      params: {
        includes_adult: movieQuery.includeAdult,
        primary_release_year: movieQuery.primaryReleaseYear,
        with_genres: movieQuery.genreId,
        page: pageParam
      }
    })

    return useInfiniteQuery<FetchResponse<Movie>, Error>({
      queryKey: ['discoverMovies', movieQuery],
      queryFn: getMovies,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page! + 1 <= lastPage.total_pages! ? lastPage.page! + 1 : undefined;
      },
      staleTime: 24 * 60 * 60 * 1000 // 24 hours
    })
}

export default useDiscoverMovies;