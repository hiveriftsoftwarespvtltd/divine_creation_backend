const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const CALENDARS_DATA = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'jalan_calendars_data.json'), 'utf8')
);

const CATEGORIES_TO_ENSURE = [
  'Jumbo Calendars',
  'Rainbow Golden Calendars',
  'Crystal Diamond Calendars',
  'Exclusive Calendars',
  'Leatherite Paper Calendars',
  'Art Paper Calendars',
  'Poly Foam Calendars'
];

async function seedJalanCalendars() {
  console.log('Connecting to MongoDB Atlas...');
  const conn = await mongoose.connect(process.env.MONGO_URI);
  const db = conn.connection.useDb('divine_creations_db');
  const prodsColl = db.db.collection('products');
  const catsColl = db.db.collection('categories');

  console.log(`\nUpserting ${CALENDARS_DATA.length} Jalan Diary Calendar products (zero duplicates guaranteed)...`);
  let inserted = 0;
  let updated = 0;

  for (let i = 0; i < CALENDARS_DATA.length; i++) {
    const item = CALENDARS_DATA[i];
    const { _id, createdAt, updatedAt, __v, ...docData } = item;

    // Zero-duplicate check: match by exact title OR brand + category + exact design tag
    const designTag = Array.isArray(docData.tags) ? docData.tags.find(t => /^\d+$/.test(t)) : null;
    const filter = {
      $or: [
        { title: docData.title },
        ...(designTag ? [{ brand: 'Jalan Diary', category: docData.category, tags: designTag }] : [])
      ]
    };

    const res = await prodsColl.updateOne(
      filter,
      {
        $set: {
          ...docData,
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    if (res.upsertedCount > 0) {
      inserted++;
      console.log(`  ✓ [${i + 1}/${CALENDARS_DATA.length}] Inserted: ${docData.title}`);
    } else {
      updated++;
      console.log(`  ✓ [${i + 1}/${CALENDARS_DATA.length}] Updated: ${docData.title}`);
    }
  }

  // Ensure all calendar categories exist in categories collection
  console.log('\nEnsuring calendar categories exist in database...');
  for (const catName of CATEGORIES_TO_ENSURE) {
    await catsColl.updateOne(
      { name: catName },
      {
        $set: {
          name: catName,
          image: 'https://placehold.co/500x500',
          featured: false,
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );
    console.log(`  ✓ Category confirmed: "${catName}"`);
  }

  // Final verification counts
  const totalProducts = await prodsColl.countDocuments({});
  const jalanCount = await prodsColl.countDocuments({ brand: 'Jalan Diary' });

  const breakdown = {};
  for (const catName of CATEGORIES_TO_ENSURE) {
    breakdown[catName] = await prodsColl.countDocuments({ category: catName });
  }

  console.log('\n========================================');
  console.log(`SUCCESS: Processed all ${CALENDARS_DATA.length} Jalan Diary Calendars.`);
  console.log(`Inserted: ${inserted}, Updated: ${updated}`);
  console.log(`Total 'Jalan Diary' products in DB: ${jalanCount}`);
  console.log(`Total products in entire database now: ${totalProducts}`);
  console.log('Category breakdown in DB:');
  for (const [cat, cnt] of Object.entries(breakdown)) {
    console.log(`  - ${cat}: ${cnt}`);
  }
  console.log('========================================');

  await mongoose.disconnect();
}

seedJalanCalendars().catch(err => {
  console.error('Fatal seeding error:', err);
  process.exit(1);
});
