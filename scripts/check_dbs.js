const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function check() {
  const uri = process.env.MONGO_URI;
  console.log('Connecting to Mongo cluster...');
  const conn = await mongoose.connect(uri);
  const admin = conn.connection.db.admin();
  const dbs = await admin.listDatabases();
  console.log('Available Databases on cluster:');
  for (const dbInfo of dbs.databases) {
    const db = conn.connection.useDb(dbInfo.name);
    const collections = await db.db.listCollections().toArray();
    const collNames = collections.map(c => c.name);
    let prodCount = 0;
    if (collNames.includes('products')) {
      prodCount = await db.db.collection('products').countDocuments();
    }
    console.log(`- Database: ${dbInfo.name} | collections: [${collNames.join(', ')}] | products count: ${prodCount}`);
  }
  await mongoose.disconnect();
}
check().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
