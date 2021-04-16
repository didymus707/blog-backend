const pool = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: DB_USER,
  host: 'localhost',
  database: 'blog_db',
  password: DB_PASS,
  port: DB_PORT
});

module.exports = pool;