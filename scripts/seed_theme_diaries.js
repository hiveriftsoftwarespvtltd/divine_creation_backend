const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const THEME_DIARIES = [
  {
    article: "v-671",
    title: "Simply More Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "White printed hard-cover theme diary with colourful Simply More lettering and a pink spine. Article number: V-671.",
    featured: false,
    finish: "White / Pink / Multicolor",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-671"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-672",
    title: "One Day at a Time Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Cream diary with teal spine and minimalist One Day at a Time design. Article number: V-672.",
    featured: false,
    finish: "Cream / Teal",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-672"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-681",
    title: "Think Within Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Sage green diary with red spine and bold Think Within design. Article number: V-681.",
    featured: false,
    finish: "Sage Green / Red",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-681"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-682",
    title: "The Key to Your Future Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Blue diary with red spine and motivational key-themed cover artwork. Article number: V-682.",
    featured: false,
    finish: "Blue / Red",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-682"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-691",
    title: "My Wonderful Family Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Beige diary with brown spine and family-themed world map artwork. Article number: V-691.",
    featured: false,
    finish: "Beige / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-691"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-692",
    title: "Beyond Growth Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "White diary with turquoise spine and circular growth-themed graphic. Article number: V-692.",
    featured: false,
    finish: "White / Turquoise",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-692"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-971",
    title: "Wellness Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Cream diary with brown spine and wellness-themed cover featuring a bird illustration. Article number: V-971.",
    featured: false,
    finish: "Cream / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-971"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-972",
    title: "Live Blessed Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Blush beige diary with brown spine and circular Live Blessed design. Article number: V-972.",
    featured: false,
    finish: "Blush Beige / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-972"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-973",
    title: "Zestful Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Peach beige diary with a multicolour celebratory cover design. Article number: V-973.",
    featured: false,
    finish: "Peach Beige / Multicolor",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-973"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-974",
    title: "Diary 2027 Theme - Bottle Artwork",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Cream diary with brown spine and decorative bottle illustrations. Article number: V-974.",
    featured: false,
    finish: "Cream / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-974"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-975",
    title: "Why Not You Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Cream diary with warm brown spine and inspirational illustrated cover artwork. Article number: V-975.",
    featured: false,
    finish: "Cream / Brown / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-975"],
    type: "Theme Diary",
    weatherproof: ""
  },
  {
    article: "v-976",
    title: "Slowly but Surely Theme Diary",
    category: "Diaries",
    brand: "Printed Hard Cover Theme Diaries",
    description: "Cream diary with orange spine and bird illustration with motivational text. Article number: V-976.",
    featured: false,
    finish: "Cream / Orange",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive",
    tags: ["theme diaries", "printed diary", "hard cover diary", "v-976"],
    type: "Theme Diary",
    weatherproof: ""
  }
];

async function seedThemeDiaries() {
  console.log('Connecting to MongoDB Atlas...');
  const conn = await mongoose.connect(process.env.MONGO_URI);
  const db = conn.connection.useDb('divine_creations_db');
  const prodsColl = db.db.collection('products');
  const catsColl = db.db.collection('categories');

  console.log(`\nUpserting ${THEME_DIARIES.length} Theme Diary products...`);
  let inserted = 0;
  let updated = 0;

  for (let i = 0; i < THEME_DIARIES.length; i++) {
    const item = THEME_DIARIES[i];
    const { article, ...docData } = item;

    // Zero-duplicate check: match by unique article in tags or description, or exact title
    const filter = {
      $or: [
        { tags: article.toLowerCase() },
        { description: new RegExp(`Article number:\\s*${article}`, 'i') },
        { title: docData.title }
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

    if (res.upsertedCount > 0) {
      inserted++;
      console.log(`  ✓ [${i + 1}/${THEME_DIARIES.length}] Inserted: ${docData.title} (${article.toUpperCase()})`);
    } else {
      updated++;
      console.log(`  ✓ [${i + 1}/${THEME_DIARIES.length}] Updated: ${docData.title} (${article.toUpperCase()})`);
    }
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

  console.log('\n========================================');
  console.log(`SUCCESS: Processed all ${THEME_DIARIES.length} Theme Diaries.`);
  console.log(`Inserted: ${inserted}, Updated: ${updated}`);
  console.log(`Total Diary products in database now: ${totalDiaries}`);
  console.log('========================================');

  await mongoose.disconnect();
}

seedThemeDiaries().catch(err => {
  console.error('Fatal seeding error:', err);
  process.exit(1);
});
