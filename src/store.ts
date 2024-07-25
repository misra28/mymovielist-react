import { create } from "zustand";

interface MovieQuery {
    searchText?: string;
    primaryReleaseYear?: number;
    includeAdult?: boolean;
}

interface MovieQueryStore {
    movieQuery: MovieQuery;
    setSearchText: (searchText?: string) => void;
    setPrimaryReleaseYear: (primaryReleaseYear?: number) => void;
    setIncludeAdult: (includeAdult?: boolean) => void;
}

const useMovieQueryStore = create<MovieQueryStore>( set => ({
    movieQuery: {},
    setSearchText: (searchText) => set((store) => ({movieQuery: {...store.movieQuery, searchText}})),
    setPrimaryReleaseYear: (primaryReleaseYear) => set(store => ({movieQuery: {...store.movieQuery, primaryReleaseYear}})),
    setIncludeAdult: (includeAdult) => set(store => ({movieQuery: {...store.movieQuery, includeAdult}}))
}))

export default useMovieQueryStore;