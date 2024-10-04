const express = require('express');
const db = require('../services/sql');
const router = express.Router();
module.exports = router;

// Update info on a user.
router.post('/', async (req, res) => {
  console.log('Save user', req.body);
  try {
    const churchId = req.body.church_id;
    const blocked = ['undefined', 'null', 'other'];
    if (blocked.includes(churchId)) {
      churchId = null;
    }
    await db.query(`
      INSERT INTO "user" (id, created_at, updated_at, language_id, userid, version, church_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT ON CONSTRAINT user_pkey DO UPDATE SET
      language_id = EXCLUDED.language_id,
      userid = EXCLUDED.userid,
      version = EXCLUDED.version,
      church_id = EXCLUDED.church_id
    `, [
      req.body._id,
      req.body.created,
      req.body.updated,
      req.body.language,
      req.body.userid,
      req.body.version,
      churchId
    ])
    res.json('OK');
    console.log('User saved OK');
  } catch (err) {
    console.log('USER ERROR', err);
    res.status(500).json('USERERROR');
  }
});


