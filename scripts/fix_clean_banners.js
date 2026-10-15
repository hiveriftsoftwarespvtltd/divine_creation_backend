const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function fixHeroBanners() {
  const assetsDir = path.join(__dirname, '..', '..', 'divine_creation_frontend', 'src', 'assets');
  const uploadsDir = path.join(__dirname, '..', 'uploads');

  // 1. Copy clean filenames without spaces/parentheses
  const bannerMap = [
    { src: 'a (1).png', clean: 'banner_slide1.png' },
    { src: 'a (2).png', clean: 'banner_slide2.png' },
    { src: 'a (3).png', clean: 'banner_slide3.png' },
    { src: 'a (4).png', clean: 'banner_slide4.png' },
    { src: 'a (5).png', clean: 'banner_slide5.png' },
    { src: 'mobilehero.png', clean: 'banner_mobile.png' }
  ];

  for (const b of bannerMap) {
    const srcAsset = path.join(assetsDir, b.src);
    const destUpload = path.join(uploadsDir, b.clean);
    const destAsset = path.join(assetsDir, b.clean);

    if (fs.existsSync(srcAsset)) {
      fs.copyFileSync(srcAsset, destUpload);
      fs.copyFileSync(srcAsset, destAsset);
      console.log(`✓ Copied ${b.src} -> ${b.clean} in both assets & uploads`);
    } else {
      console.warn(`Source not found: ${srcAsset}`);
    }
  }

  // 2. Update Database Banners
  console.log('Connecting to MongoDB Atlas to update banners...');
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'divine_creations_db' });
  const db = mongoose.connection.db;

  await db.collection('banners').deleteMany({});

  const cleanBanners = [
    {
      title: "Corporate & Promotional Gift Items",
      subtitle: "Executive Gift Sets, Drinkware, Trophies & Customized Branding Solutions",
      image: "/uploads/banner_slide1.png",
      mobileImage: "/uploads/banner_mobile.png",
      link: "/collections",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Stainless Steel Drinkware & Vacuum Flasks",
      subtitle: "Thermal Insulated Flasks, Custom Laser Engraved Bottles & Water Jugs",
      image: "/uploads/banner_slide2.png",
      mobileImage: "/uploads/banner_mobile.png",
      link: "/collections?category=Drinkware",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Bespoke Custom Manufacturing",
      subtitle: "Laser Engraved Logos, Customized Packaging & Bulk Production Solutions",
      image: "/uploads/banner_slide3.png",
      mobileImage: "/uploads/banner_mobile.png",
      link: "/custom-order",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Executive Leatherette Gift Sets & Diaries",
      subtitle: "Custom Blind Debossing, Premium Notebooks, Pens & Wallet Combos",
      image: "/uploads/banner_slide4.png",
      mobileImage: "/uploads/banner_mobile.png",
      link: "/collections?category=Gift%20Sets",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Precision Trophies, Mementos & Desktop Art",
      subtitle: "Leadership Award Trophies, Wall Clocks & Customized Corporate Keepsakes",
      image: "/uploads/banner_slide5.png",
      mobileImage: "/uploads/banner_mobile.png",
      link: "/collections?category=Momentos",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  await db.collection('banners').insertMany(cleanBanners);
  console.log(`✓ Inserted ${cleanBanners.length} banners with clean filenames into DB.`);

  await mongoose.disconnect();
}

fixHeroBanners().catch(console.error);
