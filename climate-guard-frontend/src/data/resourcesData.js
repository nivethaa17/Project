// Sample data for resources - replace with API calls in production

export const cropCalendarData = {
  kharif: [
    { crop: 'Rice', plantingMonth: 'June-July', harvestMonth: 'November-December', duration: '120-150 days' },
    { crop: 'Cotton', plantingMonth: 'May-June', harvestMonth: 'October-January', duration: '180-200 days' },
    { crop: 'Sugarcane', plantingMonth: 'February-March', harvestMonth: 'December-March', duration: '10-12 months' },
    { crop: 'Maize', plantingMonth: 'June-July', harvestMonth: 'September-October', duration: '90-120 days' }
  ],
  rabi: [
    { crop: 'Wheat', plantingMonth: 'November-December', harvestMonth: 'March-April', duration: '120-150 days' },
    { crop: 'Barley', plantingMonth: 'November-December', harvestMonth: 'March-April', duration: '100-120 days' },
    { crop: 'Potato', plantingMonth: 'October-November', harvestMonth: 'January-February', duration: '90-120 days' },
    { crop: 'Onion', plantingMonth: 'November-December', harvestMonth: 'March-April', duration: '120-150 days' }
  ],
  summer: [
    { crop: 'Tomato', plantingMonth: 'February-March', harvestMonth: 'May-June', duration: '70-90 days' },
    { crop: 'Cucumber', plantingMonth: 'February-March', harvestMonth: 'April-May', duration: '60-70 days' },
    { crop: 'Watermelon', plantingMonth: 'February-March', harvestMonth: 'May-June', duration: '90-100 days' }
  ]
};

export const pestData = [
  {
    pest: 'Aphids',
    crops: ['Wheat', 'Cotton', 'Tomato'],
    symptoms: 'Yellowing leaves, stunted growth',
    weather: 'Warm, humid conditions',
    treatment: 'Neem oil spray, ladybird beetles',
    prevention: 'Regular monitoring, crop rotation'
  },
  {
    pest: 'Bollworm',
    crops: ['Cotton', 'Tomato'],
    symptoms: 'Holes in leaves and fruits',
    weather: 'Hot, dry conditions',
    treatment: 'Bt spray, pheromone traps',
    prevention: 'Early planting, resistant varieties'
  }
];

export const soilTestingCenters = [
  {
    name: 'State Agricultural Laboratory',
    location: 'Delhi',
    contact: '+91-11-2345-6789',
    services: ['NPK Testing', 'pH Analysis', 'Organic Matter'],
    cost: '₹200-500'
  },
  {
    name: 'Krishi Vigyan Kendra',
    location: 'Mumbai',
    contact: '+91-22-2345-6789',
    services: ['Complete Soil Analysis', 'Micronutrient Testing'],
    cost: '₹300-800'
  }
];

export const marketPricesData = [
  { crop: 'Wheat', currentPrice: '₹2150/quintal', change: '+2.3%', market: 'Delhi' },
  { crop: 'Rice', currentPrice: '₹3200/quintal', change: '-1.5%', market: 'Punjab' },
  { crop: 'Cotton', currentPrice: '₹6800/quintal', change: '+5.2%', market: 'Gujarat' }
];

export const cropInsuranceData = [
  {
    scheme: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    coverage: 'Yield loss due to natural calamities, pests, diseases',
    premium: '2-5% of sum insured',
    benefits: 'Financial compensation for crop loss',
    eligibility: 'All farmers growing notified crops'
  },
  {
    scheme: 'Weather Based Crop Insurance Scheme (WBCIS)',
    coverage: 'Weather parameters like rainfall, temperature, humidity',
    premium: '3-6% of sum insured',
    benefits: 'Payout based on weather indices',
    eligibility: 'Farmers in notified areas'
  },
  {
    scheme: 'Coconut Palm Insurance Scheme (CPIS)',
    coverage: 'Damage to coconut palms due to natural calamities',
    premium: '₹50-100 per palm per year',
    benefits: 'Replanting assistance and compensation',
    eligibility: 'Coconut growers'
  }
];

