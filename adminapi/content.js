const express = require('express');
const uuid = require('uuid');
const db = require('../services/sql');

const router = express.Router();
module.exports = router;

router.get('/', async (req,res) => {
  const content = await db.query(`SELECT * FROM devotional`);
  res.json(data);
});

router.get('/:language', async (req,res) => {
  const language = req.params.language;
  const content = await db.query(`
    SELECT id, date, title FROM devotional
    WHERE language_id = $1
    ORDER BY date DESC
    LIMIT 1000
  `, [
    language,
  ]);
  res.json(content);
});

router.get('/:language/:date', async(req,res) => {
  const id = `${req.params.language}.${req.params.date}`;
  const content = await db.queryOne(`SELECT * FROM devotional WHERE id = $1`, [
    id,
  ]);
  res.json(content);
});

router.post('/:language/:date', async(req,res) => {
  const id = `${req.params.language}.${req.params.date}`;
  await db.queryOne(`
    UPDATE devotional SET
    title = $1,
    devotional_text = $2,
    devotional_audio = $3,
    bible_quote = $4,
    special_prayer_text = $5,
    special_prayer_audio = $6,
    prayer_text = $7,
    prayer_audio = $8,
    videos = $9,
    testimony_text = $10,
    testimony_audio = $11,
    opening_prayer_text = $12,
    opening_prayer_audio = $13,
    closing_prayer_text = $14,
    closing_prayer_audio = $15
    WHERE id = $16
  `, [
    req.body.title,
    req.body.devotional_text,
    req.body.devotional_audio,
    req.body.bible_quote,
    req.body.special_prayer_text,
    req.body.special_prayer_audio,
    req.body.prayer_text,
    req.body.prayer_audio,
    req.body.videos,
    req.body.testimony_text,
    req.body.testimony_audio,
    req.body.opening_prayer_text,
    req.body.opening_prayer_audio,
    req.body.closing_prayer_text,
    req.body.closing_prayer_audio,
    id,
  ]);
  res.json(req.body);
});
