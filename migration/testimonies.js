require('dotenv').config();
const fs = require('fs');
const mongodb = require('../services/db');
const sql = require('../services/sql');

async function sync() {
  const testimonies = await mongodb.collection('testimonies').find().toArray();
  fs.writeFileSync('./testimonies.json', JSON.stringify(testimonies, null, 2));
  for (c of testimonies) {
    await sql.query(`
      INSERT INTO testimony(id, language_id, title, message, youtube, actionlabel, actionlink, created)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT DO NOTHING
    `, [
      c._id,
      c.language,
      c.title,
      c.message,
      c.youtube,
      c.actionlabel,
      c.actionlink,
      new Date(c.created),
    ]);
    console.log('Saved', c._id);
  }
  console.log('All complete');
}

mongodb.on('connected', sync);