export const learningCenterData = [
  {
    category: 'Crop Management',
    title: 'Sustainable Farming Practices',
    description: 'Learn about organic farming, crop rotation, and soil health management',
    duration: '15 min read',
    level: 'Beginner',
    detailedContent: [
      {
        heading: 'Introduction to Sustainable Farming',
        content: 'Sustainable farming practices aim to meet current food needs without compromising future generations. This involves balancing environmental health, economic profitability, and social equity.'
      },
      {
        heading: 'Organic Farming Techniques',
        content: 'Organic farming avoids synthetic pesticides and fertilizers. Key practices include using natural compost, crop rotation, and biological pest control. Benefits include improved soil health and reduced chemical runoff.'
      },
      {
        heading: 'Crop Rotation Benefits',
        content: 'Crop rotation prevents soil depletion by alternating different crops. For example, planting legumes after cereals can naturally replenish nitrogen in the soil, reducing the need for synthetic fertilizers.'
      },
      {
        heading: 'Soil Health Management',
        content: 'Maintaining soil health involves regular testing, adding organic matter, and avoiding overuse of chemicals. Healthy soil leads to better crop yields and resilience against pests and diseases.'
      }
    ]
  },
  {
    category: 'Pest Control',
    title: 'Integrated Pest Management',
    description: 'Understanding IPM strategies for effective pest control',
    duration: '20 min read',
    level: 'Intermediate',
    detailedContent: [
      {
        heading: 'What is Integrated Pest Management?',
        content: 'IPM is an ecosystem-based strategy that focuses on long-term prevention of pests through a combination of techniques such as biological control, habitat manipulation, and use of resistant varieties.'
      },
      {
        heading: 'Monitoring and Identification',
        content: 'Regular field scouting helps identify pest problems early. Understanding pest life cycles and thresholds allows farmers to make informed decisions about when intervention is necessary.'
      },
      {
        heading: 'Biological Control Methods',
        content: 'Using natural enemies like ladybugs, parasitic wasps, and predatory mites to control pest populations. This method is environmentally friendly and sustainable.'
      },
      {
        heading: 'Cultural and Mechanical Controls',
        content: 'Practices such as crop rotation, trap cropping, and physical barriers can significantly reduce pest pressure without relying on chemicals.'
      },
      {
        heading: 'Chemical Control as Last Resort',
        content: 'When other methods are insufficient, selective pesticides should be used sparingly. Always follow label instructions and consider environmental impact.'
      }
    ]
  },
  {
    category: 'Irrigation',
    title: 'Water Conservation Techniques',
    description: 'Modern irrigation methods and water-saving technologies',
    duration: '18 min read',
    level: 'Beginner',
    detailedContent: [
      {
        heading: 'Importance of Water Conservation',
        content: 'Agriculture accounts for 70% of global freshwater use. Efficient irrigation practices are crucial for sustainable farming, especially in water-scarce regions.'
      },
      {
        heading: 'Drip Irrigation Systems',
        content: 'Drip irrigation delivers water directly to plant roots through a network of tubes and emitters. This method can save up to 50% water compared to traditional flooding.'
      },
      {
        heading: 'Sprinkler Irrigation',
        content: 'Sprinkler systems simulate rainfall by spraying water over crops. They provide uniform coverage and can be automated for optimal timing.'
      },
      {
        heading: 'Mulching Techniques',
        content: 'Applying organic or plastic mulch around plants reduces evaporation from the soil surface, conserving moisture and suppressing weeds.'
      },
      {
        heading: 'Rainwater Harvesting',
        content: 'Collecting and storing rainwater for irrigation purposes can supplement groundwater and reduce dependency on external water sources.'
      },
      {
        heading: 'Smart Irrigation Technologies',
        content: 'Soil moisture sensors and weather-based controllers can optimize watering schedules, ensuring plants receive water only when needed.'
      }
    ]
  },
  {
    category: 'Climate Adaptation',
    title: 'Adapting to Climate Change',
    description: 'Strategies for climate-resilient agriculture',
    duration: '25 min read',
    level: 'Advanced',
    detailedContent: [
      {
        heading: 'Climate Change Impacts on Agriculture',
        content: 'Rising temperatures, changing rainfall patterns, and increased frequency of extreme weather events pose significant challenges to crop production and food security.'
      },
      {
        heading: 'Climate-Resilient Crop Varieties',
        content: 'Developing and adopting drought-tolerant, heat-resistant, and flood-tolerant crop varieties through breeding and genetic modification.'
      },
      {
        heading: 'Diversification Strategies',
        content: 'Growing multiple crops and integrating livestock can reduce risk and improve resilience. Agroforestry systems combine trees with crops for better climate adaptation.'
      },
      {
        heading: 'Water Management Adaptation',
        content: 'Implementing efficient irrigation systems, rainwater harvesting, and groundwater recharge to cope with changing precipitation patterns.'
      },
      {
        heading: 'Soil Conservation Practices',
        content: 'Terracing, contour farming, and conservation tillage help prevent soil erosion and maintain fertility in the face of increased rainfall variability.'
      },
      {
        heading: 'Early Warning Systems',
        content: 'Using weather forecasts and climate models to prepare for extreme events. This includes adjusting planting dates and implementing protective measures.'
      },
      {
        heading: 'Policy and Institutional Support',
        content: 'Government policies promoting climate-smart agriculture, insurance schemes, and extension services are crucial for widespread adoption of adaptation strategies.'
      }
    ]
  }
];

