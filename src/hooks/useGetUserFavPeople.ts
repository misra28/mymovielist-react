import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useCredentialsQueryStore from '../credentialsStore';
import getDjangoEndpoint from '../django-endpoint';
import { FetchListResponse, FetchUserFavPerson } from '../services/django-api-client';

const useGetUserFavPeople = () => {
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
    
      const getEntries = () => instance
          .get<FetchUserFavPerson[]>("movielist/fav-persons", { params: { format: "json"} })
          .then((res) => res.data);
      
      return useQuery({
        queryKey: ['userFavPeople', userId],
        queryFn: getEntries
      })
}

export default useGetUserFavPeople;