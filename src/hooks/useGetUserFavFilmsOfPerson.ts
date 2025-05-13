import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useCredentialsQueryStore from '../credentialsStore';
import getDjangoEndpoint from '../django-endpoint';
import { FetchFavFilmsOfPerson } from '../services/django-api-client';

const useGetUserFavFilmsOfPerson = (favPerson_id: number) => {
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
          .get<FetchFavFilmsOfPerson[]>("movielist/fav-films-of-person", { params: { person_id: favPerson_id, format: "json"} })
          .then((res) => res.data);
      
      return useQuery({
        queryKey: ['userFavFilmsOfPerson', favPerson_id, userId],
        queryFn: getEntries
      })
}

export default useGetUserFavFilmsOfPerson;