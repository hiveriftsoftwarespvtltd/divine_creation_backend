const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'divine_creations_db';

async function seed() {
  if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in .env');
    process.exit(1);
  }

  console.log(`Connecting to MongoDB Atlas (DB: ${DB_NAME})...`);
  await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
  console.log('Connected to database successfully.');

  const db = mongoose.connection.db;
  const productsCollection = db.collection('products');
  const categoriesCollection = db.collection('categories');

  // Read data file
  const dataPath = path.join(__dirname, 'products-293-data.txt');
  const rawText = fs.readFileSync(dataPath, 'utf8');

  // Regex to split blocks by "===== PRODUCT X of 293 ====="
  const blocks = rawText.split(/=====\s*PRODUCT\s+\d+\s+of\s+293\s*=====/i).filter(b => b.trim().length > 0);
  console.log(`Found ${blocks.length} product blocks to process.`);

  let addedCount = 0;
  let updatedCount = 0;
  const uniqueCategories = new Set();

  for (const block of blocks) {
    const getField = (fieldRegex) => {
      const match = block.match(fieldRegex);
      return match ? match[1].trim() : '';
    };

    const title = getField(/Product Title \/ Name:\s*([^\r\n]+)/i);
    const description = getField(/Product Description:\s*([^\r\n]+)/i);
    const materialRaw = getField(/Material & Quality Standard:\s*([^\r\n]+)/i);
    const classification = getField(/Product Classification:\s*([^\r\n]+)/i);
    const brandingFinish = getField(/Custom Branding & Finish:\s*([^\r\n]+)/i);
    const sizesRaw = getField(/Capacity \/ Sizes:\s*([^\r\n]+)/i);
    const category = getField(/Category:\s*([^\r\n]+)/i);

    if (!title) {
      console.warn('Skipping block without title:', block.substring(0, 50));
      continue;
    }

    const material = materialRaw && materialRaw !== 'Not Specified' ? materialRaw : 'Customized';
    const type = classification && classification !== 'Not Specified' ? classification : 'Executive Corporate Gift';
    const finish = brandingFinish && brandingFinish !== 'Not Specified' ? brandingFinish : 'Customized';
    const sizes = sizesRaw && sizesRaw !== 'Not Specified' ? sizesRaw : 'Customized';
    const catName = category || 'Corporate Gifts';

    uniqueCategories.add(catName);

    const tags = [
      catName.toLowerCase(),
      'divine creations',
      'corporate gift'
    ];

    // Check if product already exists
    const existing = await productsCollection.findOne({ title });

    if (existing) {
      // Update missing fields without overwriting any existing images
      await productsCollection.updateOne(
        { _id: existing._id },
        {
          $set: {
            description: description || existing.description,
            material: material !== 'Customized' ? material : (existing.material || material),
            type: type !== 'Executive Corporate Gift' ? type : (existing.type || type),
            finish: finish !== 'Customized' ? finish : (existing.finish || finish),
            sizes: sizes !== 'Customized' ? sizes : (existing.sizes || sizes),
            category: catName,
            updatedAt: new Date()
          }
        }
      );
      updatedCount++;
    } else {
      // Insert new product
      await productsCollection.insertOne({
        title,
        description,
        material,
        type,
        finish,
        sizes,
        category: catName,
        brand: 'Divine Creations',
        image: '',
        images: [],
        tags,
        weatherproof: 'Quality Guaranteed',
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      addedCount++;
    }
  }

  // Ensure all categories exist in categories collection
  console.log(`Verifying categories (${uniqueCategories.size} distinct)...`);
  let newCatsAdded = 0;
  for (const cat of uniqueCategories) {
    const exists = await categoriesCollection.findOne({ name: { $regex: new RegExp(`^${cat.trim()}$`, 'i') } });
    if (!exists) {
      await categoriesCollection.insertOne({
        name: cat.trim(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      newCatsAdded++;
      console.log(`+ Added new category: "${cat.trim()}"`);
    }
  }

  const finalTotal = await productsCollection.countDocuments();

  console.log('\n========================================');
  console.log('SEEDING SUMMARY:');
  console.log(`Total Blocks Processed: ${blocks.length}`);
  console.log(`New Products Inserted: ${addedCount}`);
  console.log(`Existing Products Updated: ${updatedCount}`);
  console.log(`New Categories Created: ${newCatsAdded}`);
  console.log(`Total Products in Database now: ${finalTotal}`);
  console.log('========================================\n');

  await mongoose.disconnect();
  console.log('Disconnected cleanly.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
