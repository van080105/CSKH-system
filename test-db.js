import { getPool } from "./src/config/db.js";

(async () => {
  const pool = await getPool();
  if (pool) {
    const result = await pool.request().query("SELECT name FROM sys.databases");
    console.log(result.recordset);
  }
})();
