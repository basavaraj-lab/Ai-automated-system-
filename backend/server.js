// // // -------------------------------
// // // 🌐 AI Enquiry System Backend
// // // -------------------------------

// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const puppeteer = require('puppeteer');

// // const app = express();
// // const PORT = process.env.PORT || 5001;

// // // ✅ Enable CORS so frontend (127.0.0.1:5500) can access backend
// // app.use(cors({
// //   origin: '*', // For development; restrict later to your domain
// //   methods: ['GET', 'POST'],
// //   allowedHeaders: ['Content-Type']
// // }));

// // app.use(bodyParser.json());

// // // -------------------------------------
// // // 🧠 Root route
// // // -------------------------------------
// // app.get('/', (req, res) => {
// //   res.send('✅ AI Enquiry System Backend Running...');
// // });

// // // -------------------------------------
// // // 🔍 Product Search (via Puppeteer)
// // // -------------------------------------
// // app.post('/api/search', async (req, res) => {
// //   const { query } = req.body;
// //   if (!query) return res.status(400).json({ error: 'Query is required' });

// //   console.log(`🔎 Searching for: ${query}`);

// //   const platforms = [
// //     { name: "Amazon", url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}` },
// //     { name: "Flipkart", url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}` },
// //     { name: "Myntra", url: `https://www.myntra.com/${encodeURIComponent(query)}` },
// //     { name: "Meesho", url: `https://www.meesho.com/search?q=${encodeURIComponent(query)}` }
// //   ];

// //   const results = [];
// //   let browser;

// //   try {
// //     browser = await puppeteer.launch({
// //       headless: true,
// //       args: ['--no-sandbox', '--disable-setuid-sandbox']
// //     });

// //     for (const site of platforms) {
// //       console.log(`🕸 Scraping ${site.name}...`);
// //       const page = await browser.newPage();

// //       try {
// //         await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 60000 });

// //         let items = [];
// //         if (site.name === "Amazon") {
// //           items = await page.evaluate(() =>
// //             Array.from(document.querySelectorAll('.s-result-item')).slice(0, 5).map(el => ({
// //               title: el.querySelector('h2')?.innerText || "Unknown",
// //               price: el.querySelector('.a-price-whole')?.innerText || "N/A"
// //             }))
// //           );
// //         } else if (site.name === "Flipkart") {
// //           items = await page.evaluate(() =>
// //             Array.from(document.querySelectorAll('div._1AtVbE')).slice(0, 5).map(el => ({
// //               title: el.querySelector('div._4rR01T, .s1Q9rs')?.innerText || "Unknown",
// //               price: el.querySelector('div._30jeq3')?.innerText || "N/A"
// //             }))
// //           );
// //         } else if (site.name === "Myntra") {
// //           items = await page.evaluate(() =>
// //             Array.from(document.querySelectorAll('.product-base')).slice(0, 5).map(el => ({
// //               title: el.querySelector('.product-product')?.innerText || "Unknown",
// //               price: el.querySelector('.product-discountedPrice')?.innerText || "N/A"
// //             }))
// //           );
// //         } else if (site.name === "Meesho") {
// //           items = await page.evaluate(() =>
// //             Array.from(document.querySelectorAll('[data-testid="plp-product-card"]')).slice(0, 5).map(el => ({
// //               title: el.querySelector('p')?.innerText || "Unknown",
// //               price: el.querySelector('h5')?.innerText || "N/A"
// //             }))
// //           );
// //         }

// //         // Add platform name to each result
// //         items.forEach(item => results.push({ platform: site.name, ...item }));

// //       } catch (err) {
// //         console.error(`⚠️ Error scraping ${site.name}:`, err.message);
// //       } finally {
// //         await page.close();
// //       }
// //     }

// //     await browser.close();

// //     if (results.length === 0) {
// //       return res.status(404).json({ error: "No products found" });
// //     }

// //     console.log(`✅ Found ${results.length} items`);
// //     res.json(results);

// //   } catch (err) {
// //     console.error('❌ Server Error:', err.message);
// //     if (browser) await browser.close();
// //     res.status(500).json({ error: "Failed to fetch data" });
// //   }
// // });

