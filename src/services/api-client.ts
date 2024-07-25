import axios, { Axios, AxiosRequestConfig } from 'axios';
import Poster from '../entities/Poster';
import Person from '../entities/Person';

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '73a06bc089ba45392d92ff0c234d8b89'
    }
})

export interface FetchResponse<T> {
    page: number;
    total_pages: number;
    total_results: number;
    results: T[];
}

export interface FetchPosters {
    posters: Poster[];
}

export interface FetchCredits {
    cast: Person[];
    crew: Person[];
}

class APIClient<T> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
        return axiosInstance.get<FetchResponse<T>>(this.endpoint, config).then(res => res.data);
    }

    get = (id: number | string) => {
        return axiosInstance.get<T>(this.endpoint + '/' + id).then(res => res.data);
    }

    getPosters = (config: AxiosRequestConfig) => {
        return axiosInstance.get<FetchPosters>(this.endpoint, config).then(res => res.data);
    }

    getCredits = (config: AxiosRequestConfig) => {
        return axiosInstance.get<FetchCredits>(this.endpoint, config).then(res => res.data);
    }
}

export default APIClient;