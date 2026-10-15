const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function analyze() {
  const uri = process.env.MONGO_URI;
  const conn = await mongoose.connect(uri);

  // 1. Check divine_creations_db
  const dbDivine = conn.connection.useDb('divine_creations_db');
  const catsDivine = await dbDivine.db.collection('categories').find({}).toArray();
  const prodsDivine = await dbDivine.db.collection('products').find({}).toArray();

  console.log(`=== divine_creations_db ===`);
  console.log(`Total Categories: ${catsDivine.length}`);
  console.log(`Category names:`, catsDivine.map(c => c.name));
  console.log(`Total Products: ${prodsDivine.length}`);

  // Product categories breakdown
  const catCountsDivine = {};
  prodsDivine.forEach(p => {
    const c = p.category || '(NO CATEGORY)';
    catCountsDivine[c] = (catCountsDivine[c] || 0) + 1;
  });
  console.log(`Product counts per category in divine_creations_db:`, catCountsDivine);

  // Check how many products match the categories in collection
  const catNamesSet = new Set(catsDivine.map(c => c.name.toLowerCase().trim()));
  const unmatchedProds = prodsDivine.filter(p => {
    const c = (p.category || '').toLowerCase().trim();
    return !catNamesSet.has(c);
  });
  console.log(`Products whose category does NOT match any category in categories collection: ${unmatchedProds.length}`);
  if (unmatchedProds.length > 0) {
    const unmatchedCats = [...new Set(unmatchedProds.map(p => p.category))];
    console.log(`Unmatched categories in products:`, unmatchedCats);
  }

  // 2. Check indian_mart_backend
  const dbIM = conn.connection.useDb('indian_mart_backend');
  const catsIM = await dbIM.db.collection('categories').find({}).toArray();
  const prodsIM = await dbIM.db.collection('products').find({}).toArray();
  console.log(`\n=== indian_mart_backend ===`);
  console.log(`Total Categories: ${catsIM.length}`);
  console.log(`Category names:`, catsIM.map(c => c.name));
  console.log(`Total Products: ${prodsIM.length}`);
  if (prodsIM.length > 0) {
    console.log(`Sample product in indian_mart_backend:`, prodsIM[0].title, '| Cat:', prodsIM[0].category);
  }

  await mongoose.disconnect();
}

analyze().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
