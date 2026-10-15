const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const NESCAFE_PRODUCTS = [
  {
    code: "1a",
    title: "Nescafe 1dt. Sunday Separate Diary - Black Grey",
    category: "Diaries",
    brand: "Nescafe",
    description: "Black and grey B5 dated diary with a vertical 2027 panel. Item code: 1A. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Black / Grey",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "1a"],
    type: "Sunday Separate Diary",
    weatherproof: ""
  },
  {
    code: "1b",
    title: "Nescafe 1dt. Sunday Separate Diary - Grey",
    category: "Diaries",
    brand: "Nescafe",
    description: "Grey B5 dated diary with embossed 2027 design. Item code: 1B. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Grey",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "1b"],
    type: "Sunday Separate Diary",
    weatherproof: ""
  },
  {
    code: "1c",
    title: "Nescafe 1dt. Sunday Separate Diary - Blue Executive",
    category: "Diaries",
    brand: "Nescafe",
    description: "Blue B5 dated diary with geometric gold detailing and red centre label. Item code: 1C. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "1c"],
    type: "Sunday Separate Diary",
    weatherproof: ""
  },
  {
    code: "1d",
    title: "Nescafe 1dt. Sunday Separate Diary - Charcoal",
    category: "Diaries",
    brand: "Nescafe",
    description: "Charcoal grey B5 dated diary with a textured grid pattern and 2027 marking. Item code: 1D. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Charcoal Grey",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "1d"],
    type: "Sunday Separate Diary",
    weatherproof: ""
  },
  {
    code: "1e",
    title: "Nescafe 1dt. Sunday Separate Diary - Blue",
    category: "Diaries",
    brand: "Nescafe",
    description: "Blue B5 dated diary with a vertical 2027 strip. Item code: 1E. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "1e"],
    type: "Sunday Separate Diary",
    weatherproof: ""
  },
  {
    code: "1f",
    title: "Nescafe 1dt. Sunday Separate Diary - Blue Strap",
    category: "Diaries",
    brand: "Nescafe",
    description: "Blue textured B5 dated diary with a strap closure and 2027 badge. Item code: 1F. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "1f"],
    type: "Sunday Separate Diary",
    weatherproof: ""
  },
  {
    code: "2a",
    title: "Nescafe 1dt. Planner Diary (NS) - Brown Cream Strap",
    category: "Diaries",
    brand: "Nescafe",
    description: "Brown and cream B5 planner diary with a strap closure. Item code: 2A. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Brown / Cream",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm Natural Shade Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "2a"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "2b",
    title: "Nescafe 1dt. Planner Diary (NS) - Brown Patch",
    category: "Diaries",
    brand: "Nescafe",
    description: "Brown B5 planner diary with a contrasting light rectangular patch closure. Item code: 2B. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm Natural Shade Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "2b"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "2c",
    title: "Nescafe 1dt. Planner Diary (NS) - Ornamental Brown",
    category: "Diaries",
    brand: "Nescafe",
    description: "Brown and gold B5 planner diary with ornamental map and medallion artwork. Item code: 2C. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Brown / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm Natural Shade Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "2c"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "2d",
    title: "Nescafe 1dt. Planner Diary (NS) - Key to Success",
    category: "Diaries",
    brand: "Nescafe",
    description: "Brown and gold B5 planner diary featuring a business-themed Key to Success cover. Item code: 2D. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Brown / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm Natural Shade Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "2d"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "2e",
    title: "Nescafe 1dt. Planner Diary (NS) - Brown Buckle",
    category: "Diaries",
    brand: "Nescafe",
    description: "Brown textured B5 planner diary with a decorative buckle closure. Item code: 2E. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm Natural Shade Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "2e"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "2f",
    title: "Nescafe 1dt. Planner Diary (NS) - Reddish Brown Grid",
    category: "Diaries",
    brand: "Nescafe",
    description: "Reddish-brown B5 planner diary with a textured grid and 2027 marking. Item code: 2F. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Reddish Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm Natural Shade Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "2f"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "2g",
    title: "Nescafe 1dt. Planner Diary (NS) - Brown 2027",
    category: "Diaries",
    brand: "Nescafe",
    description: "Brown B5 planner diary with embossed 2027 lettering and horizontal lines. Item code: 2G. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm Natural Shade Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "2g"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "2h",
    title: "Nescafe 1dt. Planner Diary (NS) - Rust Strap",
    category: "Diaries",
    brand: "Nescafe",
    description: "Rust-brown textured B5 planner diary with a strap and 2027 badge. Item code: 2H. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Rust Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm Natural Shade Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "2h"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "3a",
    title: "Nescafe 1dt. Planner Diary (White) - Black",
    category: "Diaries",
    brand: "Nescafe",
    description: "Black B5 planner diary with a vertical 2027 panel and contrasting stitching. Item code: 3A. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Black",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "3a"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "3b",
    title: "Nescafe 1dt. Planner Diary (White) - Grey",
    category: "Diaries",
    brand: "Nescafe",
    description: "Grey B5 planner diary with a horizontal band and vertical 2027 panel. Item code: 3B. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Grey",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "3b"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "3c",
    title: "Nescafe 1dt. Planner Diary (White) - Geometric",
    category: "Diaries",
    brand: "Nescafe",
    description: "Cream B5 planner diary with geometric beige, burgundy, and blue diagonal bands. Item code: 3C. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Cream / Multicolor",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "3c"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "3d",
    title: "Nescafe 1dt. Planner Diary (White) - Ornamental",
    category: "Diaries",
    brand: "Nescafe",
    description: "Dark brown B5 planner diary with ornamental artwork, a compass motif, and green spine accents. Item code: 3D. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Dark Brown / Green",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "3d"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "3e",
    title: "Nescafe 1dt. Planner Diary (White) - Grey Buckle",
    category: "Diaries",
    brand: "Nescafe",
    description: "Grey textured B5 planner diary with a decorative buckle closure. Item code: 3E. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Grey",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "3e"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "3f",
    title: "Nescafe 1dt. Planner Diary (White) - Blue Patch",
    category: "Diaries",
    brand: "Nescafe",
    description: "Blue B5 planner diary with a contrasting light rectangular patch closure. Item code: 3F. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "3f"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "3g",
    title: "Nescafe 1dt. Planner Diary (White) - Blue Cream Strap",
    category: "Diaries",
    brand: "Nescafe",
    description: "Blue and cream B5 planner diary with a strap closure. Item code: 3G. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Blue / Cream",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "3g"],
    type: "Planner Diary",
    weatherproof: ""
  },
  {
    code: "3h",
    title: "Nescafe 1dt. Planner Diary (White) - Grey Blue Strap",
    category: "Diaries",
    brand: "Nescafe",
    description: "Grey and blue B5 planner diary with a strap closure and 2027 badge. Item code: 3H. B5 size (18.5 cm x 24.5 cm), one date per page in two colours, 12 monthly planners.",
    featured: false,
    finish: "Grey / Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "70 gsm White Sunshine Paper",
    sizes: "B5 (18.5 cm x 24.5 cm)",
    tags: ["diaries", "new year diaries", "2027", "nescafe", "3h"],
    type: "Planner Diary",
    weatherproof: ""
  }
];

