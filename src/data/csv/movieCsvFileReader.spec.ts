import {
    FileMovie,
    fileMovieToMovie,
    getMoviesFromCsv,
} from './movieCsvFileReader'
import { faker } from '@faker-js/faker'
import { Movie, MovieFilter } from '../movie'
// import { rimraf } from 'rimraf'
import { mkdirp } from 'mkdirp'
import { writeToPath } from 'fast-csv'

const fixtureDir = './fixtures'

const fixtureFile = `${fixtureDir}/movies.csv`

const generateMovie = (): FileMovie => ({
    title: faker.person.fullName(),
    movie_id: faker.number.int().toString(),
    country: faker.location.country(),
    release_year: faker.date.past().getFullYear().toString(),
    description: faker.lorem.sentence(),
    vector_embedding: JSON.stringify(
        new Array(10).fill(null).map(() => faker.number.float())
    ),
})

type CsvHeader = (keyof FileMovie)[]
const csvHeader: CsvHeader = [
    'movie_id',
    'title',
    'country',
    'release_year',
    'description',
    'vector_embedding',
]

describe('getMoviesFromCsv', () => {
    beforeAll(async () => {
        // await rimraf(fixtureDir)
    })

    afterEach(async () => {
        // await rimraf(fixtureDir)
    })

    beforeEach(async () => {
        await mkdirp(fixtureDir)
    })

    afterAll(async () => {
        // await rimraf(fixtureDir)
    })

    it('converts from a CSV row to a movie correctly', () => {
        const rowMovie: FileMovie = {
            title: 'title',
            movie_id: '1',
            country: 'country',
            release_year: '1990',
            description: 'description',
            vector_embedding: '[1,2,3]',
        }
        const expectedMovie: Movie = {
            title: 'title',
            movieId: 1,
            country: 'country',
            releaseYear: 1990,
            description: 'description',
            vectorEmbedding: [1, 2, 3],
        }
        const convertedMovie = fileMovieToMovie(rowMovie)
        expect(convertedMovie).toMatchObject(expectedMovie)
    })

    it('reads and applies filters to movies from a CSV file correctly', () => {
        const fakeCsvData: FileMovie[] = new Array(10).fill(null).map(() => {
            return generateMovie()
        })
        const csvContent = [
            csvHeader,
            ...fakeCsvData.map((row) => csvHeader.map((key) => row[key])),
        ]

        let count = 0

        const filter: MovieFilter = (movie: Movie) => {
            const expectedMovie = fileMovieToMovie(fakeCsvData[count])
            expect(movie).toMatchObject(expectedMovie)
            count = count + 1
            return []
        }

        return new Promise((resolve, reject) => {
            writeToPath(fixtureFile, csvContent)
                .on('finish', () => {
                    const movieFile = getMoviesFromCsv(fixtureFile)
                    movieFile
                        .filter(filter)
                        .then(() =>
                            resolve(expect(count).toBe(fakeCsvData.length))
                        )
                        .catch((error) => {
                            reject(error)
                        })
                })
                .on('error', (error) => {
                    reject(error)
                })
        })
    })

    it('handles errors correctly', async () => {
        // const mockError = new Error('Test error')
        // const mockStream = fs.createReadStream()
        // csv.parse.mockReturnValueOnce(mockStream)
        // setTimeout(() => mockStream.emit('error', mockError), 0)
        // await expect(getMoviesFromCsv('path/to/error.csv')).rejects.toThrow(
        //     'Test error'
        // )
    })
})
