const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function checkSeeds() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'divine_creations_db' });
  const db = mongoose.connection.db;

  // 1. Check 293 data file
  const dataPath = path.join(__dirname, '..', 'products-293-data.txt');
  const rawText = fs.readFileSync(dataPath, 'utf8');
  const blocks = rawText.split(/=====\s*PRODUCT\s+\d+\s+of\s+293\s*=====/i).filter(b => b.trim().length > 0);

  let found293 = 0;
  let missing293 = 0;
  const missingTitles293 = [];

  for (const block of blocks) {
    const match = block.match(/Product Title \/ Name:\s*([^\r\n]+)/i);
    if (!match) continue;
    const title = match[1].trim();
    const exists = await db.collection('products').findOne({ title: title });
    if (exists) found293++;
    else {
      missing293++;
      if (missingTitles293.length < 5) missingTitles293.push(title);
    }
  }

  console.log(`293 Data: Found ${found293} in DB, Missing ${missing293} in DB.`);
  console.log('Sample missing 293:', missingTitles293);

  // 2. Check GS products
  const gsPath = path.join(__dirname, '..', 'seed-gs-products.js');
  if (fs.existsSync(gsPath)) {
    const gsContent = fs.readFileSync(gsPath, 'utf8');
    const gsTitles = [...gsContent.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
    let foundGs = 0;
    let missingGs = 0;
    for (const title of gsTitles) {
      const exists = await db.collection('products').findOne({ title });
      if (exists) foundGs++;
      else missingGs++;
    }
    console.log(`GS Products: Found ${foundGs} in DB, Missing ${missingGs} in DB.`);
  }

  await mongoose.disconnect();
}

checkSeeds().catch(console.error);
