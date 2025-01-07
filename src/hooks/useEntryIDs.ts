import React from 'react'
import useCredentialsQueryStore from '../credentialsStore';
import axios from 'axios';
import getDjangoEndpoint from '../django-endpoint';
import { useQuery } from '@tanstack/react-query';
import EntryID from '../entities/EntryID';

const useEntryIDs = () => {
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
          .get<EntryID[]>(`movielist/entry-ids`, { params: { format: "json" } })
          .then((res) => res.data);
      
      return useQuery({
        queryKey: ['entryIDs'],
        queryFn: getEntry
      })
}

export default useEntryIDs;