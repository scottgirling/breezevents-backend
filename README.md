# Events Platform API

## Hosted version
If you would like to try out the hosted version, visit: [ADD LINK]

The '/api' path takes you to a list of all available endpoints. 
Here you will find a description of the endpoint, a list of available queries, an example path with queries (if applicable), an example request body (if applicable) and an example response.

## Project Summary
An API built to programmatically access data, featuring full CRUD functionality on a dataset built up of events, venues, users and tags.
This project offers a real-world backend service which can provide data to frontend architecture.
Built with TypeScript and Express, this RESTful API interacts with a PostgreSQL database and encompasses seeding, foreign keys and joins, complex queries, integration testing and error handling.

## How to get set-up
### Cloning the repository:
1) Copy the repository's URL and open the command line.
2) Change the current working directory to the desired location for the cloned repository.
3) Clone the repository by running the 'git clone' command, pasting the previously copied URL and press Enter.
4) Open the repository in a text editor.

### Installing dependencies:
1) Navigate to your project directory in the terminal.
2) Run the command 'npm install' which will read the 'package.json' file and download all the listed dependencies.

### Seeding databases:
1) Inside the './db/data' folder, there are two sets of data available: test-data and development-data. These are used to seed two different databases.
2) Run the 'npm run setup-dbs' command to DROP and CREATE these databases, ready for seeding.
3) Run the 'npm run seed' command to populate these databases with our test and development data. You will have access to different datasets depending on your environment (test or development).

### Running tests:
1) To run all tests together, run the 'npm run test' command. This will run all tests from the '__tests__/app.test.js' file at the same time.
2) If you want to run an individual test, change 'test' to 'test.only' on the appropriate test in the relevant test file.

### Adding environment variables:
1) You will need to create the following environment variables:
- PGDATABASE=events_platform inside a .env.development file at the root level of the repository
- PGDATABASE=events_platform_test inside a .env.test file at the root level of the repository
2) These files will automatically be added to your .gitignore (but it's always worth double checking!)

#### Minimum versions to ensure functionality:
- Node.js: v22.9.0
- Postgres: 8.7.3