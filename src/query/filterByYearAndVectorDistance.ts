import { gtMinYear } from './criteria/gtMinYear'
import { ltMaxYear } from './criteria/ltMaxYear'
import { FilteredMovie, Movie, MovieFilter } from '../data/movie'
import { closestVectorDistance } from './criteria/closestVectorDistance'

export const createFilter =
    (
        minYear: number,
        maxYear: number,
        vectorEmbedding: number[],
        maxItems: number
    ): MovieFilter =>
    (movie: Movie, filteredMovies: FilteredMovie[]): FilteredMovie[] => {
        if (gtMinYear(minYear, movie) && ltMaxYear(maxYear, movie)) {
            return closestVectorDistance(
                vectorEmbedding,
                movie,
                filteredMovies,
                maxItems
            )
        }
        return filteredMovies
    }
