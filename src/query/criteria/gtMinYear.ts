import { Movie } from '../../data/movie'

export const gtMinYear = (minYear: number, movie: Movie) =>
    movie.releaseYear >= minYear
