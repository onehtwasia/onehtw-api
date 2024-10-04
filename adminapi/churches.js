const express = require('express');
const uuid = require('uuid');
const db = require('../services/sql');

const router = express.Router();
module.exports = router;

router.get('/', async(req, res) => {
  const churches = await db.query(`SELECT * FROM church`);
  res.json(churches);
});

router.post('/', async (req,res) => {
  await db.query(`
    INSERT INTO church (id, name_eng, name_local, location, country)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT ON CONSTRAINT church_pkey
    DO UPDATE
    SET name_eng = EXCLUDED.name_eng,
    name_local = EXCLUDED.name_local,
    location = EXCLUDED.location,
    country = EXCLUDED.country
  `, [
    req.body.id,
    req.body.name_eng,
    req.body.name_local,
    req.body.location,
    req.body.country,
  ]);
  res.json(req.body);
});
