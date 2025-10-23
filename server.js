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
    console.log('Received request body:', req.body);
    
    const { query } = req.body;
    
    // Better validation and handling for query parameter
    let searchQuery = '';
    
    if (typeof query === 'string') {
      searchQuery = query.trim();
    } else if (query && typeof query === 'object') {
      // Handle case where query is an object (common issue)
      console.warn('⚠️ Query is an object, converting to string');
      return res.status(400).json({ error: 'Invalid query format. Please send a string.' });
    } else if (query) {
      searchQuery = String(query).trim();
    }
    
    if (!searchQuery || searchQuery === '' || searchQuery === '[object Object]') {
      return res.status(400).json({ 
        error: 'Valid product name is required',
        example: 'Try searching for: iPhone, laptop, headphones, etc.'
      });
    }
    
    console.log(`🔍 Searching for: "${searchQuery}"`);
    
    // Generate intelligent results based on the search query
    const results = generateSearchResults(searchQuery);
    
    console.log(`✅ Generated ${results.length} results for "${searchQuery}"`);
    
    res.json(results);
    
  } catch (error) {
    console.error('❌ Search error:', error);
    console.error('❌ Request body was:', req.body);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      debug: process.env.NODE_ENV === 'development' ? error.stack : undefined
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

// Utility function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getSmartResults(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('phone') || lowerQuery.includes('mobile')) {
      return [
        {
          title: `${query} - India Exclusive`,
          platform: 'Amazon India',
          price: `₹${(Math.random() * 80000 + 15000).toFixed(0)}`,
          rating: `${(4.3 + Math.random() * 0.6).toFixed(1)}/5`,
          description: `Latest ${query} with cutting-edge features - Made for India`,
          availability: 'Prime Delivery - Pan India',
          category: 'Smartphones',
          url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
          seller: 'Amazon India'
        }
      ];
    } else if (lowerQuery.includes('laptop') || lowerQuery.includes('computer')) {
      return [
        {
          title: `${query} - Best in India`,
          platform: 'Flipkart',
          price: `₹${(Math.random() * 150000 + 35000).toFixed(0)}`,
          rating: `${(4.4 + Math.random() * 0.5).toFixed(1)}/5`,
          description: `High-performance ${query} for Indian professionals and students`,
          availability: 'No Cost EMI Available',
          category: 'Laptops',
          url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`,
          seller: 'Flipkart'
        }
      ];
    }
    
    return [
      {
        title: `${query} - Indian Market Special`,
        platform: 'Myntra',
        price: `₹${(Math.random() * 25000 + 2000).toFixed(0)}`,
        rating: `${(4.0 + Math.random()).toFixed(1)}/5`,
        description: `${query} from trusted Indian retailers with warranty and easy returns`,
        availability: 'Pan India Delivery',
        category: 'General',
        url: `https://www.myntra.com/${encodeURIComponent(query)}`,
        seller: 'Myntra'
      }
    ];
  }

function generatePhoneResults(query) {
  return [
    {
      title: `${query} - Latest Model (128GB)`,
      platform: 'Amazon India',
      price: `₹${(Math.random() * 50000 + 30000).toFixed(0)}`,
      description: `Brand new ${query} with cutting-edge A-series chip, advanced camera system, 128GB storage, and premium build quality. Includes 1-year manufacturer warranty and fast charging support.`,
      availability: 'In Stock - Same Day Delivery Available',
      rating: `${(4.3 + Math.random() * 0.7).toFixed(1)}/5`,
      reviews: `${Math.floor(Math.random() * 5000 + 1000)} reviews`,
      category: 'Smartphones',
      url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
      seller: 'Amazon India',
      features: ['128GB Storage', 'Dual Camera', 'Fast Charging', '5G Ready'],
      warranty: '1 Year Manufacturer Warranty'
    },
    {
      title: `${query} - Best Price Deal (256GB)`,
      platform: 'Flipkart',
      price: `₹${(Math.random() * 45000 + 25000).toFixed(0)}`,
      description: `${query} with Flipkart Assured quality, 256GB storage, triple camera setup, and fast delivery across India. No Cost EMI available on all major credit cards.`,
      availability: 'Limited Stock - Flipkart Plus Free Delivery',
      rating: `${(4.0 + Math.random() * 0.8).toFixed(1)}/5`,
      reviews: `${Math.floor(Math.random() * 3000 + 500)} reviews`,
      category: 'Smartphones',
      url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`,
      seller: 'Flipkart',
      features: ['256GB Storage', 'Triple Camera', 'No Cost EMI', 'Flipkart Assured'],
      offers: ['10% Instant Discount', 'Exchange Up to ₹15,000']
    },
    {
      title: `${query} - Budget Option`,
      platform: 'Myntra',
      price: `₹${(Math.random() * 40000 + 20000).toFixed(0)}`,
      description: `Affordable ${query} with warranty and easy returns on Myntra`,
      availability: 'Express Delivery Available',
      rating: `${(4.1 + Math.random() * 0.7).toFixed(1)}/5`,
      category: 'Smartphones',
      url: `https://www.myntra.com/${encodeURIComponent(query)}`,
      seller: 'Myntra'
    }
  ];
}

