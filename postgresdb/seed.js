const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();
dotenvExpand(myEnv);

const generateData = require('./generateData');
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const { pgPool } = require('./index');

const seed = async () => {
  let result = await pgPool.query(
    `SELECT * 
  FROM products 
  LIMIT 10`
  );
  if (result.rows.length === 0) {
    console.log('db empty beginning data generation');
    await generateData();
    console.log('data generated, beginning seeding');
    await pgPool.query(
      `COPY products("name","images","sizes","retailPrice","salePrice","reviewCount","reviewRating","tags","colors","heartToggle") FROM '${path.resolve(
        __dirname,
        './data.csv'
      )}' WITH (FORMAT csv);`
    );

    fs.unlink(path.resolve(__dirname, './data.csv'), () => {});
    console.log('seeding complete, deleting csv');
  }
};

seed();
