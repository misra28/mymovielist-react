export default interface ListEntry {
    id: number;
    user: number;
    movie_id: string;
    movie_title: string;
    rating: number;
    date_watched: string;
    comments?: string;
    poster_url: string;
}