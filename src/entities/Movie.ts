import Company from "./Company";
import Genre from "./Genre";

export default interface Movie {
    id: number;
    original_title: string;
    title: string;
    tagline?: string;
    runtime?: number;
    overview?: string;
    backdrop_path?: string;
    poster_path?: string;
    release_date?: string;
    original_language?: string;
    vote_average?: number;
    popularity?: number;
    job?: string;
    character?: string;
    genres?: Genre[];
    production_companies?: Company[];
}