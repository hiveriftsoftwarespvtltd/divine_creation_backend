const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const PRINTED_HARDCOVER_PRODUCTS = [
  {
    article: "v-336",
    title: "Printed Hard Cover Diary - Geometric Beige",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Beige hard-cover diary with geometric black, grey and tan cover panels. Article number: V-336.",
    featured: false,
    finish: "Beige / Grey / Black",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-336"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-337",
    title: "Printed Hard Cover Diary - Blue Geometric",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with blue geometric artwork and a blue spine. Article number: V-337.",
    featured: false,
    finish: "Cream / Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-337"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-340",
    title: "Printed Hard Cover Diary - Blue Feather",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with blue and gold feather artwork and a blue accent spine. Article number: V-340.",
    featured: false,
    finish: "Cream / Blue / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (245x180 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-340"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-343",
    title: "Printed Hard Cover Diary - Minimal Beige 2027",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Minimal beige diary with subtle gold 2027 artwork and beige spine. Article number: V-343.",
    featured: false,
    finish: "Beige",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-343"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-345",
    title: "Printed Hard Cover Diary - Abstract Brown",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with brown, black and gold abstract artwork across the top. Article number: V-345.",
    featured: false,
    finish: "Cream / Brown / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (245x180 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-345"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-347",
    title: "Printed Hard Cover Diary - Engineering World",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "White diary with engineering cityscape artwork and blue accents. Article number: V-347.",
    featured: false,
    finish: "White / Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-347"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-353",
    title: "Printed Hard Cover Diary - Circular Motif",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with brown circular ornamental artwork and rose-brown spine. Article number: V-353.",
    featured: false,
    finish: "Cream / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-353"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-354",
    title: "Printed Hard Cover Diary - Brown Patchwork",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Brown diary with patchwork-style decorative cover artwork. Article number: V-354.",
    featured: false,
    finish: "Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (245x180 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-354"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-358",
    title: "Printed Hard Cover Diary - Abstract Brown (Variant)",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with abstract brown, black and gold artwork across the top. Article number: V-358.",
    featured: false,
    finish: "Cream / Brown / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (245x180 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-358"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-359",
    title: "Printed Hard Cover Diary - Blue Feather (Variant)",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with blue and gold feather artwork and a blue accent spine. Article number: V-359.",
    featured: false,
    finish: "Cream / Blue / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (245x180 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-359"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-360",
    title: "Printed Hard Cover Diary - Botanical Beige",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with botanical-style panels and warm neutral accents. Article number: V-360.",
    featured: false,
    finish: "Cream / Beige",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x175 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-360"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-361",
    title: "Printed Hard Cover Diary - Blue Stripe",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with a blue vertical stripe and minimal typography. Article number: V-361.",
    featured: false,
    finish: "Cream / Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x175 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-361"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-363",
    title: "Printed Hard Cover Diary - Navy Decorative",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Navy blue diary with decorative circular motifs and blue-gold artwork. Article number: V-363.",
    featured: false,
    finish: "Navy / Blue / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (245x180 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-363"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-364",
    title: "Printed Hard Cover Diary - Grey Geometric",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Grey-beige diary with textured geometric panels and black accents. Article number: V-364.",
    featured: false,
    finish: "Grey / Beige / Black",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-364"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-365",
    title: "Printed Hard Cover Diary - Circular Motif (Variant)",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with brown circular ornamental artwork and rose-brown spine. Article number: V-365.",
    featured: false,
    finish: "Cream / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-365"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-366",
    title: "Printed Hard Cover Diary - Brown Patchwork (Variant)",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Brown diary with patchwork-style decorative cover artwork. Article number: V-366.",
    featured: false,
    finish: "Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x175 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-366"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-373",
    title: "Printed Hard Cover Diary - White Minimal",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "White diary with subtle circular line artwork and a dark green accent. Article number: V-373.",
    featured: false,
    finish: "White / Green",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-373"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-374",
    title: "Printed Hard Cover Diary - Minimal Beige 2027 (Variant)",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Minimal beige diary with subtle gold 2027 artwork and beige spine. Article number: V-374.",
    featured: false,
    finish: "Beige",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-374"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-375",
    title: "Printed Hard Cover Diary - Natural Wood Effect",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Light wood-effect diary with subtle gold geometric embossing. Article number: V-375.",
    featured: false,
    finish: "Natural Beige / Gold",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-375"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-376",
    title: "Printed Hard Cover Diary - Scenic Landscape",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with colorful landscape artwork and green and rust accents. Article number: V-376.",
    featured: false,
    finish: "Cream / Multicolor",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-376"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-377",
    title: "Printed Hard Cover Diary - Book Pattern",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Brown diary with a decorative book-pattern cover and central label. Article number: V-377.",
    featured: false,
    finish: "Brown / Tan",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-377"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-378",
    title: "Printed Hard Cover Diary - Blue Geometric (Variant)",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with blue geometric artwork and a blue spine. Article number: V-378.",
    featured: false,
    finish: "Cream / Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-378"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-379",
    title: "Printed Hard Cover Diary - 365 Days",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Tan diary with a 365-days motif and circular 2027 design. Article number: V-379.",
    featured: false,
    finish: "Tan / Beige",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-379"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-380",
    title: "Printed Hard Cover Diary - 2027 Numbers",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Taupe diary with embossed 2025, 2026 and 2027 numbers and a dark accent spine. Article number: V-380.",
    featured: false,
    finish: "Taupe / Grey",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-380"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-384",
    title: "Printed Hard Cover Diary - Doctor",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "White diary with a doctor-themed cover, medical icons and blue-green accents. Article number: V-384.",
    featured: false,
    finish: "White / Blue / Green",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-384"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-389",
    title: "Printed Hard Cover Diary - Engineering",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with an engineering-themed decorative illustration and brown accents. Article number: V-389.",
    featured: false,
    finish: "Cream / Brown",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-389"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-390",
    title: "Printed Hard Cover Diary - Engineering World (Variant)",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "White diary with engineering cityscape artwork and blue accents. Article number: V-390.",
    featured: false,
    finish: "White / Blue",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-390"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  },
  {
    article: "v-393",
    title: "Printed Hard Cover Diary - Knowledge",
    category: "Diaries",
    brand: "Printed Hard Cover Diaries",
    description: "Cream diary with a brown knowledge-themed panel and warm neutral geometric accents. Article number: V-393.",
    featured: false,
    finish: "Cream / Brown / Beige",
    image: "https://placehold.co/500x500",
    images: ["https://placehold.co/500x500"],
    material: "Premium Printed Cover",
    sizes: "Executive (210x145 mm)",
    tags: ["printed diaries", "hard cover diary", "2027 diary", "v-393"],
    type: "Printed Hard Cover Diaries",
    weatherproof: ""
  }
];

async function seedPrintedHardcoverDiaries() {
  console.log('Connecting to MongoDB Atlas...');
  const conn = await mongoose.connect(process.env.MONGO_URI);
  const db = conn.connection.useDb('divine_creations_db');
  const prodsColl = db.db.collection('products');
  const catsColl = db.db.collection('categories');

  console.log(`\nUpserting ${PRINTED_HARDCOVER_PRODUCTS.length} Printed Hard Cover Diary products...`);
  let count = 0;
  for (const item of PRINTED_HARDCOVER_PRODUCTS) {
    const { article, ...docData } = item;

    // Zero-duplicate guarantee:
    // Match by article code in tags or description regex
    const filter = {
      $or: [
        { tags: article.toLowerCase() },
        { description: new RegExp(`Article number:\\s*${article}`, 'i') }
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
    console.log(`  ✓ [${count}/${PRINTED_HARDCOVER_PRODUCTS.length}] ${status}: ${docData.title} (${article.toUpperCase()})`);
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
  console.log(`SUCCESS: All ${count} Printed Hard Cover Diaries seeded with ZERO duplicates.`);
  console.log(`Total Diary products in database now: ${totalDiaries}`);
  console.log(`========================================`);

  await mongoose.disconnect();
}

seedPrintedHardcoverDiaries().catch(err => {
  console.error('Fatal seeding error:', err);
  process.exit(1);
});
