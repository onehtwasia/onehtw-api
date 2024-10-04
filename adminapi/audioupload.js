const express = require('express');
const uuid = require('uuid');
const aws = require('aws-sdk');

const router = express.Router();
module.exports = router;

const options = {
  accessKeyId: process.env.S3_MEDIA_ACCESS_KEY,
	secretAccessKey: process.env.S3_MEDIA_SECRET_KEY,
	region: process.env.S3_MEDIA_REGION,
	signatureVersion: 'v4',
}
const s3 = new aws.S3(options);

router.get('/audioupload', (req, res) => {
  const id = uuid.v4();
  const contentType = req.query.type;
  const params = {
    Bucket: process.env.S3_MEDIA_BUCKET,
    Key: id,
    Expires: 60,
    ContentType: 'audio/mpeg',
    ACL: 'public-read',
  }
  const url = s3.getSignedUrl('putObject', params);
  res.json({ url, id });
});
