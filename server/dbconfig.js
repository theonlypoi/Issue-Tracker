const Pool = require('pg').Pool;

var config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
}
var pool = new Pool(config);

module.exports = pool;
