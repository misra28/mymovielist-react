import { create } from "zustand";

interface CredentialsQuery {
    accessToken?: string;
    userId?: number;
    username?: string;
}

interface CredentialsQueryStore {
    credentialsQuery: CredentialsQuery;
    setAccessToken: (searchText?: string) => void;
    setUserId: (userId?: number) => void;
    setUsername: (username?: string) => void;
}

const useCredentialsQueryStore = create<CredentialsQueryStore>( set => ({
    credentialsQuery: {},
    setAccessToken: (accessToken) => set((store) => ({credentialsQuery: {...store.credentialsQuery, accessToken}})),
    setUserId: (userId) => set((store) => ({credentialsQuery: {...store.credentialsQuery, userId}})),
    setUsername: (username) => set((store) => ({credentialsQuery: {...store.credentialsQuery, username}})),
}))

export default useCredentialsQueryStore;