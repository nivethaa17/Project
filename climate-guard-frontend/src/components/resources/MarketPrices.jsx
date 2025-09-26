import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowLeft, RefreshCw } from 'lucide-react';
import { marketPricesData } from '../../data/resourcesData';

const MarketPrices = ({ onBack }) => {
  const [prices, setPrices] = useState(marketPricesData);
  const [loading, setLoading] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('All');

  const refreshPrices = async () => {
    setLoading(true);
    // Simulate API call - replace with actual API
    setTimeout(() => {
      setPrices(prev => prev.map(item => ({
        ...item,
        currentPrice: `₹${(parseInt(item.currentPrice.replace(/[₹,/quintal]/g, '')) + Math.random() * 200 - 100).toFixed(0)}/quintal`,
        change: `${(Math.random() * 10 - 5).toFixed(1)}%`
      })));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-green-600" />
            Market Prices
          </h1>
        </div>
        <button
          onClick={refreshPrices}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Updating...' : 'Refresh'}
        </button>
      </div>

      {/* Market Filter */}
      <div className="mb-6">
        <select
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Markets</option>
          <option value="Delhi">Delhi</option>
          <option value="Punjab">Punjab</option>
          <option value="Gujarat">Gujarat</option>
        </select>
      </div>

      {/* Prices Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prices
          .filter(item => selectedMarket === 'All' || item.market === selectedMarket)
          .map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.crop}</h3>
              <span className="text-sm text-gray-500">{item.market}</span>
            </div>

            <div className="mb-3">
              <p className="text-2xl font-bold text-gray-900">{item.currentPrice}</p>
            </div>

            <div className="flex items-center">
              {item.change.startsWith('+') ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Price Alert Setup */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Price Alert Setup</h2>
        <p className="text-gray-600 mb-4">Get notified when prices reach your target levels</p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
          Setup Price Alerts
        </button>
      </div>
    </div>
  );
};

export default MarketPrices;
