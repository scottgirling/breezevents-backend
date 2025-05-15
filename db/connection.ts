const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
    path: `${__dirname}/../../.env.${ENV}`
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}

interface Config {
    connectionString: string | undefined;
    max: number | undefined;
};

const config: Config = {
    connectionString: undefined,
    max: undefined
};

if (ENV === "production") {
    config.connectionString = process.env.DATABASE_URL,
    config.max = 2
}

module.exports = new Pool(config);