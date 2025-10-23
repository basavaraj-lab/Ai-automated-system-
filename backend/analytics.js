// --- Add this inside your server.js file ---

// In-memory analytics store
const analytics = {
  enquiries: 0,
  responses: 0,
  clicks: 0,
  conversions: 0,
  platformStats: {} // Example: { Amazon: 3, Flipkart: 5 }
};

// Route to log actions (enquiry, click, etc.)
app.post('/api/log', (req, res) => {
  const { type, platform } = req.body;

  if (!type) return res.status(400).json({ error: 'Action type required' });

  switch (type) {
    case 'enquiry': analytics.enquiries++; break;
    case 'response': analytics.responses++; break;
    case 'click': analytics.clicks++; break;
    case 'conversion': analytics.conversions++; break;
  }

  if (platform) {
    analytics.platformStats[platform] = (analytics.platformStats[platform] || 0) + 1;
  }

  res.json({ success: true, analytics });
});

// Route to get current analytics
app.get('/api/analytics', (req, res) => {
  res.json(analytics);
});
