const express = require('express');
const db = require('../services/sql');

const router = express.Router();
module.exports = router;

const labels = require('../labels.json');

router.get('/', async (req, res) => {
  const language = req.query.language || req.language;
  const output = {};
  const labels = await db.query(`
    SELECT label.*, ll.name
    FROM label
    LEFT JOIN (SELECT label_id, name FROM label_local WHERE language_id = $1) AS ll
    ON label.id = ll.label_id
  `, [
    req.language,
  ]);
  for (let label of labels) {
    output[label.id] = label.name || label.default_value;
  }
  res.json(output);

});
