# Tech Test

### Prerequisites

- Node.js (version 12 or higher recommended)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/focaldata-tech-test.git
   ```

2. Navigate to the project directory:
   ```sh
   cd focaldata-tech-test
   ```

3. Install NPM packages:
   ```sh
   npm install
   ```

### Usage

To execute a query against the movie dataset, run the following command:
```sh
npm start -- --query path/to/query.csv --data path/to/dataset.csv --result path/to/output.csv
```

Replace path/to/query.csv, path/to/dataset.csv, and path/to/output.csv with the actual paths to your query file, dataset file, and output file, respectively.

Use the following command to work with the following command to utilise the example data provided from the test documentation:

```sh
npm start -- --query ./data/example_query_movies.csv --data ./data/example_dataset_movies.csv --result ./data/result.json
```

The results of the query will be stored in the `./data/result.json` file


### Running Tests
To run the test suite, use the following command:
```sh
npm test
```

Project Structure
* /src - Contains the source code for the project.
  * /command - Command line interface and main entry point.
  * /data - Data reading and parsing utilities.
  * /csv - CSV file readers for movies and queries.
  * /output - Output file writing utilities.
  * /query - Query processing and filtering logic.
* /data - The location of the query and dataset files.