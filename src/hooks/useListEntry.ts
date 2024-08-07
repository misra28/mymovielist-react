import React from 'react'
import useCredentialsQueryStore from '../credentialsStore';
import axios from 'axios';
import getDjangoEndpoint from '../django-endpoint';
import ListEntry from '../entities/ListEntry';
import { useQuery } from '@tanstack/react-query';

const useListEntry = (entry_id: string) => {
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
          .get<ListEntry>(`movielist/list-entries/${entry_id}`, { params: { format: "json" } })
          .then((res) => res.data);
      
      return useQuery({
        queryKey: ['listEntry', entry_id],
        queryFn: getEntry
      })
}

export default useListEntry;