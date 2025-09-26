import React, { useState, useEffect } from 'react';
import { Cloud, Leaf, Sprout, Sun, MapPin } from 'lucide-react';
import NavigationMenu from '../components/NavigationMenu';
import CropCalendar from '../components/resources/CropCalendar';
import WeatherAlerts from '../components/resources/WeatherAlerts';
import MarketPrices from '../components/resources/MarketPrices';
import PestManagement from '../components/resources/PestManagement';
import SoilTesting from '../components/resources/SoilTesting';
import CropInsurance from '../components/resources/CropInsurance';
import LearningCenter from '../components/resources/LearningCenter';
import EquipmentRental from '../components/resources/EquipmentRental';
import IrrigationGuide from '../components/resources/IrrigationGuide';

const RecommendationsPage = ({ user, currentPage, setCurrentPage, onLogout }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [cropRecommendations, setCropRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Delhi');
  const [searchLocation, setSearchLocation] = useState('');
  const [currentResource, setCurrentResource] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // List of popular cities for search suggestions
  const cities = [
    'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad', 'Pune',
    'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore',
    'New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Berlin', 'Dubai',
    'Singapore', 'Hong Kong', 'Shanghai', 'Beijing', 'Seoul', 'Moscow',
    'Rome', 'Madrid', 'Amsterdam', 'Vienna', 'Zurich', 'Copenhagen'
  ];

  // Function to generate crop recommendations based on weather
  const generateCropRecommendations = (weather) => {
    if (!weather) return [];

    const { temp, humidity, rainfall, wind } = weather;
    const crops = [];

    // Temperature-based recommendations
    if (temp >= 25 && temp <= 35) {
      if (humidity > 60) {
        crops.push({
          name: "Rice",
          emoji: "🌾",
          suitability: "Excellent",
          reason: "High temperature and humidity ideal for rice cultivation",
          season: "Kharif",
          growthPeriod: "100-120 days"
        });
      }
      crops.push({
        name: "Cotton",
        emoji: "🌱",
        suitability: "Good",
        reason: "Warm temperature suitable for cotton growth",
        season: "Kharif",
        growthPeriod: "180-200 days"
      });
      crops.push({
        name: "Sugarcane",
        emoji: "🎋",
        suitability: "Good",
        reason: "High temperature promotes sugar accumulation",
        season: "Year-round",
        growthPeriod: "10-12 months"
      });
    }

    if (temp >= 20 && temp <= 30) {
      crops.push({
        name: "Wheat",
        emoji: "🌾",
        suitability: "Excellent",
        reason: "Moderate temperature perfect for wheat cultivation",
        season: "Rabi",
        growthPeriod: "120-150 days"
      });
      if (rainfall < 50) {
        crops.push({
          name: "Barley",
          emoji: "🌾",
          suitability: "Good",
          reason: "Drought-tolerant and suitable for current conditions",
          season: "Rabi",
          growthPeriod: "100-120 days"
        });
      }
    }

    if (temp >= 15 && temp <= 25) {
      crops.push({
        name: "Tomato",
        emoji: "🍅",
        suitability: "Excellent",
        reason: "Cool temperature ideal for tomato growth",
        season: "Rabi/Summer",
        growthPeriod: "70-90 days"
      });
      crops.push({
        name: "Potato",
        emoji: "🥔",
        suitability: "Good",
        reason: "Cool weather promotes tuber development",
        season: "Rabi",
        growthPeriod: "90-120 days"
      });
    }

    // Humidity-based recommendations
    if (humidity > 70) {
      crops.push({
        name: "Coconut",
        emoji: "🥥",
        suitability: "Excellent",
        reason: "High humidity ideal for coconut cultivation",
        season: "Year-round",
        growthPeriod: "Perennial"
      });
    }

    // Rainfall-based recommendations
    if (rainfall > 100) {
      crops.push({
        name: "Maize",
        emoji: "🌽",
        suitability: "Good",
        reason: "Adequate rainfall supports maize growth",
        season: "Kharif",
        growthPeriod: "90-120 days"
      });
    } else if (rainfall < 20) {
      crops.push({
        name: "Millet",
        emoji: "🌾",
        suitability: "Excellent",
        reason: "Drought-resistant crop suitable for low rainfall",
        season: "Kharif",
        growthPeriod: "70-90 days"
      });
      crops.push({
        name: "Sorghum",
        emoji: "🌾",
        suitability: "Good",
        reason: "Highly drought-tolerant cereal crop",
        season: "Kharif",
        growthPeriod: "100-130 days"
      });
    }

    // General recommendations
    crops.push({
      name: "Onion",
      emoji: "🧅",
      suitability: "Good",
      reason: "Adaptable to various weather conditions",
      season: "Rabi",
      growthPeriod: "120-150 days"
    });

    // Remove duplicates and limit to top 6
    const uniqueCrops = crops.filter((crop, index, self) => 
      index === self.findIndex(c => c.name === crop.name)
    ).slice(0, 6);

    return uniqueCrops;
  };

  useEffect(() => {
    console.log('RecommendationsPage: useEffect triggered with location:', location);
    if (!location) return;
    const fetchRecommendations = async () => {
      console.log('RecommendationsPage: fetchRecommendations called for location:', location);
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/api/recommendations?location=${encodeURIComponent(location)}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch recommendations');
        }

        const data = await response.json();
        console.log('RecommendationsPage: API response received:', data);

        const weatherData = {
          temp: data.weather.temperature,
          humidity: data.weather.humidity,
          wind: data.weather.windSpeed,
          rainfall: data.weather.rainfall,
          time: data.weather.time
        };

        setCurrentWeather(weatherData);
        setRecommendations(data.recommendations);
        
        // Generate crop recommendations based on weather data
        const cropRecs = generateCropRecommendations(weatherData);
        setCropRecommendations(cropRecs);
        
        console.log('RecommendationsPage: State updated with new data');
      } catch (err) {
        console.error('RecommendationsPage: Error fetching recommendations:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();

    // Set up auto-refresh every 2 minutes
    const interval = setInterval(fetchRecommendations, 120000); // 2 minutes = 120000ms

    return () => clearInterval(interval);
  }, [location]);

  const handleSearch = () => {
    console.log('RecommendationsPage: handleSearch called');
    console.log('RecommendationsPage: searchLocation before trim:', searchLocation);
    const trimmedLocation = searchLocation.trim();
    console.log('RecommendationsPage: trimmedLocation:', trimmedLocation);
    if (trimmedLocation) {
      console.log('RecommendationsPage: Setting location to:', trimmedLocation);
      setLocation(trimmedLocation);
      setSearchLocation('');
      console.log('RecommendationsPage: Location set, searchLocation cleared');
    } else {
      console.log('RecommendationsPage: No location to set (empty after trim)');
    }
  };

  // Handle resource navigation
  const handleResourceClick = (resourceName) => {
    setCurrentResource(resourceName);
  };

  // Render resource components conditionally
  if (currentResource === 'cropCalendar') {
    return <CropCalendar onBack={() => setCurrentResource(null)} />;
  }
  if (currentResource === 'weatherAlerts') {
    return <WeatherAlerts onBack={() => setCurrentResource(null)} userLocation={location} />;
  }
  if (currentResource === 'marketPrices') {
    return <MarketPrices onBack={() => setCurrentResource(null)} />;
  }
  if (currentResource === 'pestManagement') {
    return <PestManagement onBack={() => setCurrentResource(null)} />;
  }
  if (currentResource === 'soilTesting') {
    return <SoilTesting onBack={() => setCurrentResource(null)} />;
  }
  if (currentResource === 'cropInsurance') {
    return <CropInsurance onBack={() => setCurrentResource(null)} />;
  }
  if (currentResource === 'learningCenter') {
    return <LearningCenter onBack={() => setCurrentResource(null)} />;
  }
  if (currentResource === 'equipmentRental') {
    return <EquipmentRental onBack={() => setCurrentResource(null)} />;
  }
  if (currentResource === 'irrigationGuide') {
    return <IrrigationGuide onBack={() => setCurrentResource(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu user={user} currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🌱 Smart Crop Recommendations</h1>

        {/* Location Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Search Location</h2>
          <div className="flex gap-4 mb-4 relative">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchLocation(value);
                  if (value.trim()) {
                    const filtered = cities.filter(city => city.toLowerCase().startsWith(value.toLowerCase()));
                    setSuggestions(filtered.slice(0, 5));
                  } else {
                    setSuggestions([]);
                  }
                }}
                placeholder="Enter any city name (e.g., Delhi, Mumbai, New York, London, Tokyo)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {suggestions.map((city, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchLocation(city);
                        setSuggestions([]);
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={!searchLocation.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>Current location: <strong>{location}</strong></p>
            <p className="text-xs mt-1">💡 Try cities like: Delhi, Mumbai, Chennai, Bangalore, New York, London, Tokyo, Sydney, Paris, Berlin</p>
          </div>
        </div>

        {/* Current Weather Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Current Weather Conditions</h2>

          {!location ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Location</h3>
              <p className="text-gray-500">Enter a city name above and click Search to get weather-based recommendations</p>
            </div>
          ) : loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Analyzing weather conditions...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  Error: {error}
                </div>
              )}

              {currentWeather && (
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🌡️</div>
                    <h3 className="font-semibold">Temperature</h3>
                    <p className="text-xl font-bold text-blue-600">{currentWeather.temp}°C</p>
                    <p className="text-xs text-gray-500">Current</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">💧</div>
                    <h3 className="font-semibold">Humidity</h3>
                    <p className="text-xl font-bold text-green-600">{currentWeather.humidity}%</p>
                    <p className="text-xs text-gray-500">Relative</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl mb-2">🌬️</div>
                    <h3 className="font-semibold">Wind Speed</h3>
                    <p className="text-xl font-bold text-yellow-600">{currentWeather.wind} km/h</p>
                    <p className="text-xs text-gray-500">10m height</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">🌧️</div>
                    <h3 className="font-semibold">Rainfall</h3>
                    <p className="text-xl font-bold text-purple-600">{currentWeather.rainfall}mm</p>
                    <p className="text-xs text-gray-500">Last hour</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Crop Recommendations based on Climate */}
        {cropRecommendations.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Sprout className="mr-2 text-green-600" />
              Climate-Suitable Crops
            </h2>
            <p className="text-gray-600 mb-6">Based on current weather conditions in {location}</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cropRecommendations.map((crop, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{crop.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{crop.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        crop.suitability === 'Excellent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {crop.suitability}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{crop.reason}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <p><strong>Season:</strong> {crop.season}</p>
                    <p><strong>Growth Period:</strong> {crop.growthPeriod}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Smart Recommendations */}
        <div className="space-y-6">
          {recommendations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-4xl mb-4">🤔</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Analyzing Conditions</h3>
              <p className="text-gray-500">Please wait while we analyze current weather conditions...</p>
            </div>
          ) : (
            recommendations.map((rec, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  rec.type === 'danger' ? 'border-red-500' :
                  rec.type === 'warning' ? 'border-yellow-500' :
                  rec.type === 'success' ? 'border-green-500' :
                  'border-blue-500'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <span className="text-2xl">{rec.title.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        rec.type === 'danger' ? 'text-red-800' :
                        rec.type === 'warning' ? 'text-yellow-800' :
                        rec.type === 'success' ? 'text-green-800' :
                        'text-blue-800'
                      }`}>
                        {rec.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.priority} priority
                      </span>
                    </div>
                    <p className={`mb-4 ${
                      rec.type === 'danger' ? 'text-red-700' :
                      rec.type === 'warning' ? 'text-yellow-700' :
                      rec.type === 'success' ? 'text-green-700' :
                      'text-blue-700'
                    }`}>
                      {rec.message}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Recommended Actions:</h4>
                      <ul className="space-y-1">
                        {rec.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-sm text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Additional Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">📚 Additional Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-2">
                <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Crop Calendar</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Seasonal planting guide for major crops</p>
              <button
                onClick={() => handleResourceClick('cropCalendar')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Calendar →
              </button>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-2">
                <Leaf className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Pest Management</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Weather-based pest prediction and control</p>
            <button
              onClick={() => handleResourceClick('pestManagement')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Guide →
            </button>
            </div>



            <div className="p-4 border rounded-lg hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-2">
                <Cloud className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Weather Alerts</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Set up notifications for extreme weather</p>
              <button
                onClick={() => handleResourceClick('weatherAlerts')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Setup Alerts →
              </button>
            </div>





            <div className="p-4 border rounded-lg hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-2">
                <span className="text-purple-600 mr-2">🎓</span>
                <h3 className="font-semibold text-gray-800">Learning Center</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Agricultural tutorials and best practices</p>
            <button
              onClick={() => handleResourceClick('learningCenter')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Start Learning →
            </button>
            </div>



            <div className="p-4 border rounded-lg hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-2">
                <span className="text-teal-600 mr-2">💧</span>
                <h3 className="font-semibold text-gray-800">Irrigation Guide</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Water management and irrigation techniques</p>
            <button
              onClick={() => handleResourceClick('irrigationGuide')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Guide →
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default RecommendationsPage;