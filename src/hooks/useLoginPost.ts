import { useMutation, useQuery } from "@tanstack/react-query";
import DjangoClient, { FetchLoginTokenResponse } from "../services/django-api-client";
import { User } from "../entities/User";
import useCredentialsQueryStore from "../credentialsStore";
import { AxiosRequestConfig } from "axios";


const useLoginPost = () => {
  const apiClient = new DjangoClient(`/auth/jwt/create`);
  const setAccessToken = useCredentialsQueryStore(s => s.setAccessToken);

    return useMutation({
      mutationFn: apiClient.postLogin,
      onSuccess: (data) => {
        setAccessToken(data.access);
      },
      onError: (error) => {
        setAccessToken('');
        console.log('ERROR..........')
        console.error('Error:', error);
      },
    })
}

export default useLoginPost;