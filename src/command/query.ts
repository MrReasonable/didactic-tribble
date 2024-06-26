import { createQueryCsvFileReader } from '../data/csv/queryCsvFileReader'
import { getMoviesFromCsv } from '../data/csv/movieCsvFileReader'
import { filter } from '../query/filter'
import { createResultWriter } from '../output/resultFileWriter'
import { createCommand } from '@commander-js/extra-typings'
import { resolve } from 'path'
import { PathLike } from 'fs'

const executeQuery = async (
    queryFilePath: PathLike,
    datasetFilePath: PathLike,
    resultFilePath: PathLike
) => {
    const queryCsvReader = createQueryCsvFileReader(queryFilePath)
    const queryData = (await queryCsvReader.read())[0] || null
    if (queryData === null) {
        console.error('No query data found')
        process.exit(1)
    }
    const movies = getMoviesFromCsv(datasetFilePath)
    const filteredMovies = await filter(queryData, movies)
    const resultWriter = createResultWriter(resultFilePath)
    await resultWriter.write(queryData, filteredMovies)
}

export const query = () => {
    const program = createCommand()
    program
        .name('query')
        .description(
            'Search for movies based on vector similarity and release year'
        )
        .requiredOption('-d --data <file>', 'data file path')
        .requiredOption('-q --query <file>', 'query file path')
        .requiredOption('-r --result <file>', 'result file path')
        .showHelpAfterError()
        .action(async (options) => {
            console.log("Here's what you passed in:" + JSON.stringify(options))
            const queryFilePath = resolve(process.cwd(), options.query)
            const datasetFilePath = resolve(process.cwd(), options.data)
            const resultFilePath = resolve(process.cwd(), options.result)
            await executeQuery(queryFilePath, datasetFilePath, resultFilePath)
            console.log('Done')
        })
        .parse()
}
