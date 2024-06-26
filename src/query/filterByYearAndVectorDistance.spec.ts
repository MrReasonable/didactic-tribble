import { createFilter } from './filterByYearAndVectorDistance'
import { Movie, FilteredMovie } from '../data/movie'

const minYear = 1990
const maxYear = 2000
const vectorEmbedding = [0.5, 0.5, 0.5]
const maxItems = 5

describe('createFilter', () => {
    it('filters movies based on year and vector distance', () => {
        const filter = createFilter(minYear, maxYear, vectorEmbedding, maxItems)
        const movie1: Movie = {
            title: 'Movie 1',
            releaseYear: 1995,
            vectorEmbedding: [0.4, 0.4, 0.4],
            movieId: 0,
            country: '',
            description: '',
        }

        const movie2: Movie = {
            title: 'Movie 2',
            releaseYear: 1998,
            vectorEmbedding: [0.6, 0.6, 0.6],
            movieId: 0,
            country: '',
            description: '',
        }

        const movie3: Movie = {
            title: 'Movie 3',
            releaseYear: 2005,
            vectorEmbedding: [0.7, 0.7, 0.7],
            movieId: 0,
            country: '',
            description: '',
        }

        const filteredMovies: FilteredMovie[] = []

        const result = filter(movie1, filteredMovies)

        // movie1 should be included
        expect(result).toHaveLength(1)
        expect(result[0]).toStrictEqual({
            ...movie1,
            score: 1.0000000000000002,
        })

        // movie2 should be included
        const result2 = filter(movie2, result)
        expect(result2).toHaveLength(2)
        expect(result2[1]).toStrictEqual({ ...movie2, score: 1 })

        // movie3 should not be included
        const result3 = filter(movie3, result2)
        expect(result3).toHaveLength(2)
        expect(result3[1]).toStrictEqual({ ...movie2, score: 1 })
    })

    describe('Filter by Year and Vector Distance - Boundary Conditions', () => {
        it('should include movies on the minimum year boundary', () => {
            const filter = createFilter(
                minYear,
                maxYear,
                vectorEmbedding,
                maxItems
            )
            const movieOnMinYearBoundary: Movie = {
                title: 'Movie on Min Year Boundary',
                releaseYear: minYear,
                vectorEmbedding: [0.1, 0.1, 0.1],
                movieId: 1,
                country: '',
                description: '',
            }
            const result = filter(movieOnMinYearBoundary, [])
            expect(result).toHaveLength(1)
            expect(result[0]).toStrictEqual({
                ...movieOnMinYearBoundary,
                score: 1.0000000000000002,
            })
        })

        it('should include movies on the maximum year boundary', () => {
            const filter = createFilter(
                minYear,
                maxYear,
                vectorEmbedding,
                maxItems
            )
            const movieOnMaxYearBoundary: Movie = {
                title: 'Movie on Max Year Boundary',
                releaseYear: maxYear,
                vectorEmbedding: [0.9, 0.9, 0.9],
                movieId: 2,
                country: '',
                description: '',
            }
            const result: FilteredMovie[] = filter(movieOnMaxYearBoundary, [])
            expect(result).toHaveLength(1)
            expect(result[0]).toStrictEqual({
                ...movieOnMaxYearBoundary,
                score: 1.0000000000000002,
            })
        })

        it('should exclude movies with a release year after the maximum year', () => {
            const filter = createFilter(
                minYear,
                maxYear,
                vectorEmbedding,
                maxItems
            )
            const movieAfterMaximumYear: Movie = {
                title: 'Movie after Maximum Year',
                releaseYear: maxYear + 1,
                vectorEmbedding: [0.8, 0.8, 0.8],
                movieId: 3,
                country: '',
                description: '',
            }
            const result = filter(movieAfterMaximumYear, [])
            expect(result).toHaveLength(0)
        })

        it('should exclude movies before the minimum year', () => {
            const filter = createFilter(
                minYear,
                maxYear,
                vectorEmbedding,
                maxItems
            )
            const movieBeforeMinimumYear: Movie = {
                title: 'Movie before Minimum Year',
                releaseYear: minYear - 1,
                vectorEmbedding: [0.3, 0.3, 0.3],
                movieId: 5,
                country: '',
                description: '',
            }
            const result = filter(movieBeforeMinimumYear, [])
            expect(result).toHaveLength(0)
        })

        it('should exclude movies with a negative release year', () => {
            const filter = createFilter(
                minYear,
                maxYear,
                vectorEmbedding,
                maxItems
            )
            const movieWithNegativeYear: Movie = {
                title: 'Movie with Negative Year',
                releaseYear: -1995,
                vectorEmbedding: [0.2, 0.2, 0.2],
                movieId: 4,
                country: '',
                description: '',
            }
            const result = filter(movieWithNegativeYear, [])
            expect(result).toHaveLength(0)
        })
    })
})
