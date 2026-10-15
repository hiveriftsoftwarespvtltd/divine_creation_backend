const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function inspectSections() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'divine_creations_db' });
  const db = mongoose.connection.db;

  console.log('=== 1. BANNERS ===');
  const banners = await db.collection('banners').find({}).toArray();
  banners.forEach((b, i) => {
    console.log(`Banner ${i+1}: title="${b.title}", image="${b.image}", mobileImage="${b.mobileImage}", pageKey="${b.pageKey}", active=${b.active}`);
  });

  console.log('\n=== 2. CONTENTS (ABOUT & HEROES) ===');
  const content = await db.collection('contents').findOne({});
  if (content) {
    console.log('content.about.overview.image:', content.about?.overview?.image);
    console.log('content.about.manufacturing.cards:');
    (content.about?.manufacturing?.cards || []).forEach((c, i) => {
      console.log(`  Card ${i}: title="${c.title}", image="${c.image}"`);
    });
    console.log('content.pageHeroes:', JSON.stringify(content.pageHeroes, null, 2));
  } else {
    console.log('No content document found!');
  }

  console.log('\n=== 3. BLOGS ===');
  const blogs = await db.collection('blogs').find({}).toArray();
  blogs.forEach((bl, i) => {
    console.log(`Blog ${i+1}: title="${bl.title}", image="${bl.image}"`);
  });

  await mongoose.disconnect();
}

inspectSections().catch(console.error);
