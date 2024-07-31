import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client"
import useMovieQueryStore from "../store";
import Person from "../entities/Person";

const apiClient = new APIClient<Person>('/search/person');

const useSearchPeople = () => {
    const movieQuery = useMovieQueryStore((s) => s.movieQuery);
    
    const getPeople = ({pageParam = 1}) => apiClient.getAll({
      params: {
        query: movieQuery.searchText,
        page: pageParam
      }
    })

    return useInfiniteQuery<FetchResponse<Person>, Error>({
      queryKey: ['people', movieQuery],
      queryFn: getPeople,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page! + 1 <= lastPage.total_pages! ? lastPage.page! + 1 : undefined;
      },
      staleTime: 24 * 60 * 60 * 1000 // 24 hours
    })
}

export default useSearchPeople;