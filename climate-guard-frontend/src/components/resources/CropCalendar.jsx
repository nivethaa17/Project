import React, { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { cropCalendarData } from '../../data/resourcesData';

const CropCalendar = ({ onBack }) => {
  const [selectedSeason, setSelectedSeason] = useState('kharif');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-green-600" />
          Crop Calendar
        </h1>
      </div>

      {/* Season Tabs */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        {['kharif', 'rabi', 'summer'].map((season) => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`flex-1 py-2 px-4 rounded-md capitalize ${
              selectedSeason === season
                ? 'bg-white shadow-sm text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {season} Season
          </button>
        ))}
      </div>

      {/* Crops Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planting Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvest Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cropCalendarData[selectedSeason].map((crop, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{crop.crop}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{crop.plantingMonth}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{crop.harvestMonth}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{crop.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CropCalendar;
