const db = require('../services/sql');
const csvtojson = require('csvtojson');
const languages = [
  'ENG',
  'CHN',
  'YUH',
  'IND',
  'TGL',
  'VIE',
  'MAY',
  'TAM',
  'KOR',
];

async function doImport() {
  const csvFile = './annualimport/2024.labels.csv';
  const rows = await csvtojson().fromFile(csvFile);
  for (let row of rows) {
    for (let language of languages) {
    const labelId = row.ID;
    const value = row[language];
    const localLabelId = `${language}.${labelId}`;
    console.log(labelId, language, localLabelId);
    await db.query(`
      INSERT INTO label_local (id, label_id, language_id, name)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ON CONSTRAINT label_local_pkey
      DO UPDATE 
      SET label_id = EXCLUDED.label_id, language_id = EXCLUDED.language_id, name = EXCLUDED.name
    `, [
        localLabelId,
        labelId,
        language,
        value,
      ]
    );
    }
  }
}

doImport();
