const express = require('express');
const db = require('../services/sql');
const router = express.Router();
module.exports = router;

router.get('/:id', async (req,res) => {
  const devotional = await db.queryOne(`SELECT * FROM devotional WHERE id = $1`, [
    req.params.id,
  ]);
  if (devotional) {
    devotional.readings = await db.query(`
      SELECT devotional_reading.*, CONCAT(bl.name, ' ', devotional_reading.chapterverse) AS display_passage
      FROM devotional_reading
      JOIN (SELECT book_id, name FROM book_local WHERE language_id = $2) AS bl
      ON devotional_reading.book_id = bl.book_id
      WHERE devotional_id = $1
    `, [
      devotional.id,
      devotional.language_id,
    ]);
  }
  res.json(devotional);
});