// // // -------------------------------------
// // // 🚀 Start the Server
// // // -------------------------------------
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running successfully on http://localhost:${PORT}`);
// // });





// // -------------------------------
// // 🌐 AI Enquiry System Backend
// // -------------------------------

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const puppeteer = require('puppeteer');
// const axios = require('axios');

// const app = express();
// const PORT = process.env.PORT || 5001;

// // -------------------------------------
// // 🔐 API KEYS (replace with yours)
// // -------------------------------------
// const INSTAGRAM_ACCESS_TOKEN = "YOUR_INSTAGRAM_GRAPH_API_ACCESS_TOKEN";
// const FACEBOOK_ACCESS_TOKEN = "YOUR_FACEBOOK_GRAPH_API_ACCESS_TOKEN";
// const X_BEARER_TOKEN = "YOUR_X_API_BEARER_TOKEN";

// // -------------------------------------
// // ✅ Enable CORS (for frontend access)
// // -------------------------------------
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type']
// }));

// app.use(bodyParser.json());

// // -------------------------------------
// // 🧠 Root Route
// // -------------------------------------
// app.get('/', (req, res) => {
//   res.send('✅ AI Enquiry System Backend Running...');
// });

// // -------------------------------------
// // 🔍 Product Search (Amazon + others)
// // -------------------------------------
// app.post('/api/search', async (req, res) => {
//   const { query } = req.body;
//   if (!query) return res.status(400).json({ error: 'Query is required' });

//   console.log(`🔎 Searching for: ${query}`);

//   const platforms = [
//     { name: "Amazon", url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}` },
//     { name: "Flipkart", url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}` },
//     { name: "Myntra", url: `https://www.myntra.com/${encodeURIComponent(query)}` },
//     { name: "Meesho", url: `https://www.meesho.com/search?q=${encodeURIComponent(query)}` }
//   ];

//   const results = [];
//   let browser;

//   try {
//     browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });

//     for (const site of platforms) {
//       console.log(`🕸 Scraping ${site.name}...`);
//       const page = await browser.newPage();

//       try {
//         await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 60000 });

//         let items = [];
//         if (site.name === "Amazon") {
//           // ⚡ Amazon scraping logic (keep original as you requested)
//           items = await page.evaluate(() =>
//             Array.from(document.querySelectorAll('.s-result-item')).slice(0, 5).map(el => ({
//               title: el.querySelector('h2')?.innerText || "Unknown",
//               price: el.querySelector('.a-price-whole')?.innerText || "N/A"
//             }))
//           );
//         } else if (site.name === "Flipkart") {
//           items = await page.evaluate(() =>
//             Array.from(document.querySelectorAll('div._1AtVbE')).slice(0, 5).map(el => ({
//               title: el.querySelector('div._4rR01T, .s1Q9rs')?.innerText || "Unknown",
//               price: el.querySelector('div._30jeq3')?.innerText || "N/A"
//             }))
//           );
//         } else if (site.name === "Myntra") {
//           items = await page.evaluate(() =>
//             Array.from(document.querySelectorAll('.product-base')).slice(0, 5).map(el => ({
//               title: el.querySelector('.product-product')?.innerText || "Unknown",
//               price: el.querySelector('.product-discountedPrice')?.innerText || "N/A"
//             }))
//           );
//         } else if (site.name === "Meesho") {
//           items = await page.evaluate(() =>
//             Array.from(document.querySelectorAll('[data-testid="plp-product-card"]')).slice(0, 5).map(el => ({
//               title: el.querySelector('p')?.innerText || "Unknown",
//               price: el.querySelector('h5')?.innerText || "N/A"
//             }))
//           );
//         }

//         items.forEach(item => results.push({ platform: site.name, ...item }));

//       } catch (err) {
//         console.error(`⚠️ Error scraping ${site.name}:`, err.message);
//       } finally {
//         await page.close();
//       }
//     }

//     await browser.close();

//     // -------------------------------------
//     // 🔗 Add Social Media Comments (via APIs)
//     // -------------------------------------
//     console.log("💬 Fetching social comments...");

