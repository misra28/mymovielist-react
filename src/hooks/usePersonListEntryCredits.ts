import React from 'react'
import useCredentialsQueryStore from '../credentialsStore';
import axios from 'axios';
import getDjangoEndpoint from '../django-endpoint';
import ListEntry from '../entities/ListEntry';
import { useQuery } from '@tanstack/react-query';

const usePersonListEntryCredits = (person_id: string) => {
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
    
      const getEntry = () => instance
          .get<ListEntry[]>(`movielist/person-credits/`, { params: { format: "json", person_id: person_id } })
          .then((res) => res.data);
      
      return useQuery({
        queryKey: ['personListEntryCredits', userId, person_id],
        queryFn: getEntry
      })
}

export default usePersonListEntryCredits;