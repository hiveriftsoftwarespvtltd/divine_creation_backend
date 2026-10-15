const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function checkImages() {
  const conn = await mongoose.connect(process.env.MONGO_URI, { dbName: 'divine_creations_db' });
  const prods = await conn.connection.db.collection('products').find({}).toArray();

  let imimgCount = 0;
  let uploadsCount = 0;
  let otherCount = 0;
  let emptyCount = 0;
  let missingUploadFiles = 0;

  const uploadsDir = path.join(__dirname, '..', 'uploads');

  prods.forEach(p => {
    const img = p.image || '';
    if (!img) emptyCount++;
    else if (img.includes('imimg.com')) imimgCount++;
    else if (img.includes('/uploads/')) {
      uploadsCount++;
      const filename = img.split('/uploads/')[1]?.split('?')[0];
      if (filename && !fs.existsSync(path.join(uploadsDir, filename))) {
        missingUploadFiles++;
      }
    }
    else otherCount++;
  });

  console.log(`Total products in divine_creations_db: ${prods.length}`);
  console.log(`- Images on imimg.com (IndiaMART CDN): ${imimgCount}`);
  console.log(`- Images using /uploads/: ${uploadsCount}`);
  console.log(`  └ Missing files in local uploads folder: ${missingUploadFiles}`);
  console.log(`- Other images: ${otherCount}`);
  console.log(`- Empty images: ${emptyCount}`);

  await mongoose.disconnect();
}

checkImages().catch(console.error);
