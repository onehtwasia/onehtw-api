const express = require('express');
const uuid = require('uuid');
const notifications = require('../services/notifications');
const db = require('../services/sql');

const router = express.Router();
module.exports = router;

router.get('/', (req, res) => {
  res.json('OK');
});

// Send generic notifications
router.post('/notifications', async(req, res) => {
  res.json('OK');
  notifications.send(req.body.language, req.body.title, null);
});

function getCurrentTimeInHongKong() {
  let currentDateHK = new Date();
  currentDateHK.setTime(currentDateHK.getTime() + (8 * 60 * 60 * 1000));
  return currentDateHK;
}

// The "Daily" notification is sent during the active Lent campaign

router.get('/daily/:language', async (req,res) => {
  // The start date of the current campaign
  const campaignStartDate = new Date(2023, 1, 22);
  const language = req.params.language;
  const currentTimeHK = getCurrentTimeInHongKong();
  const currentDateHK = (currentTimeHK).toISOString().split('T')[0];

  // Number of days since the current campaign started
  const dayCount = Math.ceil((currentTimeHK - campaignStartDate)/(1000 * 60 * 60 * 24));

  // ID of the relevant devotional for today
  const id = `${language}.${currentDateHK}`;

  // Get the translation label for notification
  const label = await db.queryOne(`SELECT * FROM label_local WHERE id = $1`, [
    `${language}.app.general.date`
  ]);
  const prefix = label.name.replace('#', dayCount);

  // Get the current entry
  const entry = await db.queryOne(`SELECT * FROM devotional WHERE id = $1`, [
    id,
  ]);
  const notificationTitle = `${prefix} - ${entry.title}`;

  res.json(`Sending: ${notificationTitle}`);
  notifications.send(language, notificationTitle, '/home');
});

router.get('/specialprayer/:language', async (req,res) => {
  const language = req.params.language;
  const label = await db.queryOne(`SELECT * FROM label_local WHERE id = $1`, [
    `${language}.app.content.specialPrayerTitle`
  ]);

  const notificationTitle = label.name;
  res.json(`Sending: ${notificationTitle}`);
});
