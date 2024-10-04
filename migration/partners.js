require('dotenv').config();
const fs = require('fs');
const mongodb = require('../services/db');
const sql = require('../services/sql');

async function sync() {
  const partners = await mongodb.collection('partners').find().toArray();
  fs.writeFileSync('data/partners.json', JSON.stringify(partners, null, 2));

  for (c of partners) {
    await sql.query(`
      INSERT INTO partner(id, name, name_eng, name_local, website, country)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING
    `, [
      c._id,
      c.name,
      c.name_eng,
      c.name_local,
      c.website,
      c.country,
    ]);
    console.log('Saved', c._id);
  }
  console.log('All complete');
}

mongodb.on('connected', sync);
