const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/divine_creations_db?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority';

// Mongoose Schemas
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  featured: { type: Boolean, default: false },
  image: { type: String, default: '' },
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  material: { type: String, default: 'Stainless Steel / Brass / Wood' },
  type: { type: String, default: 'Corporate Gifting' },
  image: { type: String, default: '' },
  images: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  category: { type: String, default: '' },
  finish: { type: String, default: 'Laser Engraved / Matte Polish' },
  sizes: { type: String, default: 'Standard Executive Size' },
  brand: { type: String, default: 'Divine Creations' },
  weatherproof: { type: String, default: 'Durability Guaranteed' },
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
const Product = mongoose.model('Product', ProductSchema);

const categoriesData = [
  { name: 'Drinkware', featured: true, image: '/src/assets/one1.png' },
  { name: 'Corporate Gifts', featured: true, image: '/src/assets/collection_corporate_gift.png' },
  { name: 'Gift Sets', featured: true, image: '/src/assets/expertise_corporate_gifts.png' },
  { name: 'Momentos', featured: true, image: '/src/assets/one17.png' },
  { name: 'Kitchenware', featured: true, image: '/src/assets/one3.png' },
  { name: 'Wall Clocks', featured: true, image: '/src/assets/one16.png' },
  { name: 'Bar Accessories', featured: true, image: '/src/assets/one14.png' },
  { name: 'Homeware', featured: true, image: '/src/assets/one8.png' },
  { name: 'Photo Frames', featured: true, image: '/src/assets/one10.png' },
  { name: 'Desktop Collection', featured: true, image: '/src/assets/one12.png' },
  { name: 'Light & Sound', featured: true, image: '/src/assets/one13.png' },
  { name: 'Cherish Moments', featured: true, image: '/src/assets/one19.png' },
  { name: 'Table Clocks', featured: false, image: '/src/assets/one16.png' },
  { name: 'Pen Stands', featured: false, image: '/src/assets/one12.png' },
  { name: 'Diwali Gifts', featured: false, image: '/src/assets/collection_corporate_gift.png' },
  { name: 'Pooja Thali & Diyas', featured: false, image: '/src/assets/collection_brass.png' },
  { name: 'Desktop Watches', featured: false, image: '/src/assets/one16.png' },
  { name: 'Organisers', featured: false, image: '/src/assets/one9.png' },
  { name: 'Luggage Tags', featured: false, image: '/src/assets/one6.png' },
  { name: 'Key Chains', featured: false, image: '/src/assets/one6.png' },
  { name: 'Religious Statues & Gifts', featured: false, image: '/src/assets/expertise_buddha_statues.png' },
  { name: 'File Folders', featured: false, image: '/src/assets/one9.png' },
  { name: 'Power Banks', featured: false, image: '/src/assets/one10.png' },
  { name: 'Paper Weights', featured: false, image: '/src/assets/one17.png' },
  { name: 'Pens', featured: false, image: '/src/assets/one6.png' },
  { name: 'Diaries & Telephone Diaries', featured: false, image: '/src/assets/one9.png' },
  { name: 'Car Windshield Sunshades', featured: false, image: '/src/assets/custom_design_banner_bg.png' },
  { name: 'Laptop Bags and Backpacks', featured: false, image: '/src/assets/one9.png' },
  { name: 'Promotional Items', featured: false, image: '/src/assets/collection_corporate_gift.png' },
];

