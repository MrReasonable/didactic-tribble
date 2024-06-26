import similarity from 'compute-cosine-similarity'
import { FilteredMovie, Movie } from '../../data/movie'

const replaceLastMovie = (
    movie: Movie,
    score: number,
    filteredMovies: FilteredMovie[]
): FilteredMovie[] => {
    const newFilteredMovies = [...filteredMovies]
    newFilteredMovies.pop()
    newFilteredMovies.push({ ...movie, score })
    newFilteredMovies.sort((a, b) => b.score - a.score)
    return newFilteredMovies
}

export const closestVectorDistance = (
    vectorA: number[],
    movie: Movie,
    filteredMovies: FilteredMovie[],
    maxItems: number
): FilteredMovie[] => {
    const vectorB = movie.vectorEmbedding
    const score = similarity(vectorA, vectorB)
    if (score === null) {
        console.warn(
            `Unable to obtain vector similarity for movie ${movie.title}`
        )
        return filteredMovies
    }

    if (filteredMovies.length < maxItems) {
        return [...filteredMovies, { ...movie, score }]
    }

    const lastElement = filteredMovies.length - 1

    if (score > filteredMovies[lastElement].score) {
        return replaceLastMovie(movie, score, filteredMovies)
    }

    return filteredMovies
}
