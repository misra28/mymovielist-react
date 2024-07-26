import APIClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';
import Person from '../entities/Person';

const apiClient = new APIClient<Person>('/person');

const usePersonDetails = (person_id: number) => useQuery({
    queryKey: ['person', person_id],
    queryFn: () => apiClient.get(person_id),
    staleTime: 24 * 60 * 60 * 1000 // 24 hr
});

export default usePersonDetails;