//     const [instagramComments, facebookComments, xTweets] = await Promise.all([
//       fetchInstagramComments(query),
//       fetchFacebookComments(query),
//       fetchTweets(query)
//     ]);

//     // Merge all data
//     const fullData = [
//       ...results,
//       ...instagramComments,
//       ...facebookComments,
//       ...xTweets
//     ];

//     if (fullData.length === 0)
//       return res.status(404).json({ error: "No data found" });

//     console.log(`✅ Found ${fullData.length} total items`);
//     res.json(fullData);

//   } catch (err) {
//     console.error('❌ Server Error:', err.message);
//     if (browser) await browser.close();
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

// // -------------------------------------
// // 📱 Instagram Graph API Comments
// // -------------------------------------
// async function fetchInstagramComments(query) {
//   try {
//     const url = `https://graph.facebook.com/v19.0/me/media?fields=id,caption,comments{username,text,timestamp}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
//     const res = await axios.get(url);
//     const data = res.data.data || [];
//     return data.flatMap(post =>
//       (post.comments?.data || [])
//         .filter(c => c.text.toLowerCase().includes(query.toLowerCase()))
//         .map(c => ({
//           platform: "Instagram",
//           title: `Comment by ${c.username}`,
//           price: "-",
//           text: c.text
//         }))
//     );
//   } catch (err) {
//     console.error("⚠️ Instagram API error:", err.message);
//     return [];
//   }
// }

// // -------------------------------------
// // 📘 Facebook Graph API Comments
// // -------------------------------------
// async function fetchFacebookComments(query) {
//   try {
//     const url = `https://graph.facebook.com/v19.0/me/posts?fields=message,comments{from,message,created_time}&access_token=${FACEBOOK_ACCESS_TOKEN}`;
//     const res = await axios.get(url);
//     const posts = res.data.data || [];
//     return posts.flatMap(post =>
//       (post.comments?.data || [])
//         .filter(c => c.message && c.message.toLowerCase().includes(query.toLowerCase()))
//         .map(c => ({
//           platform: "Facebook",
//           title: `Comment by ${c.from.name}`,
//           price: "-",
//           text: c.message
//         }))
//     );
//   } catch (err) {
//     console.error("⚠️ Facebook API error:", err.message);
//     return [];
//   }
// }

// // -------------------------------------
// // 🐦 Twitter (X) API Recent Tweets
// // -------------------------------------
// async function fetchTweets(query) {
//   try {
//     const url = `https://api.x.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&tweet.fields=author_id,created_at`;
//     const res = await axios.get(url, {
//       headers: { Authorization: `Bearer ${X_BEARER_TOKEN}` }
//     });
//     const tweets = res.data.data || [];
//     return tweets.map(t => ({
//       platform: "X (Twitter)",
//       title: `Tweet by ${t.author_id}`,
//       price: "-",
//       text: t.text
//     }));
//   } catch (err) {
//     console.error("⚠️ X API error:", err.message);
//     return [];
//   }
// }

// // -------------------------------------
// // 🚀 Start Server
// // -------------------------------------
// app.listen(PORT, () => {
//   console.log(`✅ Server running successfully on http://localhost:${PORT}`);
// });





// // -------------------------------
// // 🌐 AI Enquiry System Backend
// // -------------------------------

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const puppeteer = require('puppeteer');
// const axios = require('axios');

// const app = express();
// const PORT = process.env.PORT || 5001;

// // ---------------------
// // ⚙️ Config
// // ---------------------
// const TWITTER_BEARER_TOKEN = 'YOUR_TWITTER_BEARER_TOKEN';
// const FACEBOOK_PAGE_ID = 'YOUR_PAGE_ID';
// const FACEBOOK_ACCESS_TOKEN = 'YOUR_PAGE_ACCESS_TOKEN';
// const INSTAGRAM_BUSINESS_ID = 'YOUR_INSTAGRAM_BUSINESS_ID';

// // ---------------------
// // Middleware
// // ---------------------
// app.use(cors({ origin: '*' }));
// app.use(bodyParser.json());

