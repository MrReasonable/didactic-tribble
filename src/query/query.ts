export type Query = {
    minReleaseYear: number // the minimum release year (inclusive)
    maxReleaseYear: number // the maximum release year (inclusive)
    query: string // the query to run against the dataset
    vectorEmbedding: number[] // the vector representation of the query
}

export type QueryReader = {
    read: () => Promise<Query[]>
}
