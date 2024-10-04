require('dotenv').config();
const { Pool } = require('pg');

console.log('SERVER', process.env.PGHOST);

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});

const service = {};
service.getClient = async() => {
  return pool.connect();
};

service.query = async (sql, params) => {
  const result = await pool.query(sql, params);
  return result.rows;
};
service.queryOne = async (sql, params) => {
  const results = await pool.query(sql, params);
  return results.rows[0];
};

module.exports = service;
