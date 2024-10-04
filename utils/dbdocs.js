require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');

const config = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

fs.writeFileSync('./dbconfig.json', JSON.stringify(config, null, 2));
// execSync('npx postgres-to-docs --config=dbconfig.json --output=schema.md');
fs.unlinkSync('./dbconfig.json');
console.log('Done');
