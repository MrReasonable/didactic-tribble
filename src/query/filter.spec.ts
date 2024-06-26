import { filter } from './filter'
import { createFilter } from './filterByYearAndVectorDistance'
import type { FilteredMovie, Movies } from '../data/movie'
import type { Query } from './query'

jest.mock('./filterByYearAndVectorDistance')

describe('filter', () => {
    it('calls createFilter with min and max release years', async () => {
        const movie: FilteredMovie = {
            country: '',
            description: '',
            movieId: 0,
            releaseYear: 1990,
            title: '',
            score: 0,
        }
        const mockQuery: Query = {
            minReleaseYear: 2000,
            maxReleaseYear: 2010,
            query: '',
            vectorEmbedding: [],
        }

        const topN = 10

        const mockMovies: Movies = {
            filter: () => Promise.resolve([movie]),
        }

        const result = await filter(mockQuery, mockMovies, topN)

        expect(createFilter).toHaveBeenCalledWith(
            mockQuery.minReleaseYear,
            mockQuery.maxReleaseYear,
            [],
            topN
        )
        expect(result).toEqual([movie])
    })

    // Additional tests can be added here
})
