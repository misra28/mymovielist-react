import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import useCredentialsQueryStore from '../credentialsStore';
import getDjangoEndpoint from '../django-endpoint';
import { FetchListResponse } from '../services/django-api-client';

const useGetMovieList = (listSortType: string) => {
    const accessToken = localStorage.getItem("access_token")!;
      const userId = useCredentialsQueryStore(
        (s) => s.credentialsQuery.userId
      );

    const instance = axios.create({
        baseURL: getDjangoEndpoint(),
        headers: {
          accept: "application/json",
          Authorization: `JWT ${accessToken}`,
        },
      });
    
      const getEntries = ({pageParam = 1}) => instance
          .get<FetchListResponse>("movielist/list-entries", { params: { format: "json", ordering: listSortType, page: pageParam} })
          .then((res) => res.data);
      
      return useInfiniteQuery<FetchListResponse, Error>({
        queryKey: ['movieList', userId, listSortType],
        queryFn: getEntries,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
      })
}

export default useGetMovieList;