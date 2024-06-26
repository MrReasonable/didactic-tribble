export type Movie = {
    movieId: number
    title: string
    country: string
    releaseYear: number
    description: string
    vectorEmbedding: number[]
}

export type FilteredMovie = Omit<Movie, 'vectorEmbedding'> & {
    score: number
}

export type MovieFilter = (
    movie: Movie,
    currentResults: FilteredMovie[]
) => FilteredMovie[]

export type Movies = {
    filter: (expression: MovieFilter) => Promise<FilteredMovie[]>
}
