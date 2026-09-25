const mongoose = require('mongoose');

const uri = 'mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/divine_creations_db?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority';

function toRelativeUpload(url) {
  if (typeof url !== 'string' || !url) return url;
  const idx = url.indexOf('/uploads/');
  if (idx !== -1) {
    return url.substring(idx);
  }
  const altIdx = url.indexOf('uploads/');
  if (altIdx !== -1) {
    return '/' + url.substring(altIdx);
  }
  return url;
}

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const banners = await db.collection('banners').find({ active: true }).toArray();
  const content = await db.collection('contents').findOne({});

  if (!content) {
    console.log('No content document found');
    process.exit(1);
  }

  const pageHeroes = content.pageHeroes || {};

  banners.forEach((b) => {
    if (!b.pageKey || b.pageKey === 'slider') return;
    const key = b.pageKey;
    const img = toRelativeUpload(b.image);
    const mImg = toRelativeUpload(b.mobileImage);

    if (pageHeroes[key]) {
      pageHeroes[key].title = b.title || pageHeroes[key].title;
      pageHeroes[key].subtitle = b.subtitle || pageHeroes[key].subtitle;
      pageHeroes[key].image = img || pageHeroes[key].image;
      pageHeroes[key].mobileImage = mImg || pageHeroes[key].mobileImage;
    } else {
      pageHeroes[key] = {
        title: b.title || '',
        subtitle: b.subtitle || '',
        image: img || '',
        mobileImage: mImg || '',
      };
    }
  });

  const updateDoc = {
    $set: { pageHeroes: pageHeroes },
  };

  await db.collection('contents').updateOne({ _id: content._id }, updateDoc);
  console.log('Successfully synced normalized relative banners into content.pageHeroes!');

  const updated = await db.collection('contents').findOne({});
  console.log('Updated content.pageHeroes:');
  console.log(JSON.stringify(updated.pageHeroes, null, 2));

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
