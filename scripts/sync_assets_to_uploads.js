const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', '..', 'divine_creation_frontend', 'src', 'assets');
const destDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const filesToCopy = [
  'about_corporate_gifting_craft.jpg',
  'laser_engraving_corporate_gifting.jpg',
  'metal_etching_trophy_crafting.jpg',
  'leatherette_gifting_embossing.jpg',
  'executive_drinkware_set.jpg',
  'collection_corporate_gift.png',
  'hero.png',
  'mobilehero.png',
  'slide1.png',
  'slide2.png',
  'slide3.png',
  'a (1).png',
  'a (2).png',
  'a (3).png',
  'a (4).png',
  'a (5).png',
  'a (6).png',
  'a (7).png',
  'aboutusshero.png',
  'aboutusmobile.png',
  'ourproducthero.png',
  'productmobilehero.png',
  'gallery.png',
  'gallerymobile.png',
  'clinthero.png',
  'clintmobilehero.png',
  'contacthero.png',
  'contactmobile.png',
  'artisan_craft.jpg',
  'expertise_corporate_gifts.png',
  'expertise_customized_products.png',
  'expertise_buddha_statues.png',
  'expertise_meditation_decor.png',
  'expertise_wall_art.png'
];

let copied = 0;
for (const file of filesToCopy) {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    copied++;
  } else {
    console.warn(`File not found in assets: ${file}`);
  }
}

console.log(`Successfully copied ${copied} assets to backend/uploads/!`);
