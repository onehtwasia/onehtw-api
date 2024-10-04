require('dotenv').config();
const fs = require('fs');
const format = require('pg-format');

const mongodb = require('../services/db');
const sql = require('../services/sql');

/*
_id - text
church - uuid (exclude 'null' and 'other')
created - date (string number)
updated - date (number)
language - text
userid - text (unique?)
version - text
*/

function cleanChurch(text) {
  if (text == 'null') {
    return null;
  }
  if (text == 'other') {
    return null;
  }
  return text;
}
function cleanDate(val) {
  try {
    if (!val) {
      return null
    }
    return new Date(val * 1);
  } catch (err) {
    console.log('Fail Date', val);
  }
}

async function sync() {
  console.log('Downloading all users');
  const users = await mongodb.collection('users').find().toArray();
  // fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));

  const mappedUsers = users.map((u) => ([
    u._id,
    cleanChurch(u.church),
    cleanDate(u.created),
    cleanDate(u.updated),
    u.language,
    u.userid,
    u.version
  ]));
  const query = format(`
    INSERT INTO "user" (id, church_id, created_at, updated_at, language_id, userid, version)
    VALUES %L
    ON CONFLICT DO NOTHING`, mappedUsers);

  await sql.query(query);
  console.log('All complete');
}

mongodb.on('connected', sync);
