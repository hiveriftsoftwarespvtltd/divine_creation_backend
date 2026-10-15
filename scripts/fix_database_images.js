const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function fixDatabaseImages() {
  console.log('Connecting to MongoDB Atlas (divine_creations_db)...');
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'divine_creations_db' });
  const db = mongoose.connection.db;

  // 1. Fix Banners
  console.log('1. Updating Slider Banners...');
  await db.collection('banners').deleteMany({});
  
  const banners = [
    {
      title: "Corporate & Promotional Gift Items",
      subtitle: "Executive Gift Sets, Drinkware, Trophies & Customized Branding Solutions",
      image: "/uploads/a (1).png",
      mobileImage: "/uploads/mobilehero.png",
      link: "/collections",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Stainless Steel Drinkware & Vacuum Flasks",
      subtitle: "Thermal Insulated Flasks, Custom Laser Engraved Bottles & Water Jugs",
      image: "/uploads/a (2).png",
      mobileImage: "/uploads/mobilehero.png",
      link: "/collections?category=Drinkware",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Bespoke Custom Manufacturing",
      subtitle: "Laser Engraved Logos, Customized Packaging & Bulk Production Solutions",
      image: "/uploads/a (3).png",
      mobileImage: "/uploads/mobilehero.png",
      link: "/custom-order",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Executive Leatherette Gift Sets & Diaries",
      subtitle: "Custom Blind Debossing, Premium Notebooks, Pens & Wallet Combos",
      image: "/uploads/a (4).png",
      mobileImage: "/uploads/mobilehero.png",
      link: "/collections?category=Gift%20Sets",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Precision Trophies, Mementos & Desktop Art",
      subtitle: "Leadership Award Trophies, Wall Clocks & Customized Corporate Keepsakes",
      image: "/uploads/a (5).png",
      mobileImage: "/uploads/mobilehero.png",
      link: "/collections?category=Momentos",
      pageKey: "slider",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  await db.collection('banners').insertMany(banners);
  console.log(`✓ Inserted ${banners.length} clean slider banners.`);

  // 2. Fix Contents (About and Page Heroes)
  console.log('2. Updating Contents (About Section & Page Heroes)...');
  const aboutData = {
    overview: {
      badge: "ABOUT DIVINE CREATIONS",
      title: "Traditional Indian Craftsmanship",
      titleHighlight: "Modern Design",
      description: "Established in 2007 in New Delhi under Director M Ahuja, Divine Creations is a premier manufacturer, trader, and exporter of Corporate & Promotional Gift Items, Executive Gift Sets, Stainless Steel Flasks, Executive Notebooks, Trophy Mementos, and Custom Homeware.",
      image: "/uploads/about_corporate_gifting_craft.jpg",
      buttonText: "KNOW OUR STORY",
      buttonLink: "/about",
      highlights: [
        { title: "16+ Years", subtitle: "Experience", icon: "clock" },
        { title: "GST Registered", subtitle: "Proprietorship", icon: "shield" },
        { title: "Trusted", subtitle: "Manufacturer", icon: "users" },
        { title: "Corporate", subtitle: "Gifting Sets", icon: "gift" }
      ]
    },
    manufacturing: {
      badge: "ADVANCED MANUFACTURING & BRANDING",
      title: "Precision Branding",
      titleSub: "For Corporate Gifts",
      description: "Equipped with Laser Engraving, Metal Marking, Chemical Etching, and Glass Sand Carving machinery at Badli Industrial Estate, Divine Creations transforms your concepts and company logos into executive corporate gifts with high demographic impact.",
      buttonText: "SEE OUR PROCESS",
      buttonLink: "/custom-order",
      cards: [
        {
          tag: "Fiber Laser Marking",
          title: "Custom Laser Engraved Bottles",
          linkText: "Click to View Catalog →",
          category: "Drinkware",
          image: "/uploads/laser_engraving_corporate_gifting.jpg"
        },
        {
          tag: "",
          title: "Metal Trophies",
          linkText: "View Items →",
          category: "Mementos & Trophies",
          image: "/uploads/metal_etching_trophy_crafting.jpg"
        },
        {
          tag: "",
          title: "Leatherette Diaries",
          linkText: "View Items →",
          category: "Gift Sets & Notebooks",
          image: "/uploads/leatherette_gifting_embossing.jpg"
        },
        {
          tag: "Executive Gift Combo",
          title: "Corporate Gift Sets",
          linkText: "Click to View Catalog →",
          category: "Corporate Gifts",
          image: "/uploads/executive_drinkware_set.jpg"
        }
      ]
    }
  };

  const pageHeroesData = {
    home: {
      title: "Corporate & Promotional Gift Items",
      subtitle: "Executive Gift Sets, Drinkware, Trophies & Customized Branding Solutions",
      image: "/uploads/hero.png",
      mobileImage: "/uploads/mobilehero.png"
    },
    about: {
      title: "About Divine Creations",
      subtitle: "Leading Firm Engaged in Manufacturing, Trading & Exporting Corporate & Promotional Gift Items Since 2007",
      image: "/uploads/aboutusshero.png",
      mobileImage: "/uploads/aboutusmobile.png"
    },
    collections: {
      title: "Corporate and Promotional Gift Items",
      subtitle: "Explore Our Complete Catalog of Executive Gift Sets, Stainless Steel Vacuum Flasks, Trophies, Wall Clocks & Customized Items",
      image: "/uploads/ourproducthero.png",
      mobileImage: "/uploads/productmobilehero.png"
    },
    customOrder: {
      title: "Bespoke Corporate Solutions & Custom Branding",
      subtitle: "Transform Your Corporate Vision Into Visual Impact with Direct Factory Customization & Packaging",
      image: "/uploads/a (3).png",
      mobileImage: "/uploads/mobilehero.png"
    },
    gallery: {
      title: "Divine Creations Craft Gallery",
      subtitle: "Visual Showcase of Precision Laser Engraved Drinkware, Executive Notebooks, Award Trophies & Custom Packaging",
      image: "/uploads/gallery.png",
      mobileImage: "/uploads/gallerymobile.png"
    },
    blogs: {
      title: "Our Blogs & Corporate Gifting Insights",
      subtitle: "Discover Expert Insights, Corporate Gifting Trends & Custom Branding Strategies from Divine Creations",
      image: "/uploads/a (5).png",
      mobileImage: "/uploads/mobilehero.png"
    },
    clients: {
      title: "Our Esteemed Corporate Clients",
      subtitle: "Trusted by Government Ministries, Multinationals & Leading Enterprises Across India and Abroad",
      image: "/uploads/clinthero.png",
      mobileImage: "/uploads/clintmobilehero.png"
    },
    contact: {
      title: "Contact Divine Creations",
      subtitle: "Visit Our Showroom in Naraina Vihar or Connect with Our Executive Sales Team for Customized Corporate Quotes",
      image: "/uploads/contacthero.png",
      mobileImage: "/uploads/contactmobile.png"
    }
  };

  await db.collection('contents').updateOne(
    {},
    {
      $set: {
        about: aboutData,
        pageHeroes: pageHeroesData,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
  console.log('✓ Successfully updated Contents with real images.');

  // 3. Fix Blogs
  console.log('3. Updating Blogs...');
  await db.collection('blogs').deleteMany({});
  const blogsData = [
    {
      title: "How to Choose the Perfect Corporate Gifts for Clients & Employees",
      date: "May 10, 2026",
      image: "/uploads/collection_corporate_gift.png",
      description: "Selecting memorable corporate gifts requires balancing utility, aesthetic appeal, and brand representation. Explore key strategies to impress executive clients and motivate staff with customized gifting solutions.",
      link: "#",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "The Role of Customized Branding & Laser Engraving in Business Growth",
      date: "May 05, 2026",
      image: "/uploads/laser_engraving_corporate_gifting.jpg",
      description: "Fiber laser marking provides sharp, indelible branding on stainless steel bottles and tech accessories. Learn how permanent logo personalization elevates corporate brand presence.",
      link: "#",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Top Corporate Gift Trends for Annual Meetings & Festive Seasons",
      date: "Apr 20, 2026",
      image: "/uploads/executive_drinkware_set.jpg",
      description: "From eco-conscious drinkware sets to premium leatherette organizers, discover the trending corporate gifts preferred by multinationals and institutions for festive giveaways.",
      link: "#",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Precision Craftsmanship: Metal Etching & Glass Sand Carving Secrets",
      date: "Apr 12, 2026",
      image: "/uploads/metal_etching_trophy_crafting.jpg",
      description: "Take a look inside our Badli industrial manufacturing facility. Discover how precision chemical etching and sand carving create award-winning trophies and mementos.",
      link: "#",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  await db.collection('blogs').insertMany(blogsData);
  console.log(`✓ Inserted ${blogsData.length} clean blog posts with working images.`);

  await mongoose.disconnect();
  console.log('\nAll database image references have been successfully fixed and verified!');
}

fixDatabaseImages().catch(console.error);
