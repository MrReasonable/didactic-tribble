import type { Query } from './query'
import type { FilteredMovie, Movies } from '../data/movie'
import { createFilter } from './filterByYearAndVectorDistance'

export const filter = async (
    query: Query,
    movies: Movies,
    topN: number = 10
): Promise<FilteredMovie[]> => {
    const preparedFilter = createFilter(
        query.minReleaseYear,
        query.maxReleaseYear,
        query.vectorEmbedding,
        topN
    )
    return movies.filter(preparedFilter)
}
