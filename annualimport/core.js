const db = require('../services/sql');
const csvtojson = require('csvtojson');
const languages = [
  'ENG',
  'CHN',
  'YUH',
  'IND',
  'VIE',
  'MAY',
  'TAM'
];

async function testConnection() {
  const rows = await db.query(`SELECT 1`);
  console.log(rows);
}
testConnection();

for(let lang of languages){
  // importLanguage(lang);
}

async function importLanguage(language) {
  const csvFile = './2024.import.csv';
  const rows = await csvtojson().fromFile(csvFile);
  let dateNumber = 1;
  const campaignId = 166;
  for (let row of rows) {
    const openingPrayerText = row[`${language}_OP`];
    const devotionalTitle = row[`${language}_DT`];
    const devotionalBody = row[`${language}_DB`];
    const intercessoryPrayerText = row[`${language}_IP`];
    const openingPrayerAudio = `https://cdn.onehtw.com/2024/${language}_op/D (${dateNumber}).mp3`;
    const devotionalAudio = `https://cdn.onehtw.com/2024/${language}_dt/D (${dateNumber}).mp3`;
    const intercessoryAudio = `https://cdn.onehtw.com/2024/${language}_ip/D (${dateNumber}).mp3`;
    const date = row[`DATE`];
    const version = 15;
    const gospelFilmVideo = row[`${language}_GP_LINK`];

    await db.query(`
    INSERT INTO devotional(
      campaign_id,
      date,
      language_id,
      title,
      version,
      closing_prayer_text,
      closing_prayer_audio,
      devotional_text,
      devotional_audio,
      opening_prayer_text,
      opening_prayer_audio,
      gospel_film_video,
    )
    VALUES ($1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12)
    ON CONFLICT DO UPDATE
    SET campaign_id = EXCLUDED.campaign_id
  `, [
    campaignId,
    date,
    language,
    devotionalTitle,
    version,
    intercessoryPrayerText,
    intercessoryAudio,
    devotionalBody,
    devotionalAudio,
    openingPrayerText,
    openingPrayerAudio,
    gospelFilmVideo
  ])


    dateNumber ++;
  }
}