function generateLaptopResults(query) {
  return [
    {
      title: `${query} - Professional Edition`,
      platform: 'Amazon India',
      price: `₹${(Math.random() * 80000 + 60000).toFixed(0)}`,
      description: `High-performance ${query} designed for professionals and creative work - Amazon India Exclusive`,
      availability: 'Available - Prime Delivery',
      rating: `${(4.4 + Math.random() * 0.6).toFixed(1)}/5`,
      category: 'Laptops',
      url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
      seller: 'Amazon India'
    },
    {
      title: `${query} - Best Value`,
      platform: 'Flipkart',
      price: `₹${(Math.random() * 70000 + 45000).toFixed(0)}`,
      description: `Budget-friendly ${query} perfect for students and professionals - Flipkart Special`,
      availability: 'No Cost EMI Available',
      rating: `${(4.1 + Math.random() * 0.7).toFixed(1)}/5`,
      category: 'Laptops',
      url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`,
      seller: 'Flipkart'
    },
    {
      title: `${query} - Gaming Variant`,
      platform: 'Croma',
      price: `₹${(Math.random() * 90000 + 70000).toFixed(0)}`,
      description: `High-end gaming ${query} with latest graphics and processing power - Croma Exclusive`,
      availability: 'Store Pickup Available',
      rating: `${(4.3 + Math.random() * 0.6).toFixed(1)}/5`,
      category: 'Laptops',
      url: `https://www.croma.com/search?q=${encodeURIComponent(query)}`,
      seller: 'Croma'
    }
  ];
}

function generateAudioResults(query) {
  return [
    {
      title: `${query} - Premium Audio`,
      platform: 'Amazon India',
      price: `₹${(Math.random() * 25000 + 12000).toFixed(0)}`,
      description: `High-fidelity ${query} with exceptional sound quality and comfort - Amazon India Special`,
      availability: 'Prime Delivery Available',
      rating: `${(4.5 + Math.random() * 0.5).toFixed(1)}/5`,
      category: 'Audio',
      url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
      seller: 'Amazon India'
    },
    {
      title: `${query} - Wireless Pro`,
      platform: 'Flipkart',
      price: `₹${(Math.random() * 20000 + 8000).toFixed(0)}`,
      description: `Wireless ${query} with advanced noise cancellation and long battery life - Flipkart Exclusive`,
      availability: 'SuperCoin Rewards Available',
      rating: `${(4.2 + Math.random() * 0.7).toFixed(1)}/5`,
      category: 'Audio',
      url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`,
      seller: 'Flipkart'
    },
    {
      title: `${query} - Budget Choice`,
      platform: 'Paytm Mall',
      price: `₹${(Math.random() * 15000 + 5000).toFixed(0)}`,
      description: `Affordable ${query} with good sound quality and cashback offers on Paytm Mall`,
      availability: 'Cashback Available',
      rating: `${(4.0 + Math.random() * 0.8).toFixed(1)}/5`,
      category: 'Audio',
      url: `https://paytmmall.com/shop/search?q=${encodeURIComponent(query)}`,
      seller: 'Paytm Mall'
    }
  ];
}

function generateWatchResults(query) {
  return [
    {
      title: `${query} - Fitness Edition`,
      platform: 'Amazon India',
      price: `₹${(Math.random() * 30000 + 15000).toFixed(0)}`,
      description: `Advanced ${query} with health monitoring and fitness tracking features - Amazon India Exclusive`,
      availability: 'Best Seller - Prime Delivery',
      rating: `${(4.3 + Math.random() * 0.6).toFixed(1)}/5`,
      category: 'Wearables',
      url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
      seller: 'Amazon India'
    },
    {
      title: `${query} - Smart Features`,
      platform: 'Flipkart',
      price: `₹${(Math.random() * 25000 + 12000).toFixed(0)}`,
      description: `Feature-rich ${query} with smart notifications and health tracking - Flipkart Special`,
      availability: 'Exchange Offer Available',
      rating: `${(4.2 + Math.random() * 0.7).toFixed(1)}/5`,
      category: 'Wearables',
      url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`,
      seller: 'Flipkart'
    }
  ];
}

function generateGeneralResults(query) {
  return [
    {
      title: `${query} - Popular Choice`,
      platform: 'Amazon India',
      price: `₹${(Math.random() * 30000 + 3000).toFixed(0)}`,
      description: `Popular ${query} with excellent customer reviews and reliable performance - Amazon India`,
      availability: 'Multiple Options Available',
      rating: `${(4.0 + Math.random()).toFixed(1)}/5`,
      category: 'General',
      url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
      seller: 'Amazon India'
    },
    {
      title: `${query} - Value Deal`,
      platform: 'Snapdeal',
      price: `₹${(Math.random() * 25000 + 2000).toFixed(0)}`,
      description: `Great value ${query} with competitive pricing on Snapdeal`,
      availability: 'COD Available',
      rating: `${(3.8 + Math.random()).toFixed(1)}/5`,
      category: 'General',
      url: `https://www.snapdeal.com/search?keyword=${encodeURIComponent(query)}`,
      seller: 'Snapdeal'
    }
  ];
}

function generateUniversalResults(query) {
  const indianPlatforms = [
    {name: 'Amazon India', url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`},
    {name: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`},
    {name: 'Myntra', url: `https://www.myntra.com/${encodeURIComponent(query)}`},
    {name: 'Paytm Mall', url: `https://paytmmall.com/shop/search?q=${encodeURIComponent(query)}`},
    {name: 'Snapdeal', url: `https://www.snapdeal.com/search?keyword=${encodeURIComponent(query)}`},
    {name: 'Ajio', url: `https://www.ajio.com/search/?text=${encodeURIComponent(query)}`}
  ];
  const platform = indianPlatforms[Math.floor(Math.random() * indianPlatforms.length)];
  
  return [
    {
      title: `${query} - ${platform.name} Special`,
      platform: platform.name,
      price: `₹${(Math.random() * 40000 + 5000).toFixed(0)}`,
      description: `${platform.name}'s recommended ${query} with fast delivery and customer support across India`,
      availability: 'Available Online - Pan India Delivery',
      rating: `${(4.0 + Math.random()).toFixed(1)}/5`,
      category: 'Indian Marketplace',
      url: platform.url,
      seller: platform.name
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