import { closestVectorDistance } from './closestVectorDistance'
import similarity from 'compute-cosine-similarity'
import { FilteredMovie, Movie } from '../../data/movie'

jest.mock('compute-cosine-similarity')
jest.spyOn(console, 'warn').mockImplementation(() => {})

describe('closestVectorDistance', () => {
    const vectorA = [1, 2, 3]
    const movie: Movie = {
        movieId: 1,
        title: 'Test Movie',
        vectorEmbedding: [4, 5, 6],
        country: '',
        releaseYear: 1990,
        description: '',
    }
    const filteredMovies: FilteredMovie[] = [
        {
            title: 'Existing Movie',
            score: 0.9,
            movieId: 0,
            country: 'United Kingdom',
            releaseYear: 0,
            description: 'An existing movie',
        },
    ]

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should return original filteredMovies if similarity score is null', () => {
        jest.mocked(similarity).mockReturnValueOnce(null)

        const result = closestVectorDistance(vectorA, movie, filteredMovies, 5)

        expect(result).toEqual(filteredMovies)
    })

    it('should add movie with valid similarity score when filtered movies not full', () => {
        jest.mocked(similarity).mockReturnValueOnce(0.8)

        const result = closestVectorDistance(vectorA, movie, filteredMovies, 5)

        expect(result).toContainEqual({ ...movie, score: 0.8 })
    })

    it('should replace the last movie when array is full and new movie has higher score', () => {
        jest.mocked(similarity).mockReturnValueOnce(0.9)
        const existingMovie1 = {
            movieId: 2,
            title: 'Existing Movie 1',
            score: 0.8,
            country: '',
            releaseYear: 0,
            description: 'Movie 1',
        }

        const existingMovie2 = {
            movieId: 3,
            title: 'Existing Movie 2',
            score: 0.7,
            country: 'UK',
            releaseYear: 0,
            description: 'Movie 2',
        }

        const existingFilteredMovies: FilteredMovie[] = [
            existingMovie1,
            existingMovie2,
        ]

        const result = closestVectorDistance(
            vectorA,
            movie,
            existingFilteredMovies,
            2
        )

        expect(result).toHaveLength(2)
        expect(result).toContainEqual({
            ...movie,
            score: 0.9,
        })
        expect(result).not.toContainEqual({
            ...existingMovie2,
        })
    })
})
