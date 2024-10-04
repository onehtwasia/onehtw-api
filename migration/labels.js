require('dotenv').config();
const fs = require('fs');
const mongodb = require('../services/db');
const sql = require('../services/sql');
const labelsJSON = require('../labels.json');

async function sync() {

  const labelIds = Object.keys(labelsJSON);
  for (labelId of labelIds) {
    await sql.query(`
      INSERT INTO label(id, title, description, default_value)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT DO NOTHING
    `, [
      labelId,
      labelsJSON[labelId].title,
      labelsJSON[labelId].description,
      labelsJSON[labelId].default,
    ]);
    console.log('Basic', labelId);
  }

  const labels = await mongodb.collection('labels').find().toArray();
  fs.writeFileSync('data/labels.json', JSON.stringify(labels, null, 2));
  for (c of labels) {
    await sql.query(`
      INSERT INTO label_local(id, label_id, language_id, name)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT DO NOTHING
    `, [
      c._id,
      c.placeholder_id,
      c.language,
      c.translation,
    ]);
    console.log('Saved', c._id);
  }
  console.log('All complete');
}

mongodb.on('connected', sync);