// // ---------------------
// // 🔍 Product & Social Search
// // ---------------------
// app.post('/api/search', async (req, res) => {
//   const { query } = req.body;
//   if (!query) return res.status(400).json({ error: 'Query is required' });

//   const results = [];

//   // ---------------------
//   // 1️⃣ Scrape eCommerce
//   // ---------------------
//   const platforms = [
//     { name: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}` },
//     { name: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}` },
//     { name: 'Myntra', url: `https://www.myntra.com/${encodeURIComponent(query)}` },
//     { name: 'Meesho', url: `https://www.meesho.com/search?q=${encodeURIComponent(query)}` }
//   ];

//   let browser;
//   try {
//     browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

//     for (const site of platforms) {
//       const page = await browser.newPage();
//       await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 60000 });

//       let items = [];
//       try {
//         if (site.name === 'Amazon') {
//           items = await page.evaluate(() =>
//             Array.from(document.querySelectorAll('.s-result-item')).slice(0, 5).map(el => ({
//               platform: 'Amazon',
//               product: el.querySelector('h2')?.innerText || 'Unknown',
//               price: el.querySelector('.a-price-whole')?.innerText || 'N/A'
//             }))
//           );
//         } else if (site.name === 'Flipkart') {
//           items = await page.evaluate(() =>
//             Array.from(document.querySelectorAll('div._1AtVbE')).slice(0, 5).map(el => ({
//               platform: 'Flipkart',
//               product: el.querySelector('div._4rR01T, .s1Q9rs')?.innerText || 'Unknown',
//               price: el.querySelector('div._30jeq3')?.innerText || 'N/A'
//             }))
//           );
//         } else if (site.name === 'Myntra') {
//           items = await page.evaluate(() =>
//             Array.from(document.querySelectorAll('.product-base')).slice(0, 5).map(el => ({
//               platform: 'Myntra',
//               product: el.querySelector('.product-product')?.innerText || 'Unknown',
//               price: el.querySelector('.product-discountedPrice')?.innerText || 'N/A'
//             }))
//           );
//         } else if (site.name === 'Meesho') {
//           items = await page.evaluate(() =>
//             Array.from(document.querySelectorAll('[data-testid="plp-product-card"]')).slice(0, 5).map(el => ({
//               platform: 'Meesho',
//               product: el.querySelector('p')?.innerText || 'Unknown',
//               price: el.querySelector('h5')?.innerText || 'N/A'
//             }))
//           );
//         }
//         results.push(...items);
//       } catch (err) {
//         console.error(`Error scraping ${site.name}:`, err.message);
//       } finally {
//         await page.close();
//       }
//     }

//     await browser.close();
//   } catch (err) {
//     if (browser) await browser.close();
//     console.error('Scraping error:', err.message);
//   }

//   // ---------------------
//   // 2️⃣ Twitter Public Search
//   // ---------------------
//   try {
//     const twitterRes = await axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&tweet.fields=created_at,author_id&max_results=5`, {
//       headers: { 'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}` }
//     });
//     twitterRes.data.data?.forEach(tweet => {
//       results.push({
//         platform: 'Twitter',
//         username: tweet.author_id,
//         tweet: tweet.text,
//         date: tweet.created_at
//       });
//     });
//   } catch (err) {
//     console.error('Twitter API error:', err.message);
//   }

//   // ---------------------
//   // 3️⃣ Instagram / Facebook Comments (Your Pages Only)
//   // ---------------------
//   try {
//     // Instagram
//     const igRes = await axios.get(`https://graph.facebook.com/v17.0/${INSTAGRAM_BUSINESS_ID}/comments?access_token=${FACEBOOK_ACCESS_TOKEN}&limit=5`);
//     igRes.data.data?.forEach(cmt => {
//       results.push({
//         platform: 'Instagram',
//         username: cmt.username,
//         comment: cmt.text,
//         date: cmt.timestamp
//       });
//     });

