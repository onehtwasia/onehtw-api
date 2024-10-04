const express = require('express');
const uuid = require('uuid');
const db = require('../services/sql');

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
  let query = `SELECT * FROM language`;
  if(req.query.enabled){
    query = `SELECT * FROM language WHERE enabled = TRUE`;
  }
  const data = await db.query(query);
  res.json(data);
});

router.get('/:id', async (req,res) => {
  // const language = db.collection('languages').findOne({
  //   _id: req.params.id,
  // });
  const language = await db.queryOne(`SELECT * FROM language WHERE id = $1`, [
    req.params.id,
  ]);
  res.json(language);
});

async function populateBookNames(language) {
  const { data } = await axios.get('https://dbt.io/library/bookname', {
    params:{
      key: process.env.DBT_KEY,
      language_code: language,
      v: 2,
    },
  });
  // TODO: Update book names
  // await db.collection('booktitles').replaceOne({ _id: language.id }, data[0], { upsert:true });
}

router.post('/', async(req,res) => {
  const language = req.body;
  // await db.collection('languages').replaceOne({ _id: req.body.id },req.body, { upsert: true });
  await db.query(`
    INSERT INTO language (id, name, name_eng, version, googleid, priority, enabled)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT ON CONSTRAINT language_pkey DO UPDATE SET
    name = EXCLUDED.name,
    name_eng = EXCLUDED.name_eng,
    version = EXCLUDED.version,
    googleid = EXCLUDED.googleid,
    priority = EXCLUDED.priority,
    enabled = EXCLUDED.enabled,
  `, [
    req.body.id,
    req.body.name,
    req.body.name_eng,
    req.body.version,
    req.body.googleid,
    req.body.priority,
    req.body.enabled,
  ]);
  res.json(req.body);
  await populateBookNames(language);
});
