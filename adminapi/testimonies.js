const express = require('express');
const uuid = require('uuid');
const db = require('../services/sql');
const notifications = require('../services/notifications');

const router = express.Router();
module.exports = router;

router.get('/', async (req,res) => {
  const testimonies = await db.query(`SELECT * FROM testimony ORDER BY created DESC LIMIT 100`);
  res.json(testimonies);
});

router.post('/',async (req,res) => {
  await db.query(`
    INSERT INTO testimony (id, language_id, title, message, youtube, actionlabel, actionlink, created)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT ON CONSTRAINT testimony_pkey
    DO UPDATE SET
    language_id = EXCLUDED.language_id,
    title = EXCLUDED.title,
    message = EXCLUDED.message,
    youtube = EXCLUDED.youtube,
    actionlabel = EXCLUDED.actionlabel,
    actionlink = EXCLUDED.actionlink,
    created = EXCLUDED.created
  `, [
    req.body.id,
    req.body.language_id,
    req.body.title,
    req.body.message,
    req.body.youtube,
    req.body.actionlabel,
    req.body.actionlink,
    new Date()
  ]);
  res.json(req.body);
});

router.get('/testimonies/:id/send', async (req,res) => {
  // const item = await db.collection('testimonies').findOne({_id:req.params.id});
  const item = await db.queryOne(`SELECT * FROM testimony WHERE id = $1`, [
    req.params.id,
  ]);
  const path = `/testimonies/${item.id}`;
  notifications.send(item.language_id, item.title, path);
  res.json('OK');
})
