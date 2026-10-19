const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017/divine_creations_db?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority';

function clean(url) {
  if (typeof url !== 'string' || !url) return url;
  const match = url.match(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/uploads\/.*)$/i);
  if (match && match[3]) return match[3];
  return url;
}

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  // 1. Clean Banners
  const banners = await db.collection('banners').find({}).toArray();
  for (const b of banners) {
    const newImg = clean(b.image);
    const newMob = clean(b.mobileImage);
    if (newImg !== b.image || newMob !== b.mobileImage) {
      await db.collection('banners').updateOne(
        { _id: b._id },
        { $set: { image: newImg, mobileImage: newMob } }
      );
      console.log(`Cleaned banner: ${b.title} -> ${newImg}`);
    }
  }

  // 2. Clean Content
  const content = await db.collection('contents').findOne({});
  if (content && content.pageHeroes) {
    let modified = false;
    for (const [k, v] of Object.entries(content.pageHeroes)) {
      if (v.image) {
        const c = clean(v.image);
        if (c !== v.image) { v.image = c; modified = true; }
      }
      if (v.mobileImage) {
        const c = clean(v.mobileImage);
        if (c !== v.mobileImage) { v.mobileImage = c; modified = true; }
      }
    }
    if (modified) {
      await db.collection('contents').updateOne({ _id: content._id }, { $set: { pageHeroes: content.pageHeroes } });
      console.log('Cleaned content pageHeroes');
    }
  }

  // 3. Clean Products
  const prods = await db.collection('products').find({}).toArray();
  let prodCleaned = 0;
  for (const p of prods) {
    let newImg = clean(p.image);
    let newImgs = Array.isArray(p.images) ? p.images.map(clean) : [];
    if (newImg !== p.image || JSON.stringify(newImgs) !== JSON.stringify(p.images)) {
      await db.collection('products').updateOne({ _id: p._id }, { $set: { image: newImg, images: newImgs } });
      prodCleaned++;
    }
  }
  console.log(`Cleaned ${prodCleaned} products in MongoDB`);

  console.log('Database image normalization complete!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
