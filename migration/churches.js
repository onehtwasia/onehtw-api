require('dotenv').config();
const fs = require('fs');
const mongodb = require('../services/db');
const sql = require('../services/sql');

async function sync() {
  const churches = await mongodb.collection('churches').find().toArray();
  fs.writeFileSync('data/churches.json', JSON.stringify(churches, null, 2));

  for (c of churches) {
    await sql.query(`
      INSERT INTO church(id, name_eng, name_chi, name_local, location, country)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING
    `, [
      c._id,
      c.name_eng,
      c.name_chi,
      c.name_local,
      c.location,
      c.country,
    ]);
    console.log('Saved', c._id);
  }
  console.log('All complete');
}

mongodb.on('connected', sync);
