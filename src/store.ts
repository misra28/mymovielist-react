import { create } from "zustand";

interface MovieQuery {
    searchText?: string;
    primaryReleaseYear?: number;
    includeAdult?: boolean;
    genreId?: number;
    searchType?: string;
}

interface MovieQueryStore {
    movieQuery: MovieQuery;
    setSearchText: (searchText?: string) => void;
    setPrimaryReleaseYear: (primaryReleaseYear?: number) => void;
    setIncludeAdult: (includeAdult?: boolean) => void;
    setGenreId: (genreId?: number) => void;
    setSearchType: (searchType?: string) => void;
}

const useMovieQueryStore = create<MovieQueryStore>( set => ({
    movieQuery: {},
    setSearchText: (searchText) => set((store) => ({movieQuery: {...store.movieQuery, searchText}})),
    setPrimaryReleaseYear: (primaryReleaseYear) => set(store => ({movieQuery: {...store.movieQuery, primaryReleaseYear}})),
    setIncludeAdult: (includeAdult) => set(store => ({movieQuery: {...store.movieQuery, includeAdult}})),
    setGenreId: (genreId) => set(store => ({movieQuery: {...store.movieQuery, genreId}})),
    setSearchType: (searchType) => set(store => ({movieQuery: {...store.movieQuery, searchType}}))
}))

export default useMovieQueryStore;