// PG database client/connection setup
import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();


const dbParams = {
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect();

export default db;
