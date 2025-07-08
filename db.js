const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'BlogDB',        
  password: '341458-3u',
  port: 5432,
});

module.exports = pool;