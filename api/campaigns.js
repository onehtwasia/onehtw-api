const express = require("express");
const db = require("../services/sql");
const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
  const devotionals = await db.query(`SELECT campaign_id, date FROM devotional WHERE language_id = $1`, [
    req.language,
  ]);
  const campaigns = await db.query(`
    SELECT campaign.id, campaign.start_date, campaign.end_date, campaign_local.name
    FROM campaign
    JOIN campaign_local ON campaign.id = campaign_local.campaign_id
    WHERE campaign_local.language_id = $1
    ORDER BY campaign.start_date DESC
  `, [ req.language ]);
  for (let campaign of campaigns) {
    campaign.devotionals = devotionals.filter((d) => (d.campaign_id == campaign.id)).map((d) => ({
      date: d.date,
    }));
  }
  res.json(campaigns);
});

router.get('/:id', async (req, res) => {
  const campaignId = `${req.params.id}.${req.language}`;
  const campaign = await db.queryOne(`SELECT * FROM campaign_local WHERE id = $1`, [
    campaignId,
  ]);
  campaign.devotionals = await db.query(`
    SELECT date, title FROM devotional WHERE campaign_id = $1 AND language_id = $2
    ORDER BY date ASC
  `, [
    req.params.id,
    req.language,
  ]);
  res.json(campaign);
});
