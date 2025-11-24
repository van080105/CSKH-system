import  sql  from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

const getPool = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('✅ Connected to SQL Server via SQL Authentication');
    return pool;
  } catch (err) {
    console.error('❌ DB Connection Error:', err);
    return null;
  }
};

module.exports = { getPool };
