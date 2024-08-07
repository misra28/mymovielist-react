import { useQuery } from "@tanstack/react-query";
import Poster from "../entities/Poster";
import APIClient, { FetchResponse } from "../services/tmdb-client";

const usePersonImages = (person_id: number) => {
  const apiClient = new APIClient<Poster>(`person/${person_id}/images`);

  return useQuery({
    queryKey: ['profiles', person_id],
    queryFn: apiClient.getProfiles
  });
}

export default usePersonImages;