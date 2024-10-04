const express = require('express');
const db = require('../services/sql');
const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
  const churches = await db.query(`SELECT * FROM church ORDER BY name_eng ASC`);
  res.json(churches);
});
