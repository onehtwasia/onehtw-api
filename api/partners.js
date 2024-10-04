const express = require('express');
const db = require('../services/sql');
const router = express.Router();
module.exports = router;

// Returns the list of all partners
router.get('/', async (req, res) => {
  const partners = await db.query(`SELECT * FROM partner`);
  res.json(partners);
});
