const express = require('express');
const db = require('../services/sql');
const router = express.Router();
module.exports = router;

// List all news for a language
router.get('/', async (req, res) => {
  const news = await db.query(`
    SELECT * FROM news WHERE language_id = $1
    ORDER BY created DESC
  `, [
    req.language,
  ]);
  res.json(news);
});

// Fetch a news item by ID
router.get('/:id', async(req, res) => {
  const newsItem = await db.queryOne(`SELECT * FROM news WHERE id = $1`, [
    req.params.id,
  ]);
  res.json(newsItem);
});
