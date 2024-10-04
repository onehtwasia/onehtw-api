const express = require('express');
const uuid = require('uuid');
const db = require('../services/sql');

const router = express.Router();
module.exports = router;

// PARTNERS
router.get('/', async (req,res) =>{
  const partners = await db.query(`SELECT * FROM partner`);
  res.json(partners);
});

router.post('/', async (req,res) => {
  await db.query(`
    INSERT INTO partner (id, name, name_eng, name_local, website, country)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT ON CONSTRAINT partner_pkey
    DO UPDATE
    SET name = EXCLUDED.name,
    name_eng = EXCLUDED.name_eng,
    name_local = EXCLUDED.name_local,
    website = EXCLUDED.website,
    country = EXCLUDED.country
  `, [
    req.body.id,
    req.body.name,
    req.body.name_eng,
    req.body.name_local,
    req.body.website,
    req.body.country,
  ]);
  res.json(req.body);
});
