require('dotenv').config();
const fs = require('fs');
const mongodb = require('../services/db');
const sql = require('../services/sql');

async function sync() {
  const booktitles = await mongodb.collection('booktitles').find().toArray();
  console.log(booktitles);
  fs.writeFileSync('data/booktitles.json', JSON.stringify(booktitles, null, 2));
  for (let bt of booktitles) {
    const bookIds = Object.keys(bt);
    for (bookId of bookIds) {
      if (bookId !== '_id') {
        await sql.query(`INSERT INTO book(id) VALUES ($1) ON CONFLICT DO NOTHING`, [
          bookId,
        ]);
        console.log('Inserted', bookId);
        const languageId = bt._id;
        await sql.query(`
          INSERT INTO book_local (id, book_id, language_id, name)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT DO NOTHING
        `, [
          `${bookId}.${languageId}`,
          bookId,
          languageId,
          bt[bookId],
        ]);
        console.log('Inserted', bookId, bt._id, bt[bookId]);
      }
    }
  }
  console.log('All complete');
}

mongodb.on('connected', sync);
