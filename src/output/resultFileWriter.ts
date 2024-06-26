import { PathLike } from 'fs'
import { FilteredMovie } from '../data/movie'
import { Query } from '../query/query'
import fs from 'fs/promises'

type ResultWriter = {
    write: (query: Query, movies: FilteredMovie[]) => Promise<boolean>
}

export const createResultWriter = (filePath: PathLike): ResultWriter => {
    return {
        write: async (query: Query, movies: FilteredMovie[]) => {
            // write the results to the file in JSON format
            const results = { query, movies }
            const json = JSON.stringify(results, null, 2)
            try {
                await fs.writeFile(filePath, json)
                console.log(`Results written to file: ${filePath.toString()}`)
                return true
            } catch (err) {
                console.error(err)
                return false
            }
        },
    }
}
