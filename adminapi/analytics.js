require('dotenv').config();
const axios = require('axios');
const express = require('express');
const db = require('../services/sql');

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const church = req.query.church;
  const language = req.query.language;
  const country = req.query.country;

  let params = [
    start,
    end,
  ];
  let additionalQuery = '';

  if (church) {
    params.push(church);
    additionalQuery = ' AND church_id = $3';
  }
  if (language) {
    params.push(language);
    additionalQuery = ' AND language = $3';
  }
  if (country) {
    params.push(country);
    additionalQuery = ' AND country = $3';
  }

  const rows = db.query(`
  SELECT action, DATE(created), COUNT(DISTINCT(user_id)) AS unique_events, COUNT(1) AS total_events FROM analytics
  WHERE created > $1 AND created < $2 ${additionalQuery}
  GROUP BY action, DATE(created) ORDER BY DATE(created) ASC;
  `, params);

  const data = (await rows).map((row) => {
    return [
      row.action,
      row.date.toISOString().split('T')[0],
      row.unique_events,
      row.total_events,
    ];
  });

  res.json(data);
});

router.get('/churches',  async(req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const church = req.query.church;
  const language = req.query.language;
  const country = req.query.country;

  let params = [
    start,
    end,
  ];
  let additionalQuery = '';

  if (church) {
    params.push(church);
    additionalQuery = ' AND church_id = $3';
  }
  if (language) {
    params.push(language);
    additionalQuery = ' AND language = $3';
  }
  if (country) {
    params.push(country);
    additionalQuery = ' AND country = $3';
  }

  const rows = db.query(`
  SELECT action, DATE(created), COUNT(DISTINCT(user_id)) AS unique_events, COUNT(1) AS total_events FROM analytics
  WHERE created > $1 AND created < $2 AND church = $3
  GROUP BY action, DATE(created) ORDER BY DATE(created) ASC;
  `, params);

  const data = (await rows).map((row) => {
    return [
      row.action,
      row.date.toISOString().split('T')[0],
      row.unique_events,
      row.total_events,
    ];
  });

  res.json(data);


});


router.get('/totalinstalls',  async(req, res) => {

  const church = req.query.church;
  let payload = {};


  if(church){
    let params =[
      church
    ];
    const installsChurch = await db.query(`SELECT * FROM "user" where church_id = $1 AND created_at > timestamp '2024-01-01 00:00:00'`,params);
    const ids = await db.query(`SELECT userid FROM "user" where church_id = $1 AND created_at > timestamp '2024-01-01 00:00:00'`,params);
    payload = {
      installsChurch: installsChurch,
      userids: ids
    }
  }else{
  const installsOne = await db.query('SELECT DISTINCT analytics.user_id FROM analytics');
  const difference = await db.query('SELECT DISTINCT analytics.user_id FROM analytics JOIN  "user" ON "user".userid = analytics.user_id WHERE "user".userid = analytics.user_id');
  const totalUser = await db.query('SELECT * FROM "user"');
  payload = {
    totalAnalytics : installsOne,
    difference : difference,
    totalUser : totalUser
  };
}
  
  res.json(payload);
});

router.post('/update', async(req, res) => {
  try {
    await db.query(`
    UPDATE analytics 
    SET church = $1
    WHERE user_id = $2
    `, [
      req.body.church,
      req.body.user
    ]);
    
    res.json('OK');
  } catch (err) {
    console.log('Failed', err.message);
  }
});



router.get('/languages',  async(req, res) => {
  const language = req.query.language

  let params = [
    language
  ];

  const users = await db.query(`SELECT COUNT (distinct userid), language_id from "user" WHERE language_id = $1 GROUP BY language_id`, params);
  const difference = await db.query(`SELECT COUNT (distinct user_id), language from analytics JOIN  "user" ON "user".userid = analytics.user_id WHERE language = $1 GROUP BY language`, params);
  const analytics = await db.query(`SELECT COUNT (distinct user_id), language from analytics WHERE language = $1 GROUP BY language`, params);
  const payload = {
    totalAnalytics : analytics,
    difference : difference,
    totalUser : users
  };
  
  res.json(payload);
});