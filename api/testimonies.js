const express = require('express');
const db = require('../services/sql');
const router = express.Router();
module.exports = router;

// Fetch all testimonies for a language
router.get('/', async (req, res) => {
  const testimonies = await db.query(`
    SELECT id, title, message, created FROM testimony WHERE language_id = $1
    ORDER BY created DESC
  `, [
    req.language,
  ]);
  res.json(testimonies);
});

// Fetch a single testimony by ID
router.get('/:id', async (req, res) => {
  const testimony = await db.queryOne(`SELECT * FROM testimony WHERE id = $1`, [
    req.params.id,
  ]);
  res.json(testimony);
});
