import { gtMinYear } from './gtMinYear'
import { Movie } from '../../data/movie'

describe('gtMinYear', () => {
    it('returns true when the movie release year is greater than the minimum year', () => {
        const movie: Movie = {
            title: 'Inception',
            releaseYear: 2010,
            movieId: 0,
            country: '',
            description: '',
            vectorEmbedding: [],
        }
        expect(gtMinYear(2000, movie)).toBe(true)
    })

    it('returns true when the movie release year is equal to the minimum year', () => {
        const movie: Movie = {
            title: 'The Matrix',
            releaseYear: 1999,
            movieId: 0,
            country: '',
            description: '',
            vectorEmbedding: [],
        }
        expect(gtMinYear(1999, movie)).toBe(true)
    })

    it('returns false when the movie release year is less than the minimum year', () => {
        const movie: Movie = {
            title: 'Jurassic Park',
            releaseYear: 1993,
            movieId: 0,
            country: '',
            description: '',
            vectorEmbedding: [],
        }
        expect(gtMinYear(2000, movie)).toBe(false)
    })
})
