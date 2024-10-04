const db = require('../services/sql');
const csvtojson = require('csvtojson');

async function doImport() {
  const csvFile = './annualimport/2024.kor_bible_audio.csv';
  const rows = await csvtojson().fromFile(csvFile);
  for (let row of rows) {
    const d = new Date(row.date);
    const audioUrl = `https://cdn.onehtw.com/2024/kor_bible_audio/${row.audio}`;
    const devotionalId = `KOR.${d.toISOString().split('T')[0]}`;
    console.log(devotionalId, audioUrl);
    await db.query(`
        UPDATE devotional_reading 
        SET audio = $1 
        WHERE devotional_id = $2
    `, [
        audioUrl,
        devotionalId,
    ]);
    console.log('OK');
  }
  console.log('All done');
}

doImport();
