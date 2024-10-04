require('dotenv').config();
const fs = require('fs');
const mongodb = require('../services/db');
const sql = require('../services/sql');

async function sync() {
  const languages = await mongodb.collection('languages').find().toArray();
  fs.writeFileSync('data/languages.json', JSON.stringify(languages, null, 2));

  for (c of languages) {
    await sql.query(`
      INSERT INTO language(id, name, name_eng, enabled, version, googleid, priority)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT DO NOTHING
    `, [
      c._id,
      c.name,
      c.name_english,
      c.enabled,
      c.version,
      c.googleid,
      c.priority,
    ]);
    console.log('Saved', c._id);
  }
  console.log('All complete');
}

mongodb.on('connected', sync);
