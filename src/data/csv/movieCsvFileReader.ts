import fs, { PathLike } from 'fs'
import { parse } from 'fast-csv'
import type { FilteredMovie, Movie, MovieFilter, Movies } from '../movie'

export type FileMovie = {
    movie_id: string
    title: string
    country: string
    release_year: string
    description: string
    vector_embedding: string
}

export const fileMovieToMovie = (movie: FileMovie): Movie => ({
    movieId: parseInt(movie.movie_id),
    title: movie.title,
    country: movie.country,
    releaseYear: parseInt(movie.release_year),
    description: movie.description,
    vectorEmbedding: JSON.parse(movie.vector_embedding) as number[],
})

const queryExecution = (
    row: FileMovie,
    expression: MovieFilter,
    results: FilteredMovie[]
) => {
    const movie = fileMovieToMovie(row)
    return expression(movie, results)
}

export const getMoviesFromCsv = (filePath: PathLike): Movies => {
    const filter = (expression: MovieFilter): Promise<FilteredMovie[]> => {
        return new Promise((resolve, reject) => {
            let results: FilteredMovie[] = []

            fs.createReadStream(filePath)
                .pipe(parse({ headers: true }))
                .on('data', (row: FileMovie) => {
                    results = queryExecution(row, expression, results)
                })
                .on('end', () => {
                    resolve(results)
                })
                .on('error', (error) => {
                    reject(error)
                })
        })
    }
    return { filter }
}