export const equipmentRentalData = [
  {
    equipment: 'Tractor',
    type: 'Agricultural Machinery',
    capacity: '25-50 HP',
    rentalRate: '₹800-1500/day',
    availability: 'Available',
    location: 'Delhi NCR'
  },
  {
    equipment: 'Sprayer',
    type: 'Pest Control Equipment',
    capacity: '10-20 liters',
    rentalRate: '₹300-600/day',
    availability: 'Available',
    location: 'Mumbai'
  },
  {
    equipment: 'Harvester',
    type: 'Harvesting Equipment',
    capacity: 'Combine harvester',
    rentalRate: '₹2000-4000/day',
    availability: 'Limited',
    location: 'Punjab'
  },
  {
    equipment: 'Tiller',
    type: 'Soil Preparation',
    capacity: '5-10 feet width',
    rentalRate: '₹500-1000/day',
    availability: 'Available',
    location: 'Gujarat'
  }
];

export const irrigationGuideData = [
  {
    method: 'Drip Irrigation',
    description: 'Water-efficient method delivering water directly to plant roots',
    advantages: ['90% water saving', 'Reduced weed growth', 'Precise nutrient delivery'],
    suitableFor: 'Vegetables, fruits, high-value crops',
    cost: '₹40,000-80,000 per acre'
  },
  {
    method: 'Sprinkler Irrigation',
    description: 'Overhead watering system simulating rainfall',
    advantages: ['Uniform water distribution', 'Suitable for all crops', 'Easy automation'],
    suitableFor: 'Cereals, pulses, oilseeds',
    cost: '₹25,000-50,000 per acre'
  },
  {
    method: 'Flood Irrigation',
    description: 'Traditional method flooding fields with water',
    advantages: ['Low initial cost', 'Simple operation', 'Suitable for flat land'],
    suitableFor: 'Rice, wheat, sugarcane',
    cost: '₹10,000-20,000 per acre'
  },
  {
    method: 'Center Pivot',
    description: 'Rotating sprinkler system on wheeled towers',
    advantages: ['High efficiency', 'Minimal labor', 'Large area coverage'],
    suitableFor: 'Large farms, commercial crops',
    cost: '₹2,00,000-5,00,000 per acre'
  }
];
