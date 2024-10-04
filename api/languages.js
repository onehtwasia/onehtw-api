const express = require('express');
const db = require('../services/sql');
const router = express.Router();
module.exports = router;

// Fetch the list of all languages
router.get('/', async (req, res) => {
  // const languages = await db.collection('languages').find({
  //   enabled: true
  // }).toArray();
  const languages = await db.query(`SELECT * FROM language WHERE enabled = TRUE`);
  res.json(languages);
});
