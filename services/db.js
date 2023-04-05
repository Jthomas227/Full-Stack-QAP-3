const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'F1_2020',
  password: 'Jspezza#19!',
  port: 5432,
});

module.exports = pool;