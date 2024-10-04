require('dotenv').config();
const fs = require('fs');
const mongodb = require('../services/db');
const sql = require('../services/sql');

async function sync() {
  const campaigns = await mongodb.collection('campaigns').find().toArray();
  console.log(campaigns);
  fs.writeFileSync('data/campaigns.json', JSON.stringify(campaigns, null, 2));

  for (c of campaigns) {
    const campaignId = c._id;
    await sql.query(`INSERT INTO campaign(id, name_eng) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [
      campaignId,
      c.ENG,
    ]);
    const languages = Object.keys(c).filter((k) => (k !== '_id'));
    console.log('Languages', campaignId, languages);
    for (let language of languages) {
      await sql.query(`
        INSERT INTO campaign_local (id, campaign_id, language_id, name)
        VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING
      `, [
        `${campaignId}.${language}`,
        campaignId,
        language,
        c[language],
      ]);
    }
  }
  console.log('All complete');
}

mongodb.on('connected', sync);
