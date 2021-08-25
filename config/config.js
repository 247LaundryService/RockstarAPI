
// Load env values
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

exports.local = {
  username: process.env.LOCAL_USERNAME,
  password: process.env.LOCAL_PASSWORD,
  database: process.env.LOCAL_DATABASE,
  host: process.env.LOCAL_HOST,
  dialect: 'mysql',
  logging: false,
};
exports.development = {
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  host: process.env.RDS_HOST,
  dialect: 'mysql',
  logging: false,
};
exports.ci = {
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  host: process.env.RDS_HOST,
  dialect: 'mysql',
  logging: false,
};
exports.test = {
  username: process.env.LOCAL_USERNAME,
  password: process.env.LOCAL_PASSWORD,
  database: process.env.LOCAL_DATABASE,
  host: process.env.LOCAL_HOST,
  dialect: 'mysql',
  logging: false,
};
exports.production = {
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  host: process.env.RDS_HOST,
  dialect: 'mysql',
  logging: false,
};