async function seedNescafeDiaries() {
  console.log('Connecting to MongoDB Atlas...');
  const conn = await mongoose.connect(process.env.MONGO_URI);
  const db = conn.connection.useDb('divine_creations_db');
  const prodsColl = db.db.collection('products');
  const catsColl = db.db.collection('categories');

  console.log(`\nUpserting ${NESCAFE_PRODUCTS.length} Nescafe Diary products...`);
  let count = 0;
  for (const item of NESCAFE_PRODUCTS) {
    const { code, ...docData } = item;

    // Search by title or exact code in tags to guarantee no duplication
    const filter = {
      $or: [
        { title: docData.title },
        { tags: { $all: ['nescafe', code] } }
      ]
    };

    await prodsColl.updateOne(
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
    console.log(`  ✓ [${count}/${NESCAFE_PRODUCTS.length}] Upserted: ${docData.title} (Code: ${code.toUpperCase()})`);
  }

  // Ensure "Diaries" category exists and is featured
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

  console.log('\n========================================');
  console.log(`SUCCESS: Total ${count} Nescafe diary products seeded with ZERO duplicates.`);
  console.log('========================================');

  await mongoose.disconnect();
}

seedNescafeDiaries().catch(err => {
  console.error('Fatal seeding error:', err);
  process.exit(1);
});
