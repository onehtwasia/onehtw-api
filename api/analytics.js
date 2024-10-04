const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../services/sql');

router.post('/track', async (req,res) => {
  try {
    await db.query(`
    INSERT INTO analytics(
    action,
    action_id,
    language,
    user_id,
    country,
    church
    )
    VALUES ($1, $2, $3 , $4 , $5, $6)
    ON CONFLICT DO NOTHING
    `, [
      req.body.action,
      req.body.id,
      req.body.language,
      req.body.user,
      req.body.country,
      req.body.church
    ]);
    
    res.json('OK');
  } catch (err) {
    console.log('Failed', err.message);
  }
});

router.put('/update', async (req,res) => {
  try {
    await db.query(`
    UPDATE analytics 
    SET church = $1
    WHERE user_id = $2
    `, [
      req.body.church,
      req.body.user
    ]);
    
    res.json('OK');
  } catch (err) {
    console.log('Failed', err.message);
  }
});

module.exports = router;
 
