import { Movie } from '../../data/movie'

export const ltMaxYear = (maxYear: number, movie: Movie) =>
    movie.releaseYear <= maxYear
