const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const DIARY_PRODUCTS = [
  {
    article: "e-121",
    title: "Blue Executive Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Dark blue executive diary with a gold circular emblem and textured cover. Article number: E-121.",
    featured: false,
    finish: "Blue / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-121"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-122",
    title: "Beige Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Beige eco diary featuring a brown geometric design and textured cover. Article number: E-122.",
    featured: false,
    finish: "Beige / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-122"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-131",
    title: "Grey Executive Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Grey and white executive diary with a central circular design and textured border. Article number: E-131.",
    featured: false,
    finish: "Grey / White",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-131"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-132",
    title: "Blue Artistic Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Blue diary featuring a colorful abstract artwork panel across the cover. Article number: E-132.",
    featured: false,
    finish: "Blue / Multicolour",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-132"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-133",
    title: "Beige Artistic Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Beige diary featuring an abstract blue, tan, and rust-colored cover design. Article number: E-133.",
    featured: false,
    finish: "Beige / Tan / Rust",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-133"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-134",
    title: "Landscape Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Cream diary featuring a stylized landscape illustration and multicolor accent stripes. Article number: E-134.",
    featured: false,
    finish: "Cream / Multicolour",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-134"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-151",
    title: "Blue Striped Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Light blue diary with striped texture and a brown accent panel. Article number: E-151.",
    featured: false,
    finish: "Light Blue / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-151"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-152",
    title: "Beige 365 Days Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Beige diary featuring a 365-day motif and brown circular cover artwork. Article number: E-152.",
    featured: false,
    finish: "Beige / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-152"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-153",
    title: "Blue Ocean Art Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Dark blue diary with vivid blue and gold ocean-inspired artwork. Article number: E-153.",
    featured: false,
    finish: "Dark Blue / Ocean Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-153"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-154",
    title: "Brown Ornamental Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Brown diary featuring ornate gold-toned decorative artwork. Article number: E-154.",
    featured: false,
    finish: "Brown / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-154"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-161",
    title: "White Minimal Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "White diary with a minimal design, rose-gold spine accent, and subtle numbering. Article number: E-161.",
    featured: false,
    finish: "White / Rose Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-161"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  },
  {
    article: "e-162",
    title: "Beige Red Accent Eco Diary",
    category: "Diaries",
    brand: "Divine Creations",
    description: "Beige diary featuring red circular artwork and a red spine accent. Article number: E-162.",
    featured: false,
    finish: "Beige / Red",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Textured Printed Cover",
    sizes: "Standard",
    tags: ["eco diaries", "diaries", "divine creations", "e-162"],
    type: "Diaries",
    weatherproof: "Quality Guaranteed"
  }
];

async function seedAllDiaries() {
  console.log('Connecting to MongoDB Atlas...');
  const conn = await mongoose.connect(process.env.MONGO_URI);
  const db = conn.connection.useDb('divine_creations_db');
  const prodsColl = db.db.collection('products');
  const catsColl = db.db.collection('categories');

  // Step 1: Clean up previous test entries with title "Eco Diary E-xxx" to prevent any duplicate
  const oldDeleteRes = await prodsColl.deleteMany({
    title: { $regex: /^Eco Diary E-/i }
  });
  console.log(`Cleaned up ${oldDeleteRes.deletedCount} old placeholder entries.`);

  // Step 2: Upsert each of the 12 products cleanly by article code & title
  console.log(`\nUpserting ${DIARY_PRODUCTS.length} Diary products...`);
  let count = 0;
  for (const item of DIARY_PRODUCTS) {
    const { article, ...docData } = item;

    // Search by title or exact article tag
    const filter = {
      $or: [
        { title: docData.title },
        { tags: article }
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
    console.log(`  ✓ [${count}/12] Upserted: ${docData.title} (${article.toUpperCase()})`);
  }

  // Step 3: Ensure "Diaries" category exists
  console.log('\nEnsuring "Diaries" category exists in categories collection...');
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
  console.log('✓ Category "Diaries" ready.');

  // Also keep "Eco Diaries" category pointing properly
  await catsColl.updateOne(
    { name: 'Eco Diaries' },
    {
      $set: {
        name: 'Eco Diaries',
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
  console.log('✓ Category "Eco Diaries" ready.');

  console.log('\n========================================');
  console.log(`SUCCESS: Total ${count} products seeded with ZERO duplicates.`);
  console.log('========================================');

  await mongoose.disconnect();
}

seedAllDiaries().catch(err => {
  console.error('Fatal seeding error:', err);
  process.exit(1);
});
