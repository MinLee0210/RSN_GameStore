const Pool = require('pg').Pool;
// const stringConnection = 'postgres://risen_database_user:iMykYxORePmtt06mcuSkJBnoje1Nb2Ue@dpg-chicdq5269vf5qd5q5dg-a/risen_database'
const pool = new Pool({
    user: "postgres",
    password: "0210minh2001",
    host: "localhost",
    port: 5432,
    database: "Risen",
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
// const pool = new Pool({stringConnection})
module.exports = pool;
