import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true, 
  },
  authentication: {
    type: "ntlm",
    options: {
      domain: process.env.WINDOWS_DOMAIN,
      userName: process.env.WINDOWS_USER,
      password: process.env.WINDOWS_PASS || ""
    }
  }
};

export const getPool = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log(" Connected to SQL Server via Windows Authentication (NTLM)");
    return pool;
  } catch (err) {
    console.error(" DB Connection Error:", err);
  }
};
