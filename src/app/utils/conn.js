const { Pool } = require("pg");
const pool = new Pool({
  host: "postgresql",
  database: "hedwig",
  user: "root",
  password: "root",
  port: 5432,
});

export default function conn() {
  pool.connect((err) => {
    if (err) throw err;
  });
  return pool;
}
