require('dotenv').config();
const FCM = require('fcm-node');
const apn = require('apn');
const db = require('./db.js');

// Utility function to wait timeout ms
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// Sending to Android
const androidKey = process.env.ANDROID_FCM_KEY;
const fcmClient = new FCM(androidKey);

async function sendAndroid(token, title, path){
  console.log('Send Android', token, title, path);
  const message = {
    to: token,
    data: { title, path }
  };
  // Library doesn't support promises lol
  fcmClient.send(message, (err, resp) => {
    console.log('Error', err);
    console.log('Response', resp);
    // TODO: Handle errors
    // JSON.parse(err).results[0].error)
  });
}

const apnClient = new apn.Provider({
  production: true,
  token: {
    key: process.env.IOS_APN_KEY.split(String.raw`\n`).join('\n'),
    keyId: process.env.IOS_APN_KEY_ID,
    teamId: process.env.IOS_TEAM_ID,
  }
});

async function sendIOS(token, title, path){
  const note = new apn.Notification();
  note.topic = 'com.fcbh.onehtw';
  note.alert = title;
  note.payload = { path };
  const result = await apnClient.send(note,[token]);
  if (result.sent.length) {
    console.log('Sent OK', result.sent);
    // Sent OK, otherwise
  } else {
    console.log('iOS Notification Send Error', token, result.failed);
    // To do - remove the token from the database
  }
}

// Send notifications to everyone matching a language
async function send(language, title, path){
  console.log('Sending notifications: ', language, title, path);
  const devices = await db.collection('users').find({ language },{ _id:1 }).toArray();
  console.log('Found devices', devices.length);
  for (let device of devices) {
    // Android tokens are > 100 characters. iOS tokens are < 100 characters.
    if (device._id.length > 100) {
      sendAndroid(device._id, title, path);
    } else {
      sendIOS(device._id, title, path);
    }
    await wait(30); // Slow down to improve deliverability
  }
}

module.exports = {
  send,
};

// const androidToken = "c8pWq8AUnkM:APA91bE7MIWAFq-h91QR5oMD2QpWqs8bqf4yy8IlUKphQLkirGiH4dnNuBOPAXLb69Cehv9DcyiTgVIkiI_TDHSXfzAoVOPyAsstx1Skk_p0xmsWzy7WC3hvnqhuItG5_ISz1dhWwGlL";
// sendAndroid(androidToken, 'Test, please ignore', '/home');
//
// const iosToken = "5a3d457c27f71232e84b04f320e3f5bb9056a5e98dfeb7190c0b3456c4788b8f";
// sendIOS(iosToken, 'Test, please ignore', '/home');
