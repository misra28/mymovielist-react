import Movie from "./Movie";

export default interface Person {
    id: number;
    name: string;
    character?: string;
    profile_path?: string;
    known_for_department?: string;
    job?: string;
    biography?: string;
    birthday?: string;
    deathday?: string;
    place_of_birth?: string;
    also_known_as?: string[];
    known_for?: Movie[];
}