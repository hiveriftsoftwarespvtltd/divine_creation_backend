const mongoose = require('mongoose');

const uri = "mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/indian_mart_backend?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority";

const newCategories = [
  "Corporate Gifts",
  "Drinkware & Vacuum Flasks",
  "Executive Gift Sets & Notebooks",
  "Award Trophies & Mementos",
  "Kitchenware & Dinner Sets",
  "Wall Clocks",
  "Bar Accessories",
  "Homeware & Lunch Boxes",
  "Photo Frames & Cherish Moments",
  "Desktop Collection",
  "Light & Sound Electronics",
  "Diaries & Organisers",
  "Pen Drives & Tech Accessories",
  "Custom Corporate Gifting",
  "Promotional Giveaways"
];

const categoryMap = {
  "Fiber Buddha Statue": "Drinkware & Vacuum Flasks",
  "Fiber Animal Statue": "Executive Gift Sets & Notebooks",
  "Artificial Tree For Event": "Promotional Giveaways",
  "Artificial Trees": "Custom Corporate Gifting",
  "FRP Sculpture Art": "Award Trophies & Mementos",
  "Fiber Glowing Statue": "Light & Sound Electronics",
  "Artificial Flowers Tree": "Homeware & Lunch Boxes",
  "Fiber God Statue": "Photo Frames & Cherish Moments",
  "Fiber Ashoka Pillar": "Desktop Collection",
  "FRP Cartoon Statue": "Pen Drives & Tech Accessories",
  "Fiber Bird Statue": "Bar Accessories",
  "Bhim Rao Ambedkar Statue": "Wall Clocks",
  "FRP Artificial Stone": "Kitchenware & Dinner Sets",
  "FRP Statue": "Corporate Gifts",
  "FRP Glowing Tree": "Diaries & Organisers",
  "Animal Statues": "Corporate Gifts"
};

async function run() {
  try {
    console.log("Connecting to MongoDB Atlas (indian_mart_backend)...");
    await mongoose.connect(uri);
    console.log("Connected successfully!");

    const db = mongoose.connection.db;

    // 1. Purge & Re-seed Categories Collection
    console.log("Purging existing categories collection...");
    await db.collection('categories').deleteMany({});
    
    console.log("Inserting new Corporate Gifting categories...");
    const categoryDocs = newCategories.map(name => ({
      name: name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await db.collection('categories').insertMany(categoryDocs);
    console.log(`Inserted ${categoryDocs.length} new categories successfully!`);

    // 2. Update Products Collection
    console.log("Updating products collection...");
    const products = await db.collection('products').find({}).toArray();
    console.log(`Found ${products.length} products to update.`);

    let updatedCount = 0;
    for (const prod of products) {
      let oldCat = prod.category || "FRP Statue";
      let newCat = categoryMap[oldCat] || "Corporate Gifts";

      let newTitle = prod.title || "Executive Corporate Gift Item";
      newTitle = newTitle
        .replace(/buddha/gi, "Executive Corporate")
        .replace(/statue/gi, "Gift Set")
        .replace(/fiber/gi, "Stainless Steel")
        .replace(/frp/gi, "Premium Custom")
        .replace(/sculpture/gi, "Trophy Memento")
        .replace(/tree/gi, "Desk Organizer")
        .replace(/animal/gi, "Leatherette Set")
        .replace(/ambedkar/gi, "Wall Clock")
        .replace(/cartoon/gi, "Tech Accessory")
        .replace(/stone/gi, "Dinner Set")
        .replace(/bird/gi, "Bar Accessory")
        .replace(/god/gi, "Photo Frame");

      let newDesc = (prod.description || "")
        .replace(/INDIAN DHAMMA ART/gi, "Divine Creations")
        .replace(/dhamma art/gi, "Divine Creations")
        .replace(/frp statue/gi, "Corporate Gift Item")
        .replace(/statue/gi, "Corporate Gift")
        .replace(/buddha/gi, "Executive");

      if (!newDesc.includes("Divine Creations")) {
        newDesc = `Premium Divine Creations Corporate Gifting Item. Precision laser engraved, custom branded, and packaged for executive distribution across India & globally.`;
      }

      await db.collection('products').updateOne(
        { _id: prod._id },
        {
          $set: {
            title: newTitle.trim(),
            category: newCat,
            brand: "Divine Creations",
            material: "Grade 304 Stainless Steel / Premium Leatherette",
            description: newDesc,
            finish: "Custom Laser Engraved & Metal Marked",
            updatedAt: new Date()
          }
        }
      );
      updatedCount++;
    }

    console.log(`Updated ${updatedCount} products in MongoDB database!`);

    // 3. Clean up Banners and Content if needed
    await db.collection('content').updateMany(
      {},
      {
        $set: {
          address: "Office: E-285, Terrace Floor, Naraina Vihar, New Delhi | Factory: S-46, Badli Industrial Estate, Delhi",
          storyTitle: "Leading Manufacturer of Corporate & Promotional Gift Items in New Delhi",
          storyText1: "Established in 2007, Divine Creations is a pioneer in corporate gifting, executive gift sets, vacuum flasks, and customized promotional products.",
          storyText2: "Equipped with state-of-the-art laser engraving, chemical etching, and metal marking machinery, we deliver unmatched craftsmanship.",
          updatedAt: new Date()
        }
      }
    );
    console.log("Updated content collection defaults.");

    console.log("Database transformation completed successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Database update error:", err);
    process.exit(1);
  }
}

run();
