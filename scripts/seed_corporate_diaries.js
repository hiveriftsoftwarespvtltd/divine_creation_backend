const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const CORPORATE_DIARY_PRODUCTS = [
  {
    code: "2027001",
    title: "Chief Cut Size 1 Date Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Cream corporate diary with a botanical leaf design and green spine. Item No. 2027001. 344 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Green",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "Chief Cut Size (150x200 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027001"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027002",
    title: "Chief 1 Date Economy",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Cream diary with a modern abstract black, orange, and red geometric cover. Item No. 2027002. 320 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Multicolor",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 54 GSM Diary Paper",
    sizes: "Chief (142x220 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027002"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027003",
    title: "Chief 1 Date 5/P Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Corporate diary featuring a chess strategy image and leadership-themed cover. Item No. 2027003. 320 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "White / Burgundy",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "Chief (142x220 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027003"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027004",
    title: "A-5, 1 Date Natural Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Green and cream diary featuring a tree-lined path cover illustration. Item No. 2027004. 344 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Green / Cream",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "A5 (148x212 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027004"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027005",
    title: "A-5, 1 Date 5/P Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Blue and cream diary with compass artwork and planning-themed cover. Item No. 2027005. 344 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Blue / Cream",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "A5 (148x212 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027005"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027006",
    title: "A-5, 1 Date Engineering Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Engineering-themed diary with a blue cityscape, globe, and industrial imagery. Item No. 2027006. 392 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Blue / White",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "A5 (148x212 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027006"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027007",
    title: "A-5, 1 Date 5/P Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Tan diary featuring a windswept tree and resilience-themed cover. Item No. 2027007. 344 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Tan / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 80 GSM Diary Paper",
    sizes: "A5 (148x212 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027007"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027008",
    title: "A-5, 1 Date Multicolor Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Cream diary with green and tan botanical artwork and a green spine. Item No. 2027008. 400 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Green",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "A5 (148x212 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027008"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027009",
    title: "A-5, 1 Date Multicolor Nat. Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Cream diary with a world map illustration and muted green and tan shapes. Item No. 2027009. 400 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Green / Tan",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "A5 (148x212 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027009"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027010",
    title: "Nes. 2 Date Natural Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Cream diary with botanical leaves, warm-toned circles, and green spine. Item No. 2027010. 176 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Green / Orange",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 70 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027010"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027011",
    title: "Nes. 1 Date Economy Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Cream diary with a modern abstract black, orange, and red geometric cover. Item No. 2027011. 320 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Multicolor",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 54 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027011"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027012",
    title: "Nes. 1 Date 5/P Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Corporate diary featuring a chess strategy image and leadership-themed cover. Item No. 2027012. 320 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "White / Burgundy",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027012"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027013",
    title: "Nes. 1 Date Natural Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Cream diary featuring a series of earthy circular shapes and a tan spine. Item No. 2027013. 320 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027013"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027014",
    title: "Nes. 1 Date 5/P Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Blue and cream diary with compass artwork and planning-themed cover. Item No. 2027014. 344 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Blue / Cream",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027014"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027015",
    title: "Nes. 1 Date Natural Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Green and cream diary featuring a tree-lined path cover illustration. Item No. 2027015. 344 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Green / Cream",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027015"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027016",
    title: "Nes. 1 Date Doctor Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Doctor-themed diary with a stethoscope and medical illustration on a cream and navy cover. Item No. 2027016. 360 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Navy",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027016"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027017",
    title: "Nes. 1 Date Natural Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Tan diary featuring a windswept tree and resilience-themed cover. Item No. 2027017. 344 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Tan / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 70 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027017"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027018",
    title: "Nes. 1 Date Engineering Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Engineering-themed diary with a blue cityscape, globe, and industrial imagery. Item No. 2027018. 392 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Blue / White",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 70 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027018"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027019",
    title: "Nes. 1 Date Multicolor Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Cream diary with green and tan botanical artwork and a green spine. Item No. 2027019. 400 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Green",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027019"],
    type: "Hard Bound Diary",
    weatherproof: ""
  },
  {
    code: "2027020",
    title: "Nes. 1 Date Multicolor Nat. Diary",
    category: "Diaries",
    brand: "Corporate Diary",
    description: "Cream diary with a world map illustration and muted green and tan shapes. Item No. 2027020. 400 pages; perfect bound; 1 date diary with planner; two-colour inside printing.",
    featured: false,
    finish: "Cream / Green / Tan",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Hard Cover; 60 GSM Diary Paper",
    sizes: "B5 (183x245 mm)",
    tags: ["diaries", "2027 diary", "corporate diary", "2027020"],
    type: "Hard Bound Diary",
    weatherproof: ""
  }
];

async function seedCorporateDiaries() {
  console.log('Connecting to MongoDB Atlas...');
  const conn = await mongoose.connect(process.env.MONGO_URI);
  const db = conn.connection.useDb('divine_creations_db');
  const prodsColl = db.db.collection('products');
  const catsColl = db.db.collection('categories');

  console.log(`\nUpserting ${CORPORATE_DIARY_PRODUCTS.length} Corporate Diary products (2027001 - 2027020)...`);
  let count = 0;
  for (const item of CORPORATE_DIARY_PRODUCTS) {
    const { code, ...docData } = item;

    // Search by unique Item No code in tags or description
    const filter = {
      $or: [
        { tags: code },
        { description: new RegExp(`Item No\\.?\\s*${code}`, 'i') }
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
    count++;
    const status = res.upsertedCount > 0 ? 'Inserted' : 'Updated';
    console.log(`  ✓ [${count}/${CORPORATE_DIARY_PRODUCTS.length}] ${status}: ${docData.title} (Item No: ${code})`);
  }

  // Ensure "Diaries" category exists
  await catsColl.updateOne(
    { name: 'Diaries' },
    {
      $set: {
        name: 'Diaries',
        image: 'https://placehold.co/500x500',
        featured: true,
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    },
    { upsert: true }
  );
  console.log('✓ Category "Diaries" confirmed.');

  const totalDiaries = await prodsColl.countDocuments({
    $or: [
      { category: 'Diaries' },
      { tags: 'diaries' }
    ]
  });
  console.log(`\n========================================`);
  console.log(`SUCCESS: All ${count} Corporate Diaries seeded with ZERO duplicates.`);
  console.log(`Total Diary products in database now: ${totalDiaries}`);
  console.log(`========================================`);

  await mongoose.disconnect();
}

seedCorporateDiaries().catch(err => {
  console.error('Fatal seeding error:', err);
  process.exit(1);
});
