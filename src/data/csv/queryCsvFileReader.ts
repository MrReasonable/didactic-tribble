import { PathLike, createReadStream } from 'node:fs'
import { parse } from 'fast-csv'
import { Query, QueryReader } from '../../query/query'

export type FileQuery = {
    min_release_year: string
    max_release_year: string
    query: string
    vector_embedding: string
}

export const createQueryCsvFileReader = (filePath: PathLike): QueryReader => {
    return {
        read: () =>
            new Promise((resolve, reject) => {
                const queries: Query[] = []
                createReadStream(filePath)
                    .pipe(parse({ headers: true }))
                    .on('data', (row: FileQuery) =>
                        queries.push({
                            minReleaseYear: parseInt(row.min_release_year),
                            maxReleaseYear: parseInt(row.max_release_year),
                            query: row.query,
                            vectorEmbedding: JSON.parse(
                                row.vector_embedding
                            ) as number[],
                        })
                    )
                    .on('end', () => resolve(queries))
                    .on('error', (error) => reject(error))
            }),
    }
}
