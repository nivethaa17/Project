import React, { useState } from 'react';
import { Bug, ArrowLeft, Search, Filter } from 'lucide-react';
import { pestData } from '../../data/resourcesData';

const PestManagement = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');

  // Get unique crops from pest data
  const allCrops = ['all', ...new Set(pestData.flatMap(pest => pest.crops))];

  // Filter pests based on search and crop selection
  const filteredPests = pestData.filter(pest => {
    const matchesSearch = pest.pest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pest.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pest.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === 'all' || pest.crops.includes(selectedCrop);
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold flex items-center">
          <Bug className="w-8 h-8 mr-3 text-green-600" />
          Pest Management
        </h1>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search pests, symptoms, or treatments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            {allCrops.map(crop => (
              <option key={crop} value={crop}>
                {crop === 'all' ? 'All Crops' : crop}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pest Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPests.map((pest, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{pest.pest}</h3>

            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Affected Crops:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {pest.crops.map((crop, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Symptoms:</span>
                <p className="text-gray-600 text-sm mt-1">{pest.symptoms}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Weather Conditions:</span>
                <p className="text-gray-600 text-sm mt-1">{pest.weather}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Treatment:</span>
                <p className="text-gray-600 text-sm mt-1">{pest.treatment}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Prevention:</span>
                <p className="text-gray-600 text-sm mt-1">{pest.prevention}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPests.length === 0 && (
        <div className="text-center py-12">
          <Bug className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pests found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default PestManagement;
