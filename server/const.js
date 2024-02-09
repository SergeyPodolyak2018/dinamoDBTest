import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const PATH_ENV_NAME = 'BASE_URI';
const PORT_ENV_NAME = 'PORT';

const BASE_URI = process.env[PATH_ENV_NAME] || '';
const PORT = process.env[PORT_ENV_NAME] || 3000;
const UI_PORT = process.env['UI_PORT'] || 3001;

const AWS_ACCESS_KEY = process.env['AWS_ACCESS_KEY'];
const AWS_SECRET_KEY = process.env['AWS_SECRET_KEY'];
const DB_HOST_PORT = process.env['DB_HOST_PORT'] || 'http://localhost:8000';

export default {
  PORT,
  BASE_URI,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  UI_PORT,
  DB_HOST_PORT,
};
