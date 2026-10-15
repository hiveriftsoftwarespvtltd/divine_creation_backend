const mongoose = require('mongoose');
const path = require('path');
const https = require('https');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

function checkRemoteStatus(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ status: res.statusCode, headers: res.headers });
    }).on('error', (e) => resolve({ error: e.message }));
  });
}

async function testRemoteImages() {
  const conn = await mongoose.connect(process.env.MONGO_URI, { dbName: 'divine_creations_db' });
  const prods = await conn.connection.db.collection('products').find({ image: { $regex: '/uploads/' } }).limit(5).toArray();

  for (const p of prods) {
    const filename = p.image.split('/uploads/')[1]?.split('?')[0];
    const remoteUrl = `https://divinecreations.co.in/api/v1/uploads/${filename}`;
    const remoteApiUrl = `https://api.divinecreations.co.in/uploads/${filename}`;
    const res1 = await checkRemoteStatus(remoteUrl);
    const res2 = await checkRemoteStatus(remoteApiUrl);
    console.log(`Product: "${p.title}" | File: ${filename}`);
    console.log(`  divinecreations.co.in/api/v1/uploads: ${res1.status || res1.error}`);
    console.log(`  api.divinecreations.co.in/uploads: ${res2.status || res2.error}`);
  }

  await mongoose.disconnect();
}

testRemoteImages().catch(console.error);
