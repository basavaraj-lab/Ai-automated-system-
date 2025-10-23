const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));
app.use(express.json());
app.use(express.static('public'));

// Simple but effective search endpoint
app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    console.log(`🔍 Searching for: "${query}"`);
    
    // Generate intelligent results based on the search query
    const results = generateSearchResults(query.trim());
    
    console.log(`✅ Generated ${results.length} results for "${query}"`);
    
    res.json(results);
    
  } catch (error) {
    console.error('❌ Search error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Generate smart search results based on query
function generateSearchResults(query) {
  const lowerQuery = query.toLowerCase();
  const results = [];
  
  // Determine product category and generate relevant results
  if (lowerQuery.includes('phone') || lowerQuery.includes('iphone') || lowerQuery.includes('samsung') || lowerQuery.includes('mobile')) {
    results.push(...generatePhoneResults(query));
  } else if (lowerQuery.includes('laptop') || lowerQuery.includes('computer') || lowerQuery.includes('macbook') || lowerQuery.includes('dell')) {
    results.push(...generateLaptopResults(query));
  } else if (lowerQuery.includes('headphone') || lowerQuery.includes('audio') || lowerQuery.includes('speaker') || lowerQuery.includes('earphone')) {
    results.push(...generateAudioResults(query));
  } else if (lowerQuery.includes('watch') || lowerQuery.includes('smartwatch') || lowerQuery.includes('apple watch')) {
    results.push(...generateWatchResults(query));
  } else {
    results.push(...generateGeneralResults(query));
  }
  
  // Add some universal results that match any query
  results.push(...generateUniversalResults(query));
  
  // Shuffle and limit results
  return shuffleArray(results).slice(0, 6);
}

function generatePhoneResults(query) {
  return [
    {
      title: `${query} - Latest Model`,
      platform: 'TechStore Pro',
      price: `$${(Math.random() * 600 + 400).toFixed(2)}`,
      description: `Brand new ${query} with cutting-edge technology and premium build quality`,
      availability: 'In Stock - Same Day Shipping',
      rating: `${(4.3 + Math.random() * 0.7).toFixed(1)}/5`,
      category: 'Smartphones'
    },
    {
      title: `${query} - Certified Refurbished`,
      platform: 'RefurbTech',
      price: `$${(Math.random() * 300 + 200).toFixed(2)}`,
      description: `Certified pre-owned ${query} with full warranty and quality assurance`,
      availability: 'Limited Stock Available',
      rating: `${(4.0 + Math.random() * 0.8).toFixed(1)}/5`,
      category: 'Smartphones'
    }
  ];
}

function generateLaptopResults(query) {
  return [
    {
      title: `${query} - Professional Edition`,
      platform: 'Computer World',
      price: `$${(Math.random() * 1000 + 800).toFixed(2)}`,
      description: `High-performance ${query} designed for professionals and creative work`,
      availability: 'Available - Free Shipping',
      rating: `${(4.4 + Math.random() * 0.6).toFixed(1)}/5`,
      category: 'Laptops'
    },
    {
      title: `${query} - Student Edition`,
      platform: 'EduTech',
      price: `$${(Math.random() * 600 + 400).toFixed(2)}`,
      description: `Budget-friendly ${query} perfect for students and everyday use`,
      availability: 'Educational Discount Available',
      rating: `${(4.1 + Math.random() * 0.7).toFixed(1)}/5`,
      category: 'Laptops'
    }
  ];
}

function generateAudioResults(query) {
  return [
    {
      title: `${query} - Premium Audio`,
      platform: 'SoundHub',
      price: `$${(Math.random() * 300 + 150).toFixed(2)}`,
      description: `High-fidelity ${query} with exceptional sound quality and comfort`,
      availability: 'Ready to Ship',
      rating: `${(4.5 + Math.random() * 0.5).toFixed(1)}/5`,
      category: 'Audio'
    },
    {
      title: `${query} - Wireless Pro`,
      platform: 'AudioTech',
      price: `$${(Math.random() * 200 + 100).toFixed(2)}`,
      description: `Wireless ${query} with advanced noise cancellation and long battery life`,
      availability: 'Popular Item - In Stock',
      rating: `${(4.2 + Math.random() * 0.7).toFixed(1)}/5`,
      category: 'Audio'
    }
  ];
}

function generateWatchResults(query) {
  return [
    {
      title: `${query} - Fitness Edition`,
      platform: 'WearableTech',
      price: `$${(Math.random() * 400 + 200).toFixed(2)}`,
      description: `Advanced ${query} with health monitoring and fitness tracking features`,
      availability: 'Best Seller - In Stock',
      rating: `${(4.3 + Math.random() * 0.6).toFixed(1)}/5`,
      category: 'Wearables'
    }
  ];
}

function generateGeneralResults(query) {
  return [
    {
      title: `${query} - Top Rated`,
      platform: 'MegaStore',
      price: `$${(Math.random() * 400 + 50).toFixed(2)}`,
      description: `Popular ${query} with excellent customer reviews and reliable performance`,
      availability: 'Multiple Options Available',
      rating: `${(4.0 + Math.random()).toFixed(1)}/5`,
      category: 'General'
    }
  ];
}

function generateUniversalResults(query) {
  const platforms = ['Amazon', 'eBay', 'Best Buy', 'Walmart', 'Target'];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  
  return [
    {
      title: `${query} - ${platform} Choice`,
      platform: platform,
      price: `$${(Math.random() * 500 + 100).toFixed(2)}`,
      description: `${platform}'s recommended ${query} with fast shipping and customer support`,
      availability: 'Available Online',
      rating: `${(4.0 + Math.random()).toFixed(1)}/5`,
      category: 'Marketplace'
    }
  ];
}

// Utility function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Server is running properly' 
  });
});

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/search`);
});