const fs = require('fs');
const path = require('path');
const https = require('https');

const filenames = [
  // Banners
  'banner-1790313542607-177824764.png',
  'banner-1790312677734-359960754.png',
  'banner-1788170583198-77573903.png',
  'banner-1788170603406-968374331.png',
  'banner-1787127054550-924197607.png',
  'banner-1787127066751-880009238.png',
  'banner-1787138737750-926614051.png',
  'banner-1787138754101-289872790.png',
  'banner-1787127115187-124167233.png',
  'banner-1787127127365-83335427.png',
  'banner-1787138776485-28441520.png',
  'banner-1790312736341-478121383.png',
  // About overview & cards
  'about-overviewImage-1789722133124-909322704.jpg',
  'about-card0Image-1789722384149-334751144.jpg',
  'about-card1Image-1789722384156-94184867.jpg',
  'about-card2Image-1789722384163-506558990.jpg',
  'about-card3Image-1789722384165-870628867.png',
  // Blogs
  'blog_corporate_gifts.png',
  'blog_laser_engraving.png',
  'blog_gift_trends.png',
  'blog_metal_etching.jpg',
  // Default about assets
  'about_corporate_gifting_craft.jpg',
  'laser_engraving_corporate_gifting.jpg',
  'metal_etching_trophy_crafting.jpg',
  'leatherette_gifting_embossing.jpg',
  'executive_drinkware_set.jpg'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve(e.message));
  });
}

async function run() {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  const assetsDir = path.join(__dirname, '..', '..', 'divine_creation_frontend', 'src', 'assets');

  for (const fn of filenames) {
    const localUploadExists = fs.existsSync(path.join(uploadsDir, fn));
    const localAssetExists = fs.existsSync(path.join(assetsDir, fn));
    const urlApiUpload = `https://api.divinecreations.co.in/uploads/${fn}`;
    const urlSiteUpload = `https://divinecreations.co.in/uploads/${fn}`;
    const statusApi = await checkUrl(urlApiUpload);
    const statusSite = await checkUrl(urlSiteUpload);

    console.log(`[${fn}]`);
    console.log(`  local uploads: ${localUploadExists} | local assets: ${localAssetExists}`);
    console.log(`  api.divinecreations.co.in/uploads: ${statusApi} | divinecreations.co.in/uploads: ${statusSite}`);
  }
}

run();
