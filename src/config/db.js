import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'senai',
  database: 'Bella_pizza'
});

export const query = (text, params) => pool.query(text, params);
