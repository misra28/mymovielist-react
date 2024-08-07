import axios, { AxiosRequestConfig } from "axios";
import getDjangoEndpoint from "../django-endpoint";
import ListEntry from "../entities/ListEntry";
import { User } from "../entities/User";
import useCredentialsQueryStore from "../credentialsStore";

export const djangoAxiosInstance = (accessToken = '') => {
    return axios.create({
    baseURL: getDjangoEndpoint(),
    headers: {
        accept: "application/json",
        Authorization: `JWT ${accessToken}`
    }
})}

export interface FetchListResponse {
    current_page: number;
    previous: string | null;
    next: string | null;
    count: number;
    results: ListEntry[];
}

export interface FetchLoginTokenResponse {
    refresh: string;
    access: string;
}

class DjangoClient {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getMovieList = (config: AxiosRequestConfig) => {
        return djangoAxiosInstance().get<FetchListResponse>(this.endpoint, config).then(res => res.data);
    }

    getUserInformation = (config: AxiosRequestConfig) => {
        return djangoAxiosInstance().get<User>(this.endpoint, config).then(res => res.data);
    }

    postLogin = (config: AxiosRequestConfig) => {
        return djangoAxiosInstance().post<FetchLoginTokenResponse>(this.endpoint, config).then(res => res.data);
    }

    postListEntry = (config: AxiosRequestConfig) => {
        return djangoAxiosInstance().post<ListEntry>(this.endpoint, config).then(res => res.data);
    }

    postRegister = (config: AxiosRequestConfig) => {
        return djangoAxiosInstance().post<User>(this.endpoint, config).then(res => res.data);
    }

}

export default DjangoClient;