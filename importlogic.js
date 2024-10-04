const { title } = require('process');
const db = require('./services/sql');
const csvtojson = require('csvtojson');
const languages = [
  'TGL'
  
];


for(let lang of languages){
  importLanguage(lang);
}

function convertDigitIn(str){
  return str.split('/').reverse().join('-');
}



async function importLanguage(language) {
  const csvFile = './TGL.csv';
  const rows = await csvtojson().fromFile(csvFile);
  let dateNumber = 1;
  let dateNumberIn = 1;
  const campaignId = 166;
  for (let row of rows) {
    const openingPrayerText = row[`${language}_OP`];
    const devotionalTitle = row[`${language}_DT`];
    const devotionalBody = row[`${language}_DB`];
    const intercessoryPrayerText = row[`${language}_IP`];
    const sunday =  row[`SUNDAY`];
    const gospelFilmVideo = row[`${language}_GP_LINK`];
    const openingPrayerAudio = sunday == 'yes'? '' : `https://cdn.onehtw.com/2024/${language.toLowerCase()}_op/D${dateNumber} OP.mp3`;
    const devotionalAudio =  sunday == 'yes'? '' : `https://cdn.onehtw.com/2024/${language.toLowerCase()}_dt/D${dateNumber} DEV.mp3`;
    const intercessoryAudio = `https://cdn.onehtw.com/2024/${language.toLowerCase()}_ip/D${dateNumberIn} IP.mp3`;
    const date = convertDigitIn(row[`DATE`]);
    const version = 15;
    const id = language + "." + convertDigitIn(date);
    
    const chapter_verse = row[`BIB_VERSE`];
    const book = 'Matt';

    const passage =  sunday == 'yes' ? '': book + " " + chapter_verse;

    console.log(date);
    console.log(dateNumber);
    console.log(openingPrayerAudio);
    console.log(intercessoryAudio);
    console.log(devotionalAudio);
    console.log(sunday);
    console.log(gospelFilmVideo);

    await db.query(`
    INSERT INTO devotional(
      id,
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
      gospel_film_video
    )
    VALUES ($1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12, $13)
    ON CONFLICT DO NOTHING
  `, [
    id,
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


  await db.query(`
  INSERT INTO devotional_reading(
    devotional_id,
    passage,
    chapterverse,
    book_id
  )
  VALUES ($1, $2, $3 , $4)
  ON CONFLICT DO NOTHING
`, [
  id,
  passage,
  chapter_verse,
  book 
]);


  
   if(sunday == 'no'){
    dateNumber ++;
   }
   
   dateNumberIn ++;
  }
   
}