//     // Facebook Page
//     const fbRes = await axios.get(`https://graph.facebook.com/v17.0/${FACEBOOK_PAGE_ID}/posts?fields=message,comments.limit(5){from,message,created_time}&access_token=${FACEBOOK_ACCESS_TOKEN}`);
//     fbRes.data.data?.forEach(post => {
//       post.comments?.data?.forEach(cmt => {
//         results.push({
//           platform: 'Facebook',
//           username: cmt.from.name,
//           comment: cmt.message,
//           date: cmt.created_time
//         });
//       });
//     });
//   } catch (err) {
//     console.error('Instagram/Facebook API error:', err.message);
//   }

//   if (results.length === 0) return res.status(404).json({ error: 'No results found' });
//   res.json(results);
// });

// // ---------------------
// // 🚀 Start Server
// // ---------------------
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });




// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// ---------------------------------------------
// In-memory data store
// ---------------------------------------------
const enquiries = [];  // Stores fetched enquiries
const analytics = {
  enquiries: 0,
  responses: 0,
  clicks: 0,
  conversions: 0,
  platformStats: {} // { Amazon: 5, Flipkart: 3 }
};

// ---------------------------------------------
// Test route
// ---------------------------------------------
app.get('/', (req, res) => {
  res.send('✅ AI Enquiry System Backend Running...');
});

// ---------------------------------------------
// Search products & scrape data
// ---------------------------------------------
app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query required' });

  const platforms = [
    { name: "Amazon", url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}` },
    { name: "Flipkart", url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}` },
    { name: "Myntra", url: `https://www.myntra.com/${encodeURIComponent(query)}` },
    { name: "Meesho", url: `https://www.meesho.com/search?q=${encodeURIComponent(query)}` }
  ];

  const results = [];
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

    for (const site of platforms) {
      const page = await browser.newPage();
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 60000 });

      let items = [];
      try {
        if (site.name === "Amazon") {
          items = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.s-result-item')).slice(0, 5).map(el => ({
              platform: "Amazon",
              product: el.querySelector('h2')?.innerText || "Unknown",
              price: el.querySelector('.a-price-whole')?.innerText || "N/A"
            }))
          );
        } else if (site.name === "Flipkart") {
          items = await page.evaluate(() =>
            Array.from(document.querySelectorAll('div._1AtVbE')).slice(0, 5).map(el => ({
              platform: "Flipkart",
              product: el.querySelector('div._4rR01T, .s1Q9rs')?.innerText || "Unknown",
              price: el.querySelector('div._30jeq3')?.innerText || "N/A"
            }))
          );
        } else if (site.name === "Myntra") {
          items = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.product-base')).slice(0, 5).map(el => ({
              platform: "Myntra",
              product: el.querySelector('.product-product')?.innerText || "Unknown",
              price: el.querySelector('.product-discountedPrice')?.innerText || "N/A"
            }))
          );
        } else if (site.name === "Meesho") {
          items = await page.evaluate(() =>
            Array.from(document.querySelectorAll('[data-testid="plp-product-card"]')).slice(0, 5).map(el => ({
              platform: "Meesho",
              product: el.querySelector('p')?.innerText || "Unknown",
              price: el.querySelector('h5')?.innerText || "N/A"
            }))
          );
        }
      } catch (err) {
        console.error(`⚠️ Error scraping ${site.name}:`, err.message);
      }

      items.forEach(item => {
        results.push(item);

        // Update analytics
        analytics.enquiries++;
        analytics.platformStats[item.platform] = (analytics.platformStats[item.platform] || 0) + 1;
      });

      await page.close();
    }

    await browser.close();
    res.json(results);

  } catch (err) {
    console.error(err);
    if (browser) await browser.close();
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// ---------------------------------------------
// Log user actions
// ---------------------------------------------
app.post('/api/log', (req, res) => {
  const { type } = req.body; // 'click', 'response', 'conversion'
  if (!type) return res.status(400).json({ error: 'Action type required' });

  if (type === 'click') analytics.clicks++;
  else if (type === 'response') analytics.responses++;
  else if (type === 'conversion') analytics.conversions++;

  res.json({ success: true, analytics });
});

// ---------------------------------------------
// Get analytics data
// ---------------------------------------------
app.get('/api/analytics', (req, res) => {
  res.json(analytics);
});

// ---------------------------------------------
// Start server
// ---------------------------------------------
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
