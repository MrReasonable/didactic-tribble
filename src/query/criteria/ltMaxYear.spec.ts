import { ltMaxYear } from './ltMaxYear'
import { Movie } from '../../data/movie'

describe('ltMaxYear', () => {
    it('returns true when the movie release year is less than the maximum year', () => {
        const movie: Movie = {
            title: 'Finding Nemo',
            releaseYear: 2003,
            movieId: 0,
            country: '',
            description: '',
            vectorEmbedding: [],
        }
        expect(ltMaxYear(2010, movie)).toBe(true)
    })

    it('returns true when the movie release year is equal to the maximum year', () => {
        const movie: Movie = {
            title: 'Inception',
            releaseYear: 2010,
            movieId: 0,
            country: '',
            description: '',
            vectorEmbedding: [],
        }
        expect(ltMaxYear(2010, movie)).toBe(true)
    })

    it('returns false when the movie release year is greater than the maximum year', () => {
        const movie: Movie = {
            title: 'Interstellar',
            releaseYear: 2014,
            movieId: 0,
            country: '',
            description: '',
            vectorEmbedding: [],
        }
        expect(ltMaxYear(2010, movie)).toBe(false)
    })
})
