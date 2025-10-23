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
    
    // Convert query to string and validate
    const searchQuery = query ? String(query).trim() : '';
    
    if (!searchQuery || searchQuery === '') {
      return res.status(400).json({ error: 'Query is required' });
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
          url: 'https://www.amazon.in',
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
          url: 'https://www.flipkart.com',
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
        url: 'https://www.myntra.com',
        seller: 'Myntra'
      }
    ];
  }

function generatePhoneResults(query) {
  return [
    {
      title: `${query} - Latest Model`,
      platform: 'Amazon India',
      price: `₹${(Math.random() * 50000 + 30000).toFixed(0)}`,
      description: `Brand new ${query} with cutting-edge technology and premium build quality - Available on Amazon India`,
      availability: 'In Stock - Same Day Delivery',
      rating: `${(4.3 + Math.random() * 0.7).toFixed(1)}/5`,
      category: 'Smartphones',
      url: 'https://www.amazon.in',
      seller: 'Amazon India'
    },
    {
      title: `${query} - Best Price`,
      platform: 'Flipkart',
      price: `₹${(Math.random() * 45000 + 25000).toFixed(0)}`,
      description: `${query} with Flipkart Assured quality and fast delivery across India`,
      availability: 'Flipkart Plus - Free Delivery',
      rating: `${(4.0 + Math.random() * 0.8).toFixed(1)}/5`,
      category: 'Smartphones',
      url: 'https://www.flipkart.com',
      seller: 'Flipkart'
    },
    {
      title: `${query} - Budget Option`,
      platform: 'Myntra',
      price: `₹${(Math.random() * 40000 + 20000).toFixed(0)}`,
      description: `Affordable ${query} with warranty and easy returns on Myntra`,
      availability: 'Express Delivery Available',
      rating: `${(4.1 + Math.random() * 0.7).toFixed(1)}/5`,
      category: 'Smartphones',
      url: 'https://www.myntra.com',
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
      url: 'https://www.amazon.in',
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
      url: 'https://www.flipkart.com',
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
      url: 'https://www.croma.com',
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
      url: 'https://www.amazon.in',
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
      url: 'https://www.flipkart.com',
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
      url: 'https://paytmmall.com',
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
      url: 'https://www.amazon.in',
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
      url: 'https://www.flipkart.com',
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
      url: 'https://www.amazon.in',
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
      url: 'https://www.snapdeal.com',
      seller: 'Snapdeal'
    }
  ];
}

function generateUniversalResults(query) {
  const indianPlatforms = [
    {name: 'Amazon India', url: 'https://www.amazon.in'},
    {name: 'Flipkart', url: 'https://www.flipkart.com'},
    {name: 'Myntra', url: 'https://www.myntra.com'},
    {name: 'Paytm Mall', url: 'https://paytmmall.com'},
    {name: 'Snapdeal', url: 'https://www.snapdeal.com'},
    {name: 'Ajio', url: 'https://www.ajio.com'}
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