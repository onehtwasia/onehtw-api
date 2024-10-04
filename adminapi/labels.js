const express = require('express');
const uuid = require('uuid');
const db = require('../services/sql');

const router = express.Router();
module.exports = router;

router.get('/', async(req,res) => {
  const labels = await db.query(`
    SELECT label.*, label_local.name
    FROM label JOIN label_local ON label.id = label_local.label_id WHERE language_id = $1
  `, [
    req.language,
  ]);
  res.json(labels);
});

router.post('/:language', async(req,res) => {
  const language = req.params.language;
  for (let label of req.body) {
    await db.query(`
      INSERT INTO label_local (id, label_id, language_id, name)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ON CONSTRAINT label_local.pkey
      DO UPDATE SET
      label_id = EXCLUDED.label_id,
      language_id = EXCLUDED.language_id,
      name = EXCLUDED.name,
    `, [
      `${language}.${label.id}`,
      label.id,
      language,
      label.name,
    ]);
  }
  res.json('OK');
});
