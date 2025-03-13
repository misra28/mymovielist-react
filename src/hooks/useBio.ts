import React from 'react'
import useCredentialsQueryStore from '../credentialsStore';
import axios from 'axios';
import getDjangoEndpoint from '../django-endpoint';
import { useQuery } from '@tanstack/react-query';
import { User } from '../entities/User';
import DjangoClient from '../services/django-api-client';

const useBio = () => {
    const userId = useCredentialsQueryStore(
        (s) => s.credentialsQuery.userId
      );
      const apiClient = new DjangoClient(`/movielist/bio/${userId}`);
      
      return useQuery({
        queryKey: ['bio', userId],
        queryFn: apiClient.getBio
      })
}

export default useBio;