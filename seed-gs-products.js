const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'divine_creations_db';

const rawProductsData = [
  {
    "Product Title / Name": "GS 201",
    "Image Name": "GS_201.png",
    "Product Description": "This premium 2-piece corporate gift set features a stylish soft-touch notebook with geometric front slip pockets and a matching smooth writing metal pen. Ideal for employee welcome kits, business conferences, and client appreciation.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 202",
    "Image Name": "GS_202.png",
    "Product Description": "A rich red executive notebook paired with a matching red and gold-trimmed metal pen. Packed in a luxury presentation box, making it a perfect gift for festive corporate occasions, seminars, and promotional giveaways.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 203",
    "Image Name": "GS_203.png",
    "Product Description": "An elegant tan-brown notebook with a modern wave pattern accent, accompanied by a sleek metal ballpoint pen. Designed for corporate professionals who value sophistication and high quality.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 204",
    "Image Name": "GS_204.png",
    "Product Description": "A 2-piece combo featuring a premium A5 notebook with a textured geometric magnetic flap and a matching metal pen. Includes a portable gift box with carry handles for easy gifting.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 205",
    "Image Name": "GS_205.png",
    "Product Description": "Dual-tone navy blue and beige A5 notebook combo with a secure magnetic loop closure and a sleek metal pen. Comes in a window presentation box complete with carry straps.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 206",
    "Image Name": "GS_206.png",
    "Product Description": "Sophisticated black A5 leatherette notebook featuring a cross-buckle magnetic strap, paired with a metal pen in a window gift box with handles. Perfect for executive gifting.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 207",
    "Image Name": "GS_207.png",
    "Product Description": "Classy black A5 notebook with a metallic gold wave line pattern across the front cover, complete with a black and gold metal pen and a luxury window carry box.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 208",
    "Image Name": "GS_208.png",
    "Product Description": "A 2-piece executive combo including a textured brown notebook with a central accent loop and a matching metal pen in window presentation packaging.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 209",
    "Image Name": "GS_209.png",
    "Product Description": "Premium tan and dark brown dual-color A5 notebook paired with a metallic pen. Features a secure buckle closure and comes in a stylish handle packaging box.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 210",
    "Image Name": "GS_210.png",
    "Product Description": "Elegant deep blue notebook set with gold accent trims and a matching metal pen, packaged nicely in a portable carry box for business events and corporate distribution.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 211",
    "Image Name": "GS_211.png",
    "Product Description": "Compact A6 size pocket notebook and pen combo in royal blue and silver trim. Designed for professionals who prefer portable note-taking essentials.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A6 Size"
  },
  {
    "Product Title / Name": "GS 212",
    "Image Name": "GS_212.png",
    "Product Description": "Rich brown textured A6 compact notebook paired with a metallic pen. Packed in a neat presentation box ideal for corporate giveaways and event merchandise.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A6 Size"
  },
  {
    "Product Title / Name": "GS 213",
    "Image Name": "GS_213.png",
    "Product Description": "Grey textured fabric-finish A6 notebook with a sleek metal pen, presented in a black gift box. Perfect for everyday office use and client gifting.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A6 Size"
  },
  {
    "Product Title / Name": "GS 214",
    "Image Name": "GS_214.png",
    "Product Description": "Maroon and tan textured A6 pocket notebook paired with a gold-accented metal pen. High quality finish for employee welcome kits and corporate promotions.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Gift Sets Leather and Leatherite",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A6 Size"
  },
  {
    "Product Title / Name": "GS 301",
    "Image Name": "GS_301.png",
    "Product Description": "3-piece premium corporate gift set featuring a black magnetic closure notebook with geometric side pattern, a metal pen, and a matching metal keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 302",
    "Image Name": "GS_302.png",
    "Product Description": "3-piece tan brown gift set including a magnetic strap notebook, a metal ballpoint pen, and a durable metal leatherette keychain in a gift box.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 303",
    "Image Name": "GS_303.png",
    "Product Description": "3-piece set comprising a grey patterned flap notebook, a metal pen, and a matching keychain. Excellent for client appreciation and executive gifting.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 304",
    "Image Name": "GS_304.png",
    "Product Description": "3-piece combo featuring a soft-touch cover notebook with wave accent design, a smooth writing metal pen, and a stylish metal keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 305",
    "Image Name": "GS_305.png",
    "Product Description": "3-piece dark grey soft-touch notebook set with a wave pattern detail, metal pen, and durable leatherette metal keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 306",
    "Image Name": "GS_306.png",
    "Product Description": "Executive 3-piece gift set containing a textured card holder, a metal pen, and a heavy-duty metal keychain with clip detail.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 307",
    "Image Name": "GS_307.png",
    "Product Description": "3-piece office accessory gift set featuring a navy blue card holder, gold-trimmed metal pen, and a multi-function metal keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 308",
    "Image Name": "GS_308.png",
    "Product Description": "Maroon and tan 3-piece corporate gift set including a visiting card holder, a metal ballpoint pen, and a matching keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 309",
    "Image Name": "GS_309.png",
    "Product Description": "Grey textured 3-piece set with a stainless steel accent card holder, a metal pen, and a bottle opener clip keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 310",
    "Image Name": "GS_310.png",
    "Product Description": "Tan brown 3-piece combo featuring a wood-texture leatherette card holder, a metal pen with gold accents, and a matching keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 311",
    "Image Name": "GS_311.png",
    "Product Description": "Burgundy and silver 3-piece set consisting of a sleek card holder, a metal rollerball-style pen, and a stylish keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 312",
    "Image Name": "GS_312.png",
    "Product Description": "Black 3-piece corporate gift pack featuring a stainless steel edge card holder, metal pen, and matching keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 313",
    "Image Name": "GS_313.png",
    "Product Description": "Minimalist grey 3-piece corporate gift set with card holder, metal pen, and a clip keychain, neatly organized in a gift box.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "Standard size."
  },
  {
    "Product Title / Name": "GS 314",
    "Image Name": "GS_314.png",
    "Product Description": "3-piece executive combo including an A5 olive green notebook, a matching metal pen, and a temperature-display stainless steel vacuum flask bottle.",
    "Material & Quality Standard": "Grade 304 Stainless Steel & PU Leather",
    "Product Classification": "Drinkware & Vacuum Flask",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "500 ml / A5 Size"
  },
  {
    "Product Title / Name": "GS 315",
    "Image Name": "GS_315.png",
    "Product Description": "3-piece blue executive gift combo featuring an A5 blue leatherette notebook, a metal pen, and a matching insulated water bottle.",
    "Material & Quality Standard": "Grade 304 Stainless Steel & PU Leather",
    "Product Classification": "Drinkware & Vacuum Flask",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "500 ml / A5 Size"
  },
  {
    "Product Title / Name": "GS 316",
    "Image Name": "GS_316.png",
    "Product Description": "3-piece brown executive combo featuring an A5 brown magnetic notebook, a metal pen, and a double-wall stainless steel flask in a handle box.",
    "Material & Quality Standard": "Grade 304 Stainless Steel & PU Leather",
    "Product Classification": "Drinkware & Vacuum Flask",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "500 ml / A5 Size"
  },
  {
    "Product Title / Name": "GS 317",
    "Image Name": "GS_317.png",
    "Product Description": "3-piece black combo with an A5 buckle notebook, a metallic pen, and an insulated flask bottle presented in an executive window carry box.",
    "Material & Quality Standard": "Grade 304 Stainless Steel & PU Leather",
    "Product Classification": "Drinkware & Vacuum Flask",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "500 ml / A5 Size"
  },
  {
    "Product Title / Name": "GS 318",
    "Image Name": "GS_318.png",
    "Product Description": "3-piece eco-style gift combo featuring an A5 textured notebook, a wooden/bamboo accent metal pen, and a glass/insulated bottle with sleeve.",
    "Material & Quality Standard": "Teak Wood & Acrylic",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "500 ml / A5 Size"
  },
  {
    "Product Title / Name": "GS 401",
    "Image Name": "GS_401.png",
    "Product Description": "4-piece eco-friendly executive combo including an A5 notebook, bamboo metal pen, matching keychain, and a glass bottle with cork/fabric sleeve.",
    "Material & Quality Standard": "Teak Wood & Acrylic",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "500 ml / A5 Size"
  },
  {
    "Product Title / Name": "GS 402",
    "Image Name": "GS_402.png",
    "Product Description": "4-piece black executive combo with an A5 magnetic strap notebook, metal pen, metal keychain, and a matte black insulated flask bottle in a handle box.",
    "Material & Quality Standard": "Grade 304 Stainless Steel & PU Leather",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "500 ml / A5 Size"
  },
  {
    "Product Title / Name": "GS 403",
    "Image Name": "GS_403.png",
    "Product Description": "4-piece corporate onboarding gift set featuring an A5 black magnetic notebook, a metal pen, a card holder, and a metal keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 404",
    "Image Name": "GS_404.png",
    "Product Description": "4-piece executive set in blue featuring an A5 magnetic notebook, matching metal pen, card holder, and keychain packed in a presentation box.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 405",
    "Image Name": "GS_405.png",
    "Product Description": "4-piece tan brown gift set containing an A5 textured notebook, metal ballpoint pen, leatherette card holder, and matching keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 406",
    "Image Name": "GS_406.png",
    "Product Description": "4-piece executive combo in rich brown featuring a magnetic notebook, metal pen with gold accents, card holder, and key ring.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 407",
    "Image Name": "GS_407.png",
    "Product Description": "4-piece premium brown set with a printed motif flap notebook, metallic pen, card holder, and a gold-trimmed keychain in a presentation tray.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 408",
    "Image Name": "GS_408.png",
    "Product Description": "4-piece grey geometric pattern A5 notebook set with a matching metal pen, card holder, and heavy-duty clip keychain.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 409",
    "Image Name": "GS_409.png",
    "Product Description": "4-piece tan and brown geometric accent A5 notebook combo complete with a metal pen, card holder, and keychain in a window carry box.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 410",
    "Image Name": "GS_410.png",
    "Product Description": "4-piece maroon and tan A5 notebook set including a metal pen, leatherette card holder, and keychain packaged for corporate gifting.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 411",
    "Image Name": "GS_411.png",
    "Product Description": "4-piece blue geometric design A5 notebook gift box set featuring a metal pen, card holder, and matching key ring.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 412",
    "Image Name": "GS_412.png",
    "Product Description": "4-piece corporate gift set with an A5 diary, a smooth writing metal pen, card holder, and durable keychain in a luxury black box.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  },
  {
    "Product Title / Name": "GS 413",
    "Image Name": "GS_413.png",
    "Product Description": "4-piece executive corporate combo containing an A5 notebook, premium metal pen, leatherette card holder, and key ring in a display gift box.",
    "Material & Quality Standard": "PU Leather & Metal",
    "Product Classification": "Executive Corporate Gift",
    "Category": "Corporate Gift Set",
    "Custom Branding & Finish": "Logo printing/engraving available.",
    "Capacity / Sizes": "A5 Size"
  }
];

async function seedGS() {
  if (!MONGO_URI) {
    console.error('ERROR: MONGO_URI is missing in .env');
    process.exit(1);
  }

  console.log(`Connecting to MongoDB Atlas (DB: ${DB_NAME})...`);
  await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
  console.log('Connected to database successfully.');

  const db = mongoose.connection.db;
  const productsCollection = db.collection('products');
  const categoriesCollection = db.collection('categories');

  console.log(`\nProcessing ${rawProductsData.length} items from input list...`);

  let addedCount = 0;
  let skippedCount = 0;
  const categoriesSet = new Set();

  for (const item of rawProductsData) {
    const title = (item["Product Title / Name"] || '').trim();
    if (!title) {
      console.warn('Skipping item with empty title');
      continue;
    }

    const description = (item["Product Description"] || '').trim();
    const material = (item["Material & Quality Standard"] || 'PU Leather & Metal').trim();
    const type = (item["Product Classification"] || 'Executive Corporate Gift').trim();
    const category = (item["Category"] || 'Corporate Gift Set').trim();
    const finish = (item["Custom Branding & Finish"] || 'Logo printing/engraving available.').trim();
    const sizes = (item["Capacity / Sizes"] || 'Standard size.').trim();

    categoriesSet.add(category);

    // STRICT DUPLICATE CHECK: check if product with this title already exists (case-insensitive)
    const existing = await productsCollection.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') }
    });

    if (existing) {
      console.log(`[SKIP DUPLICATE] "${title}" already exists in database (ID: ${existing._id}). Skipping.`);
      skippedCount++;
    } else {
      // New product insertion (images skipped as requested by user)
      const doc = {
        title,
        description,
        material,
        type,
        category,
        finish,
        sizes,
        brand: 'Divine Creations',
        image: '',
        images: [],
        tags: [
          category.toLowerCase(),
          'corporate gift',
          title.toLowerCase()
        ],
        weatherproof: 'Quality Guaranteed',
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await productsCollection.insertOne(doc);
      console.log(`[ADDED] "${title}" inserted successfully (ID: ${result.insertedId}).`);
      addedCount++;
    }
  }

  // Ensure all categories exist in categories collection
  console.log(`\nChecking categories in 'categories' collection...`);
  let newCatsAdded = 0;
  for (const catName of categoriesSet) {
    const catExists = await categoriesCollection.findOne({
      name: { $regex: new RegExp(`^${catName}$`, 'i') }
    });

    if (!catExists) {
      await categoriesCollection.insertOne({
        name: catName,
        featured: false,
        image: '',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`+ Added new category: "${catName}"`);
      newCatsAdded++;
    } else {
      console.log(`✓ Category "${catName}" already exists.`);
    }
  }

  const finalProductCount = await productsCollection.countDocuments();

  console.log('\n========================================');
  console.log('SEEDING SUMMARY:');
  console.log(`Total Products Provided: ${rawProductsData.length}`);
  console.log(`New Products Inserted: ${addedCount}`);
  console.log(`Duplicate Products Skipped: ${skippedCount}`);
  console.log(`New Categories Added: ${newCatsAdded}`);
  console.log(`Total Products in Database now: ${finalProductCount}`);
  console.log('========================================\n');

  await mongoose.disconnect();
  console.log('MongoDB connection closed.');
  process.exit(0);
}

seedGS().catch(err => {
  console.error('Fatal Seeding Error:', err);
  process.exit(1);
});
