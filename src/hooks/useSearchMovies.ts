import { useInfiniteQuery } from "@tanstack/react-query";
import Movie from "../entities/Movie"
import APIClient, { FetchResponse } from "../services/api-client"
import useMovieQueryStore from "../store";

const apiClient = new APIClient<Movie>('/search/movie');

const useSearchMovies = () => {
    const movieQuery = useMovieQueryStore((s) => s.movieQuery);
    
    const getMovies = ({pageParam = 1}) => apiClient.getAll({
      params: {
        includes_adult: movieQuery.includeAdult,
        primary_release_year: movieQuery.primaryReleaseYear,
        query: movieQuery.searchText,
        page: pageParam
      }
    })

    return useInfiniteQuery<FetchResponse<Movie>, Error>({
      queryKey: ['movies', movieQuery],
      queryFn: getMovies,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page + 1 <= lastPage.total_pages ? lastPage.page + 1 : undefined;
      },
      staleTime: 24 * 60 * 60 * 1000 // 24 hours
    })
}

export default useSearchMovies;