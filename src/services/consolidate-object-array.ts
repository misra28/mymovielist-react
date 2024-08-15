import Movie from "../entities/Movie";
import Person from "../entities/Person";

const consolidateArray = (type: 'cast' | 'crew' | 'known for', arr: Movie[] | Person[]) => {

    if (!arr) return null;
    if (type === 'cast') return arr;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] && arr[j] && arr[i].id === arr[j].id) {
                if (type === 'crew' && arr[i].job && arr[j].job && !arr[i].job!.includes(arr[j].job!)) arr[i].job! += ', ' + arr[j].job!;
                // else if (type === 'known for' && !arr[i].character!.includes(arr[j].job!)) arr[i].character! += ', ' + arr[j].job!;

                delete arr[j];
                j--;
            }
        }
    }
    return arr;
}

export const consolidateMovieArray = (arr: Movie[], type: 'cast' | 'crew' | 'known for') => {
    return consolidateArray(type, arr) as Movie[];
}

export const consolidatePersonArray = (arr: Person[]) => {
    return consolidateArray('crew', arr) as Person[];
}

export default consolidateArray;