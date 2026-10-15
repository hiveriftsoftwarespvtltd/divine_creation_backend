const https = require('https');
const http = require('http');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: e.message, status: res.statusCode, raw: data.substring(0, 200) });
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching live server products (https://api.divinecreations.co.in/api/v1/products)...');
  try {
    const liveProds = await fetchJson('https://api.divinecreations.co.in/api/v1/products');
    console.log('Live server products count:', Array.isArray(liveProds) ? liveProds.length : liveProds);
    if (Array.isArray(liveProds) && liveProds.length > 0) {
      console.log('Sample live product:', JSON.stringify(liveProds[0], null, 2));
      const liveCategories = [...new Set(liveProds.map(p => p.category))];
      console.log('Live server product categories:', liveCategories);
    }
  } catch (e) {
    console.error('Error fetching live:', e.message);
  }

  console.log('\nFetching localhost products (http://localhost:5007/api/v1/products)...');
  try {
    const localProds = await fetchJson('http://localhost:5007/api/v1/products');
    console.log('Localhost products count:', Array.isArray(localProds) ? localProds.length : localProds);
    if (Array.isArray(localProds) && localProds.length > 0) {
      console.log('Sample local product:', JSON.stringify(localProds[0], null, 2));
      const localCategories = [...new Set(localProds.map(p => p.category))];
      console.log('Localhost product categories:', localCategories);
    }
  } catch (e) {
    console.error('Error fetching local:', e.message);
  }
}

run();
