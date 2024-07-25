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
    genres?: Genre[];
    production_companies?: Company[];
}