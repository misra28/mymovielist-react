import { create } from "zustand";

interface CredentialsQuery {
    accessToken?: string;
    userId?: number;
    username?: string;
    listSortType?: string;
    listViewType?: boolean;
}

interface CredentialsQueryStore {
    credentialsQuery: CredentialsQuery;
    setAccessToken: (searchText?: string) => void;
    setUserId: (userId?: number) => void;
    setUsername: (username?: string) => void;
    setListSortType: (listSortType?: string) => void;
    setListViewType: (listViewType?: boolean) => void;
}

const useCredentialsQueryStore = create<CredentialsQueryStore>( set => ({
    credentialsQuery: {},
    setAccessToken: (accessToken) => set((store) => ({credentialsQuery: {...store.credentialsQuery, accessToken}})),
    setUserId: (userId) => set((store) => ({credentialsQuery: {...store.credentialsQuery, userId}})),
    setUsername: (username) => set((store) => ({credentialsQuery: {...store.credentialsQuery, username}})),
    setListSortType: (listSortType) => set((store) => ({credentialsQuery: {...store.credentialsQuery, listSortType}})),
    setListViewType: (listViewType) => set((store) => ({credentialsQuery: {...store.credentialsQuery, listViewType}})),
}))

export default useCredentialsQueryStore;