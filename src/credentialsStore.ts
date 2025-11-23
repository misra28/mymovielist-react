import { create } from "zustand";

interface CredentialsQuery {
    accessToken?: string;
    userId?: number;
    username?: string;
    listSortType?: string;
    listViewType?: boolean;
    searchType?: string;
    isAscending?: boolean;
    favoritesSortType?: string;
}

interface CredentialsQueryStore {
    credentialsQuery: CredentialsQuery;
    setAccessToken: (searchText?: string) => void;
    setUserId: (userId?: number) => void;
    setUsername: (username?: string) => void;
    setListSortType: (listSortType?: string) => void;
    setListViewType: (listViewType?: boolean) => void;
    setSearchType: (searchType?: string) => void;
    setIsAscending: (isAscending?: boolean) => void;
    setFavoritesSortType: (favoritesSortType?: string) => void;
}

const useCredentialsQueryStore = create<CredentialsQueryStore>( set => ({
    credentialsQuery: {},
    setAccessToken: (accessToken) => set((store) => ({credentialsQuery: {...store.credentialsQuery, accessToken}})),
    setUserId: (userId) => set((store) => ({credentialsQuery: {...store.credentialsQuery, userId}})),
    setUsername: (username) => set((store) => ({credentialsQuery: {...store.credentialsQuery, username}})),
    setListSortType: (listSortType) => set((store) => ({credentialsQuery: {...store.credentialsQuery, listSortType}})),
    setListViewType: (listViewType) => set((store) => ({credentialsQuery: {...store.credentialsQuery, listViewType}})),
    setSearchType: (searchType) => set((store) => ({credentialsQuery: {...store.credentialsQuery, searchType}})),
    setIsAscending: (isAscending) => set((store) => ({credentialsQuery: {...store.credentialsQuery, isAscending}})),
    setFavoritesSortType: (favoritesSortType) => set((store) => ({credentialsQuery: {...store.credentialsQuery, favoritesSortType}})),
}))

export default useCredentialsQueryStore;