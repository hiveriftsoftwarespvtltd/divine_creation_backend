const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function fixContentBlogs() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'divine_creations_db' });
  const db = mongoose.connection.db;

  const content = await db.collection('contents').findOne({});
  if (!content) {
    console.error('No contents doc found');
    process.exit(1);
  }

  const updatedBlogs = [
    {
      _id: "blog-1",
      id: "blog-1",
      title: "How to Choose the Perfect Corporate Gifts for Clients & Employees",
      date: "May 10, 2026",
      image: "/uploads/collection_corporate_gift.png",
      description: "Selecting memorable corporate gifts requires balancing utility, aesthetic appeal, and brand representation. Explore key strategies to impress executive clients and motivate staff with customized gifting solutions.",
      link: "#",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "blog-2",
      id: "blog-2",
      title: "The Role of Customized Branding & Laser Engraving in Business Growth",
      date: "May 05, 2026",
      image: "/uploads/laser_engraving_corporate_gifting.jpg",
      description: "Fiber laser marking provides sharp, indelible branding on stainless steel bottles and tech accessories. Learn how permanent logo personalization elevates corporate brand presence.",
      link: "#",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "blog-3",
      id: "blog-3",
      title: "Top Corporate Gift Trends for Annual Meetings & Festive Seasons",
      date: "Apr 20, 2026",
      image: "/uploads/executive_drinkware_set.jpg",
      description: "From eco-conscious drinkware sets to premium leatherette organizers, discover the trending corporate gifts preferred by multinationals and institutions for festive giveaways.",
      link: "#",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "blog-4",
      id: "blog-4",
      title: "Precision Craftsmanship: Metal Etching & Glass Sand Carving Secrets",
      date: "Apr 12, 2026",
      image: "/uploads/metal_etching_trophy_crafting.jpg",
      description: "Take a look inside our Badli industrial manufacturing facility. Discover how precision chemical etching and sand carving create award-winning trophies and mementos.",
      link: "#",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  await db.collection('contents').updateOne(
    { _id: content._id },
    { $set: { blogs: updatedBlogs, updatedAt: new Date() } }
  );

  console.log('✓ Successfully updated content.blogs in MongoDB Atlas!');

  await mongoose.disconnect();
}

fixContentBlogs().catch(console.error);
