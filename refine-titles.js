const mongoose = require('mongoose');

const uri = "mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/indian_mart_backend?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const prods = await db.collection('products').find({}).toArray();
  for (const p of prods) {
    let t = (p.title || '')
      .replace(/bhuddha/gi, 'Executive')
      .replace(/buddha/gi, 'Executive')
      .replace(/statue/gi, 'Set')
      .replace(/god/gi, 'Gift')
      .replace(/animal/gi, 'Executive Box')
      .replace(/tree/gi, 'Desk Item');
    await db.collection('products').updateOne({ _id: p._id }, { $set: { title: t.trim() } });
  }
  console.log('Refined product titles successfully!');
  mongoose.disconnect();
}

run();
