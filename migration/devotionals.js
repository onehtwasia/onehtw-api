require('dotenv').config();
const fs = require('fs');
const format = require('pg-format');

const mongodb = require('../services/db');
const sql = require('../services/sql');

function narray(arr) {
  if (Array.isArray(arr)) {
    // return format('ARRAY[%L]', arr);
    return '{' + arr.map((a) => `"${a}"`) + '}';
  }
  return null;
}

// console.log(format(`ARRAY[%L]`, ['1', '2', '3']));

async function sync() {
  console.log('Downloading all content');
  // const content = await mongodb.collection('content').find().toArray();
  // fs.writeFileSync('./content.json', JSON.stringify(content, null, 2));
  const content = require('../content.json');
  console.log('Content saved');

  const devotionals = [];
  const readings = [];

  for (let devo of content) {
    devotionals.push([
      devo._id,
      devo.campaign,
      devo.date,
      devo.language,
      devo.bible_quote,
      devo.title,
      devo.version,
      devo.closing_prayer_text,
      devo.closing_prayer_audio,
      devo.devotional_text,
      devo.devotional_audio,
      devo.opening_prayer_text,
      devo.opening_prayer_audio,
      devo.prayer_text,
      devo.prayer_audio,
      devo.specialprayer,
      devo.specialprayer_audio,
      devo.testimony_text,
      devo.testimony_audio,
      devo.video,
      narray(devo.videos),
      narray(devo.bigVideos),
      devo.gospelfilm_video,
      narray(devo.gfilms ? devo.gfilms.map((gf) => gf.url) : null),
    ]);
    devo.readings && devo.readings.forEach((reading) => {
      readings.push([
        devo._id,
        reading.passage,
        reading.audio,
        reading.start,
        reading.end,
      ]);
    });
  }

  await sql.query(format(`
    INSERT INTO devotional (
      id,
      campaign_id,
      date,
      language_id,
      bible_quote,
      title,
      version,
      closing_prayer_text,
      closing_prayer_audio,
      devotional_text,
      devotional_audio,
      opening_prayer_text,
      opening_prayer_audio,
      prayer_text,
      prayer_audio,
      special_prayer_text,
      special_prayer_audio,
      testimony_text,
      testimony_audio,
      testimony_video,
      videos,
      big_videos,
      gospel_film_video,
      gospel_film_videos
    )
    VALUES %L
    ON CONFLICT DO NOTHING`, devotionals));

  console.log('Devotionals added');

  await sql.query(format(`
    INSERT INTO devotional_reading (
      devotional_id,
      passage,
      audio,
      start,
      "end"
    )
    VALUES %L
    ON CONFLICT DO NOTHING`, readings));

  console.log('All complete');
}

mongodb.on('connected', sync);
