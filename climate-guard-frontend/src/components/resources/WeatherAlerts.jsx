import React, { useState } from 'react';
import { Cloud, Bell, ArrowLeft } from 'lucide-react';

const WeatherAlerts = ({ onBack, userLocation }) => {
  const [alerts, setAlerts] = useState({
    temperature: { enabled: false, threshold: 40 },
    rainfall: { enabled: false, threshold: 100 },
    humidity: { enabled: false, threshold: 90 },
    windSpeed: { enabled: false, threshold: 50 }
  });
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleAlertToggle = (type) => {
    setAlerts(prev => ({
      ...prev,
      [type]: { ...prev[type], enabled: !prev[type].enabled }
    }));
  };

  const handleThresholdChange = (type, value) => {
    setAlerts(prev => ({
      ...prev,
      [type]: { ...prev[type], threshold: parseInt(value) }
    }));
  };

  const handleSave = () => {
    // In production, send to your backend API
    console.log('Saving weather alerts:', { alerts, phone, email, userLocation });
    alert('Weather alerts setup successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold flex items-center">
          <Cloud className="w-8 h-8 mr-3 text-blue-600" />
          Weather Alerts Setup
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Alert Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-500" />
            Alert Thresholds
          </h2>

          {Object.entries(alerts).map(([type, config]) => (
            <div key={type} className="mb-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium capitalize">{type.replace(/([A-Z])/g, ' $1')}</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={() => handleAlertToggle(type)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {config.enabled && (
                <div className="flex items-center">
                  <label className="text-sm text-gray-600 mr-2">Alert when above:</label>
                  <input
                    type="number"
                    value={config.threshold}
                    onChange={(e) => handleThresholdChange(type, e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-sm text-gray-500 ml-1">
                    {type === 'temperature' ? '°C' :
                     type === 'rainfall' ? 'mm' :
                     type === 'humidity' ? '%' :
                     'km/h'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Current Location:</strong> {userLocation || 'Delhi'}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Alerts will be sent for weather conditions in this location.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
            >
              Save Alert Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlerts;
