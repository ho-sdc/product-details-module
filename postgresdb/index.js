const { Pool } = require('pg');

const pgPool = new Pool();

module.exports.dbInitialize = async () => {
  console.log(process.env.PGPORT);
  console.log(process.env.PGDATABASE);
  console.log(process.env.PGUSER);
  console.log(process.env.PGHOST);
  console.log(process.env.PGPASSWORD);
  let client = await pgPool.connect();
  await client.query(
    `CREATE TABLE IF NOT EXISTS "products" (
      "productId"  SERIAL ,
      "name" VARCHAR(255),
      "images" VARCHAR(255)[],
      "sizes" JSON,
      "retailPrice" REAL,
      "salePrice" REAL,
      "reviewCount" REAL,
      "reviewRating" REAL,
      "tags" VARCHAR(255)[],
      "colors" VARCHAR(255)[],
      "heartToggle" BOOLEAN,
      PRIMARY KEY ("productId")
      )`
  );
  await client.query(
    `CREATE INDEX IF NOT EXISTS "products_name"
    ON "products" USING hash ("name")`
  );
  await client.query(
    `CREATE INDEX IF NOT EXISTS "products_productId"
    ON "products" USING hash ("productId")`
  );
  client.release();
};

module.exports.pgPool = pgPool;