const productsData = [
  // --- Drinkware ---
  {
    title: 'Omega Curved Bottle (600 ML)',
    category: 'Drinkware',
    description: 'Offering you a complete choice of products which include Omega Curved Bottle (600 ML), engineered with food-grade stainless steel for high durability and ergonomic grip.',
    material: 'Stainless Steel 304',
    type: 'Insulated Bottle',
    image: '/src/assets/one1.png',
    images: ['/src/assets/one1.png', '/src/assets/one2.png'],
    tags: ['Drinkware', 'Bottle', 'Corporate Gift', 'Stainless Steel'],
    finish: 'Brushed Steel / Laser Engraved Logo',
    sizes: '600 ML',
    brand: 'Divine Creations',
    weatherproof: 'Rust-Proof & Leak-Proof'
  },
  {
    title: 'Steel Flask with Cup (500 ML)',
    category: 'Drinkware',
    description: 'Double-walled vacuum insulated steel flask featuring a detachable serving cup lid. Keeps beverages hot or cold for up to 12 hours.',
    material: 'Stainless Steel',
    type: 'Vacuum Flask',
    image: '/src/assets/one2.png',
    images: ['/src/assets/one2.png'],
    tags: ['Drinkware', 'Flask', 'Executive Gift'],
    finish: 'Matte Finish with Chrome Lid',
    sizes: '500 ML',
    brand: 'Divine Creations',
    weatherproof: 'Thermal Insulated'
  },
  {
    title: 'Abstract Design Flask (480 ML)',
    category: 'Drinkware',
    description: 'Sleek designer flask with abstract laser texture. Ideal for modern executive corporate gifting.',
    material: 'Grade 304 Stainless Steel',
    type: 'Designer Flask',
    image: '/src/assets/one3.png',
    images: ['/src/assets/one3.png'],
    tags: ['Drinkware', 'Abstract', 'Custom Logo'],
    finish: 'Textured Matte Finish',
    sizes: '480 ML',
    brand: 'Divine Creations',
    weatherproof: 'Sweat-Proof Exterior'
  },
  {
    title: 'Penguin Flask (500 ML)',
    category: 'Drinkware',
    description: 'Modern ergonomically styled thermal flask with easy-pour spout and secure lock mechanism.',
    material: 'Food-Grade Stainless Steel',
    type: 'Thermal Flask',
    image: '/src/assets/one4.png',
    images: ['/src/assets/one4.png'],
    tags: ['Drinkware', 'Penguin Flask', 'Office Essential'],
    finish: 'Gloss Powder Coat',
    sizes: '500 ML',
    brand: 'Divine Creations',
    weatherproof: 'Leak-Proof Seal'
  },
  {
    title: 'Tea Flask with Strainer (400 ML)',
    category: 'Drinkware',
    description: 'Premium infuser flask equipped with a stainless steel tea strainer mesh for loose leaf tea and herbal infusions on the go.',
    material: '304 Stainless Steel & Glass Strainer',
    type: 'Infuser Flask',
    image: '/src/assets/one5.png',
    images: ['/src/assets/one5.png'],
    tags: ['Drinkware', 'Tea Infuser', 'Wellness Gift'],
    finish: 'Metallic Silver',
    sizes: '400 ML',
    brand: 'Divine Creations',
    weatherproof: 'Heat Resistant'
  },

  // --- Corporate Gifts ---
  {
    title: 'DC Corporate Gift Creation',
    category: 'Corporate Gifts',
    description: 'Deluxe executive gifting combo featuring custom branded vacuum flask, PU leather diary, and laser-engraved metal pen.',
    material: 'Stainless Steel & Leatherette',
    type: 'Executive Gift Set',
    image: '/src/assets/collection_corporate_gift.png',
    images: ['/src/assets/collection_corporate_gift.png', '/src/assets/expertise_corporate_gifts.png'],
    tags: ['Corporate Gifts', 'Gift Set', 'Custom Branding'],
    finish: 'Royale Matte Black & Gold Accent',
    sizes: 'Custom Box Packaging',
    brand: 'Divine Creations',
    weatherproof: 'Premium Gift Box Package'
  },
  {
    title: 'DC Corporate Gifting Collection',
    category: 'Corporate Gifts',
    description: 'Comprehensive corporate gift suite including metal card holder, executive pen, power bank, and flask.',
    material: 'Metal, Leatherette & Electronics',
    type: '3-in-1 Gift Suite',
    image: '/src/assets/expertise_corporate_gifts.png',
    images: ['/src/assets/expertise_corporate_gifts.png'],
    tags: ['Corporate Gifts', 'Executive Suite'],
    finish: 'Brushed Gunmetal',
    sizes: 'Standard Gift Box',
    brand: 'Divine Creations',
    weatherproof: 'Durable Construction'
  },
  {
    title: 'DC 2 in 1 Corporate Gift set',
    category: 'Corporate Gifts',
    description: 'Elegant dual gift set containing a premium leatherette visiting card holder and matching twist-action rollerball pen.',
    material: 'Leatherette & Stainless Steel',
    type: '2-in-1 Combo',
    image: '/src/assets/one6.png',
    images: ['/src/assets/one6.png'],
    tags: ['Corporate Gifts', '2 in 1', 'Card Holder'],
    finish: 'Textured Leather & Chrome',
    sizes: 'Compact Box',
    brand: 'Divine Creations',
    weatherproof: 'Tarnish-Resistant'
  },
  {
    title: 'Gift Set For Corporate',
    category: 'Corporate Gifts',
    description: 'Tailor-made appreciation box designed for annual corporate meetings, employee onboarding, and client rewards.',
    material: 'Wood, Metal & Leather',
    type: 'Onboarding Box',
    image: '/src/assets/one7.png',
    images: ['/src/assets/one7.png'],
    tags: ['Corporate Gifts', 'Employee Gifting'],
    finish: 'Laser Engraved Custom Branding',
    sizes: 'Multi-Item Presentation Box',
    brand: 'Divine Creations',
    weatherproof: 'High Durability'
  },
  {
    title: 'DC SS Flask bottle and Mug',
    category: 'Corporate Gifts',
    description: 'Matching corporate drinkware set including a 500ml stainless steel flask and a double-walled mug with lid.',
    material: 'Stainless Steel 304',
    type: 'Drinkware Gift Set',
    image: '/src/assets/one8.png',
    images: ['/src/assets/one8.png'],
    tags: ['Corporate Gifts', 'Mug & Flask'],
    finish: 'Satin Stainless Steel',
    sizes: '500 ML Flask + 350 ML Mug',
    brand: 'Divine Creations',
    weatherproof: 'Thermal Insulated'
  },

  // --- Gift Sets ---
  {
    title: 'DC Corporate Notebook for Gifting',
    category: 'Gift Sets',
    description: 'Handcrafted PU leather notebook diary with ribbon bookmark, card slots, pen holder loop, and magnetic closure.',
    material: 'PU Leather & 80 GSM Natural Shade Paper',
    type: 'Executive Journal',
    image: '/src/assets/one9.png',
    images: ['/src/assets/one9.png'],
    tags: ['Gift Sets', 'Notebook', 'Diary'],
    finish: 'Embossed Leather Texture',
    sizes: 'A5 Size (192 Pages)',
    brand: 'Divine Creations',
    weatherproof: 'Water-Resistant Cover'
  },
  {
    title: '4 in 1 Corporate Gifts',
    category: 'Gift Sets',
    description: 'Complete 4-piece corporate combo featuring a thermal temperature bottle, diary, keychain, and metal ballpoint pen.',
    material: 'Stainless Steel, PU Leather & Zinc Alloy',
    type: '4-in-1 Combo',
    image: '/src/assets/one10.png',
    images: ['/src/assets/one10.png'],
    tags: ['Gift Sets', '4 in 1', 'Temperature Bottle'],
    finish: 'Matte Black Edition',
    sizes: 'Presentation Box (32 x 24 cm)',
    brand: 'Divine Creations',
    weatherproof: 'Long Life'
  },
  {
    title: 'Eco Friendly Corporate Gifts',
    category: 'Gift Sets',
    description: 'Sustainable corporate gift set made from natural bamboo, cork, and recycled materials for eco-conscious brands.',
    material: 'Natural Bamboo & Cork',
    type: 'Eco-Friendly Set',
    image: '/src/assets/one11.png',
    images: ['/src/assets/one11.png'],
    tags: ['Gift Sets', 'Eco Friendly', 'Bamboo'],
    finish: 'Natural Wood Grain Finish',
    sizes: 'Eco Gift Box',
    brand: 'Divine Creations',
    weatherproof: '100% Biodegradable & Durable'
  },
  {
    title: 'DC 4 in 1 Corporate Gift set addition',
    category: 'Gift Sets',
    description: 'Luxury matte finish desk gift box with temperature display bottle, executive diary, metal pen, and card holder.',
    material: 'Premium Alloy & PU Leather',
    type: 'Executive Gift Box',
    image: '/src/assets/one12.png',
    images: ['/src/assets/one12.png'],
    tags: ['Gift Sets', 'Corporate Combo'],
    finish: 'Velvet Soft Touch Coating',
    sizes: 'Deluxe Gift Box',
    brand: 'Divine Creations',
    weatherproof: 'Premium Finish'
  },

  // --- Momentos ---
  {
    title: 'Trophy DC EX 99',
    category: 'Momentos',
    description: 'Exclusive crystal cut trophy mounted on a polished dark teakwood base. Perfect for corporate leadership awards.',
    material: 'K9 Optical Crystal & Solid Wood',
    type: 'Recognition Trophy',
    image: '/src/assets/one17.png',
    images: ['/src/assets/one17.png'],
    tags: ['Momentos', 'Trophy', 'Award'],
    finish: 'Precision Beveled Crystal',
    sizes: '10 Inches Height',
    brand: 'Divine Creations',
    weatherproof: 'Scratch Resistant Optical Glass'
  },
  {
    title: 'Trophy DXEX 108',
    category: 'Momentos',
    description: 'Gold plated crown & star emblem trophy designed for honoring milestone achievements and corporate excellence.',
    material: 'Brass Gold Plated & Marble Base',
    type: 'Award Trophy',
    image: '/src/assets/one18 (1).png',
    images: ['/src/assets/one18 (1).png'],
    tags: ['Momentos', 'Gold Award', 'Trophy'],
    finish: '24k Gold Electroplated',
    sizes: '12 Inches Height',
    brand: 'Divine Creations',
    weatherproof: 'Tarnish-Free Coating'
  },
  {
    title: 'Moments For Awards',
    category: 'Momentos',
    description: 'Sleek acrylic & brass cut corporate achievement award plaque with custom UV logo printing.',
    material: 'Cast Acrylic & Solid Brass',
    type: 'Memento Plaque',
    image: '/src/assets/one20.png',
    images: ['/src/assets/one20.png'],
    tags: ['Momentos', 'Plaque', 'Corporate Award'],
    finish: 'Clear Polish & Gold Foil Print',
    sizes: '8 x 10 Inches',
    brand: 'Divine Creations',
    weatherproof: 'UV Resistant'
  },

  // --- Kitchenware ---
  {
    title: '57 Pcs Stainless Steel Dinner Set',
    category: 'Kitchenware',
    description: 'Complete family dining set crafted from heavy gauge food-grade stainless steel with mirror polish finish.',
    material: 'Stainless Steel 202/304',
    type: 'Dinnerware Set',
    image: '/src/assets/one3.png',
    images: ['/src/assets/one3.png'],
    tags: ['Kitchenware', 'Dinner Set', 'Stainless Steel'],
    finish: 'High Gloss Mirror Polish',
    sizes: '57 Pieces Set',
    brand: 'Divine Creations',
    weatherproof: 'Dishwasher Safe & Rust Proof'
  },
  {
    title: 'D/w Candy Bowl Set of 3 Pcs. with Revolving Wooden Tray',
    category: 'Kitchenware',
    description: 'Luxury candy bowl set with 3 double-walled bowls, crystal clear acrylic lids, resting on a revolving teakwood tray.',
    material: 'Stainless Steel, Wood & Acrylic',
    type: 'Serving Bowls',
    image: '/src/assets/one15.png',
    images: ['/src/assets/one15.png'],
    tags: ['Kitchenware', 'Serving Bowls', 'Dry Fruit Box'],
    finish: 'Mirror Polish & Natural Wood',
    sizes: '3 Bowls + Revolving Tray',
    brand: 'Divine Creations',
    weatherproof: 'Food Grade Safe'
  },

  // --- Wall Clocks ---
  {
    title: 'Accent Wall Clock',
    category: 'Wall Clocks',
    description: 'Designer modern wall clock with silent sweep movement mechanism, bold numerals, and elegant slim rim.',
    material: 'ABS Rim & Glass Cover',
    type: 'Wall Clock',
    image: '/src/assets/one16.png',
    images: ['/src/assets/one16.png'],
    tags: ['Wall Clocks', 'Clock', 'Home Decor'],
    finish: 'Matte Rose Gold Rim',
    sizes: '12 Inches Diameter',
    brand: 'Divine Creations',
    weatherproof: 'Dust-Proof Glass Seal'
  },
  {
    title: 'Roman Through Cut Wall Clock 15"',
    category: 'Wall Clocks',
    description: 'Precision laser cutout Roman numeral wall clock crafted from high density engineered wood with metallic hands.',
    material: 'Engineered Wood / MDF',
    type: 'Laser Cut Clock',
    image: '/src/assets/one21.png',
    images: ['/src/assets/one21.png'],
    tags: ['Wall Clocks', 'Roman Clock', 'Laser Cut'],
    finish: 'Antique Walnut & Gold Hands',
    sizes: '15 Inches Diameter',
    brand: 'Divine Creations',
    weatherproof: 'Long Life Sweep Quartz'
  },

  // --- Bar Accessories ---
  {
    title: 'DC Corporate Gifting Sets New Addition',
    category: 'Bar Accessories',
    description: 'Executive bar tool set including cocktail shaker, double jigger, ice tong, strainer, and bottle opener.',
    material: 'Food-Grade Stainless Steel',
    type: 'Barware Set',
    image: '/src/assets/one14.png',
    images: ['/src/assets/one14.png'],
    tags: ['Bar Accessories', 'Cocktail Set', 'Executive Gift'],
    finish: 'Polished Stainless Steel / Black Matte',
    sizes: '5 Piece Set',
    brand: 'Divine Creations',
    weatherproof: 'Rust Free'
  },
  {
    title: 'Teak Wooden Decanter',
    category: 'Bar Accessories',
    description: 'Handcrafted teakwood alcohol decanter box with crystal glass carafe and matching whiskey glasses.',
    material: 'Natural Teakwood & Crystal Glass',
    type: 'Decanter Set',
    image: '/src/assets/one13.png',
    images: ['/src/assets/one13.png'],
    tags: ['Bar Accessories', 'Decanter', 'Whiskey Set'],
    finish: 'Natural Wood Grain Polish',
    sizes: '750 ML Decanter Box',
    brand: 'Divine Creations',
    weatherproof: 'Food Grade Safe Glass'
  },

  // --- Homeware ---
  {
    title: 'DOUBLE LUNCH BOX',
    category: 'Homeware',
    description: '2-tier thermal insulated stainless steel lunch box with leak-proof silicon sealing and folding side handles.',
    material: 'Food-Grade 304 Stainless Steel & PP Plastic',
    type: 'Tiffin Box',
    image: '/src/assets/one8.png',
    images: ['/src/assets/one8.png'],
    tags: ['Homeware', 'Lunch Box', 'Tiffin'],
    finish: 'Dual Tone Powder Coating',
    sizes: '2 Tiers (1200 ML Capacity)',
    brand: 'Divine Creations',
    weatherproof: '100% Leak-Proof & BPA Free'
  },
  {
    title: 'Two Layer Lunch Box',
    category: 'Homeware',
    description: 'Compact 2-layer stainless steel lunch box with clip-lock security. Perfect for office lunches.',
    material: 'Stainless Steel',
    type: 'Lunch Box',
    image: '/src/assets/one8.png',
    images: ['/src/assets/one8.png'],
    tags: ['Homeware', 'Lunch Box', 'Office'],
    finish: 'Polished Steel',
    sizes: '2 Layer (900 ML)',
    brand: 'Divine Creations',
    weatherproof: 'Dishwasher Safe'
  },
  {
    title: 'Three Layer Lunch Box',
    category: 'Homeware',
    description: '3-tier multi-compartment insulated stainless steel tiffin container with top carrying handle.',
    material: 'Stainless Steel 304',
    type: '3-Tier Tiffin',
    image: '/src/assets/one8.png',
    images: ['/src/assets/one8.png'],
    tags: ['Homeware', 'Lunch Box', 'Tiffin'],
    finish: 'Satin Finish',
    sizes: '3 Layers (1500 ML)',
    brand: 'Divine Creations',
    weatherproof: 'Thermal Retention'
  },

  // --- Photo Frames ---
  {
    title: 'Photo Frame Classic',
    category: 'Photo Frames',
    description: 'Classic handcrafted wooden desktop photo frame for displaying cherished corporate memories.',
    material: 'Rosewood & Glass',
    type: 'Desktop Frame',
    image: '/src/assets/one10.png',
    images: ['/src/assets/one10.png'],
    tags: ['Photo Frames', 'Desk Decor', 'Wood Frame'],
    finish: 'Natural Polish',
    sizes: '5 x 7 Inches',
    brand: 'Divine Creations',
    weatherproof: 'Dust Protection Glass'
  },
  {
    title: 'Photo Frame Wooden Elite',
    category: 'Photo Frames',
    description: 'Premium carved teakwood picture frame with easel stand and wall mounting hooks.',
    material: 'Solid Teakwood',
    type: 'Picture Frame',
    image: '/src/assets/one10.png',
    images: ['/src/assets/one10.png'],
    tags: ['Photo Frames', 'Teakwood'],
    finish: 'Mahogany Polish',
    sizes: '6 x 8 Inches',
    brand: 'Divine Creations',
    weatherproof: 'Varnish Sealed'
  },

  // --- Desktop Collection ---
  {
    title: 'Desktop Clock with Digital Calculator',
    category: 'Desktop Collection',
    description: 'Multifunctional office desk organizer incorporating a digital quartz clock, calendar, and solar calculator.',
    material: 'ABS Plastic & Alloy',
    type: 'Desk Calculator Clock',
    image: '/src/assets/one12.png',
    images: ['/src/assets/one12.png'],
    tags: ['Desktop Collection', 'Desk Clock', 'Calculator'],
    finish: 'Matte Black & Silver Accent',
    sizes: 'Standard Desk Size',
    brand: 'Divine Creations',
    weatherproof: 'Battery Operated'
  },
  {
    title: 'Metal Ganesh Clock',
    category: 'Desktop Collection',
    description: 'Auspicious antique brass Lord Ganesha sculpture with integrated analog desk clock.',
    material: 'Brass Electroplated Alloy',
    type: 'Spiritual Desk Clock',
    image: '/src/assets/one12.png',
    images: ['/src/assets/one12.png'],
    tags: ['Desktop Collection', 'Ganesh Clock', 'Spiritual Gift'],
    finish: 'Antique Gold Polish',
    sizes: '6 Inches Height',
    brand: 'Divine Creations',
    weatherproof: 'Tarnish Resistant'
  },

  // --- Light & Sound ---
  {
    title: 'Karaoke Set',
    category: 'Light & Sound',
    description: 'Portable wireless Bluetooth speaker equipped with dual rechargeable karaoke microphones and RGB ambient lighting.',
    material: 'ABS Plastic & Metal Mesh',
    type: 'Wireless Karaoke System',
    image: '/src/assets/one13.png',
    images: ['/src/assets/one13.png'],
    tags: ['Light & Sound', 'Karaoke', 'Bluetooth Speaker'],
    finish: 'Matte Finish with LED Lights',
    sizes: 'Compact Portable Speaker',
    brand: 'Divine Creations',
    weatherproof: 'Rechargeable Battery'
  },
  {
    title: 'Bluetooth Headphone',
    category: 'Light & Sound',
    description: 'High-definition wireless over-ear headphones with deep bass response, soft memory foam ear cushions, and 20h playback.',
    material: 'Alloy & Synthetic Leather',
    type: 'Wireless Headphone',
    image: '/src/assets/one13.png',
    images: ['/src/assets/one13.png'],
    tags: ['Light & Sound', 'Headphones', 'Audio'],
    finish: 'Matte Black Edition',
    sizes: 'Adjustable Headband',
    brand: 'Divine Creations',
    weatherproof: 'Sweat Resistant'
  },

  // --- Cherish Moments ---
  {
    title: 'Wooden Golf Set',
    category: 'Cherish Moments',
    description: 'Executive indoor putting golf set housed in a handcrafted rosewood briefcase. Includes brass putter, golf balls, and hole target.',
    material: 'Rosewood, Brass & Rubber',
    type: 'Executive Golf Kit',
    image: '/src/assets/one19.png',
    images: ['/src/assets/one19.png'],
    tags: ['Cherish Moments', 'Golf Set', 'Executive Leisure'],
    finish: 'High Gloss Mahogany Polish',
    sizes: 'Briefcase Box Set',
    brand: 'Divine Creations',
    weatherproof: 'Luxury Gift Box'
  },
  {
    title: 'Stainless Steel Hip Flask 7oz',
    category: 'Cherish Moments',
    description: 'Classic 7oz food-grade stainless steel liquor hip flask with captive screw cap.',
    material: 'Stainless Steel 304',
    type: 'Hip Flask',
    image: '/src/assets/one19.png',
    images: ['/src/assets/one19.png'],
    tags: ['Cherish Moments', 'Hip Flask', 'Stainless Steel'],
    finish: 'Brushed Satin Steel',
    sizes: '7 oz (200 ML)',
    brand: 'Divine Creations',
    weatherproof: 'Leak-Proof Cap'
  },

  // --- Table Clocks ---
  {
    title: 'Executive Metal Table Clock',
    category: 'Table Clocks',
    description: 'Premium brushed aluminum alloy tabletop clock with silent quartz movement mechanism.',
    material: 'Aluminum & Glass',
    type: 'Table Clock',
    image: '/src/assets/one16.png',
    images: ['/src/assets/one16.png'],
    tags: ['Table Clocks', 'Desk Clock'],
    finish: 'Brushed Silver',
    sizes: '6 x 6 Inches',
    brand: 'Divine Creations',
    weatherproof: 'Indoor Decor'
  },

  // --- Pen Stands ---
  {
    title: 'Wooden Pen Stand with Clock',
    category: 'Pen Stands',
    description: 'Handcrafted teakwood multi-compartment desktop pen stand integrated with analog quartz clock.',
    material: 'Teakwood & Metal',
    type: 'Pen Holder Clock',
    image: '/src/assets/one12.png',
    images: ['/src/assets/one12.png'],
    tags: ['Pen Stands', 'Desk Organizer'],
    finish: 'Mahogany Polish',
    sizes: '8 x 4 Inches',
    brand: 'Divine Creations',
    weatherproof: 'Durable Solid Wood'
  },

  // --- Diwali Gifts ---
  {
    title: 'Diwali Gift Hamper',
    category: 'Diwali Gifts',
    description: 'Festive executive corporate hamper containing brass diyas, dry fruit containers, and custom greeting card.',
    material: 'Brass & MDF Box',
    type: 'Festive Hamper',
    image: '/src/assets/collection_corporate_gift.png',
    images: ['/src/assets/collection_corporate_gift.png'],
    tags: ['Diwali Gifts', 'Festive Gifting'],
    finish: 'Royal Gold Box',
    sizes: 'Custom Hamper Packaging',
    brand: 'Divine Creations',
    weatherproof: 'Festive Special Edition'
  },

  // --- Pooja Thali & Diyas ---
  {
    title: 'Handcrafted Brass Pooja Thali Set',
    category: 'Pooja Thali & Diyas',
    description: '7-piece engraved solid brass pooja thali set including diya, agarbatti holder, and bell.',
    material: 'Pure Solid Brass',
    type: 'Pooja Set',
    image: '/src/assets/collection_brass.png',
    images: ['/src/assets/collection_brass.png'],
    tags: ['Pooja Thali & Diyas', 'Brass Pooja Set'],
    finish: 'Glossy Gold Polish',
    sizes: '11 Inches Thali',
    brand: 'Divine Creations',
    weatherproof: 'Tarnish-Resistant Coating'
  },

  // --- Desktop Watches ---
  {
    title: 'Analog Desktop Watch',
    category: 'Desktop Watches',
    description: 'Miniature chrome desk watch with Roman numeral dial and velvet weighted base.',
    material: 'Chrome Plated Alloy',
    type: 'Desk Watch',
    image: '/src/assets/one16.png',
    images: ['/src/assets/one16.png'],
    tags: ['Desktop Watches', 'Watch'],
    finish: 'High Gloss Chrome',
    sizes: '3 Inches Dial',
    brand: 'Divine Creations',
    weatherproof: 'Precision Movement'
  },

  // --- Organisers ---
  {
    title: 'Executive Leatherette Portfolio Organiser',
    category: 'Organisers',
    description: 'Zippered A4 business folder organiser with calculator, notepad, card slots, and tablet sleeve.',
    material: 'PU Leatherette',
    type: 'Business Portfolio',
    image: '/src/assets/one9.png',
    images: ['/src/assets/one9.png'],
    tags: ['Organisers', 'Portfolio', 'Folder'],
    finish: 'Stitched Leather Casing',
    sizes: 'A4 Size',
    brand: 'Divine Creations',
    weatherproof: 'Zipper Lock'
  },

  // --- Luggage Tags ---
  {
    title: 'Premium Leather Luggage Tag',
    category: 'Luggage Tags',
    description: 'Durable genuine leather travel luggage ID tag with privacy flap and stainless steel strap buckle.',
    material: 'Leather & Steel',
    type: 'Travel ID Tag',
    image: '/src/assets/one6.png',
    images: ['/src/assets/one6.png'],
    tags: ['Luggage Tags', 'Travel Accessories'],
    finish: 'Embossed Leather Logo',
    sizes: '4.5 x 2.5 Inches',
    brand: 'Divine Creations',
    weatherproof: 'Water-Resistant Strap'
  },

  // --- Key Chains ---
  {
    title: 'Laser Engraved Metal Keychain',
    category: 'Key Chains',
    description: 'Heavy duty zinc alloy key chain featuring dual key rings and custom precision laser brand logo.',
    material: 'Zinc Alloy & Leatherette',
    type: 'Metal Keychain',
    image: '/src/assets/one6.png',
    images: ['/src/assets/one6.png'],
    tags: ['Key Chains', 'Corporate Keychain'],
    finish: 'Gunmetal Polish',
    sizes: 'Standard Key Ring Size',
    brand: 'Divine Creations',
    weatherproof: 'Scratch-Proof Alloy'
  },

  // --- Religious Statues & Gifts ---
  {
    title: 'Handcrafted Brass Buddha Statue',
    category: 'Religious Statues & Gifts',
    description: 'Exquisite handcrafted meditating Buddha idol sculpted in solid brass with antique bronze patina.',
    material: 'Solid Brass',
    type: 'Spiritual Sculpture',
    image: '/src/assets/expertise_buddha_statues.png',
    images: ['/src/assets/expertise_buddha_statues.png'],
    tags: ['Religious Statues & Gifts', 'Buddha Statue', 'Spiritual'],
    finish: 'Antique Bronze Patina',
    sizes: '12 Inches Height',
    brand: 'Divine Creations',
    weatherproof: 'UV & Weather Resistant'
  },

  // --- File Folders ---
  {
    title: 'Executive Leatherette Certificate Folder',
    category: 'File Folders',
    description: 'A4 size dual pocket presentation folder crafted for corporate conferences and certificate distribution.',
    material: 'PU Leatherette',
    type: 'Certificate Folder',
    image: '/src/assets/one9.png',
    images: ['/src/assets/one9.png'],
    tags: ['File Folders', 'Conference Folder'],
    finish: 'Gold Foil Embossed Header',
    sizes: 'A4 Size',
    brand: 'Divine Creations',
    weatherproof: 'Durable Cover'
  },

  // --- Power Banks ---
  {
    title: '10000mAh Ultra Slim Power Bank',
    category: 'Power Banks',
    description: 'Ultra slim aluminum alloy portable power bank with dual USB ports and LED power indicator.',
    material: 'Aluminum & Lithium Polymer',
    type: 'Portable Charger',
    image: '/src/assets/one10.png',
    images: ['/src/assets/one10.png'],
    tags: ['Power Banks', 'Electronics'],
    finish: 'Matte Metallic Finish',
    sizes: '10000 mAh Capacity',
    brand: 'Divine Creations',
    weatherproof: 'Overcharge Protection'
  },

  // --- Paper Weights ---
  {
    title: 'Crystal Cut Glass Paper Weight',
    category: 'Paper Weights',
    description: 'Multifaceted optical glass dome paperweight for luxury executive desks.',
    material: 'K9 Optical Crystal',
    type: 'Desk Paperweight',
    image: '/src/assets/one17.png',
    images: ['/src/assets/one17.png'],
    tags: ['Paper Weights', 'Crystal Glass'],
    finish: 'Clear Polish Cut',
    sizes: '3 Inches Diameter',
    brand: 'Divine Creations',
    weatherproof: 'High Clarity Optical Glass'
  },

  // --- Pens ---
  {
    title: 'Executive Rollerball Pen',
    category: 'Pens',
    description: 'Heavyweight brass body rollerball pen with smooth German ink refill and laser engraved logo ring.',
    material: 'Brass & German Ink',
    type: 'Rollerball Pen',
    image: '/src/assets/one6.png',
    images: ['/src/assets/one6.png'],
    tags: ['Pens', 'Executive Pen'],
    finish: 'Matte Black & Gold Clip',
    sizes: 'Standard Pen',
    brand: 'Divine Creations',
    weatherproof: 'Smooth Writing Refill'
  },

  // --- Diaries & Telephone Diaries ---
  {
    title: 'A5 Executive Planner Diary',
    category: 'Diaries & Telephone Diaries',
    description: 'Dated annual planner diary with monthly index tabs, reference maps, and inner card pouch.',
    material: 'PU Leather Cover & Natural Shade Paper',
    type: 'Annual Planner',
    image: '/src/assets/one9.png',
    images: ['/src/assets/one9.png'],
    tags: ['Diaries & Telephone Diaries', 'Planner'],
    finish: 'Textured Leatherette',
    sizes: 'A5 Size',
    brand: 'Divine Creations',
    weatherproof: 'Hard Cover'
  },

  // --- Car Windshield Sunshades ---
  {
    title: 'Custom Branded Car Sunshade',
    category: 'Car Windshield Sunshades',
    description: 'Collapsible silver reflective windshield sun shade protecting vehicle interiors from heat & UV rays.',
    material: 'Reflective Polyester Fabric',
    type: 'Automotive Sunshade',
    image: '/src/assets/custom_design_banner_bg.png',
    images: ['/src/assets/custom_design_banner_bg.png'],
    tags: ['Car Windshield Sunshades', 'Promotional'],
    finish: 'Silver UV Coating',
    sizes: 'Universal Fit (150 x 70 cm)',
    brand: 'Divine Creations',
    weatherproof: '100% UV Protection'
  },

  // --- Laptop Bags and Backpacks ---
  {
    title: 'Executive Laptop Backpack',
    category: 'Laptop Bags and Backpacks',
    description: 'Multi-compartment water-resistant business backpack with padded 15.6 inch laptop sleeve and USB charging port.',
    material: 'Nylon & Polyester',
    type: 'Business Backpack',
    image: '/src/assets/one9.png',
    images: ['/src/assets/one9.png'],
    tags: ['Laptop Bags and Backpacks', 'Backpack'],
    finish: 'Dark Grey Slate',
    sizes: 'Fits up to 15.6" Laptop',
    brand: 'Divine Creations',
    weatherproof: 'Water-Repellent Fabric'
  },

  // --- Promotional Items ---
  {
    title: 'Custom Branded Promotional Gift Suite',
    category: 'Promotional Items',
    description: 'High impact custom branded promotional items combo for trade shows, exhibitions, and brand awareness campaigns.',
    material: 'Multi Material',
    type: 'Promotional Combo',
    image: '/src/assets/collection_corporate_gift.png',
    images: ['/src/assets/collection_corporate_gift.png'],
    tags: ['Promotional Items', 'Branding'],
    finish: 'Full Color Custom Print',
    sizes: 'Custom Box Packaging',
    brand: 'Divine Creations',
    weatherproof: 'High Durability'
  }
];

async function seedData() {
  try {
    console.log('Connecting to MongoDB Atlas at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Successfully connected to MongoDB Atlas (divine_creations_db)!');

    // Seed Categories
    console.log('Upserting Categories...');
    for (const cat of categoriesData) {
      await Category.findOneAndUpdate(
        { name: cat.name },
        { ...cat },
        { upsert: true, new: true }
      );
    }
    console.log(`Successfully seeded ${categoriesData.length} categories!`);

    // Seed Products
    console.log('Upserting Products...');
    for (const prod of productsData) {
      await Product.findOneAndUpdate(
        { title: prod.title },
        { ...prod },
        { upsert: true, new: true }
      );
    }
    console.log(`Successfully seeded ${productsData.length} products!`);

    console.log('All IndiaMART Divine Creations data for ALL categories has been populated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seedData();
