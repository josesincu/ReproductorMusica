//import { S3Client } from '@aws-sdk/client-s3';
const { S3Client} = require('@aws-sdk/client-s3'); 

const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = {s3};