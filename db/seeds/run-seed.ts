// will change LINE 2 when I add dev data
const devData = require("../data/test-data/index");
const seed = require("./seed");
const db = require("../connection");

const runSeed = () => {
    return seed(devData).then(() => db.end());
}

runSeed();