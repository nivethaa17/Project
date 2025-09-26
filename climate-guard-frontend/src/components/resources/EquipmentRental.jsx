import React, { useState } from 'react';
import { Truck, ArrowLeft, Search, Filter } from 'lucide-react';
import { equipmentRentalData } from '../../data/resourcesData';

const EquipmentRental = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Get unique locations
  const allLocations = ['all', ...new Set(equipmentRentalData.map(equip => equip.location))];

  // Filter equipment based on search and location
  const filteredEquipment = equipmentRentalData.filter(equip => {
    const matchesSearch = equip.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equip.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || equip.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold flex items-center">
          <Truck className="w-8 h-8 mr-3 text-yellow-600" />
          Equipment Rental
        </h1>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search equipment or types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none bg-white"
          >
            {allLocations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredEquipment.map((equip, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{equip.equipment}</h3>

            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Type:</span>
                <span className="text-gray-600 ml-2">{equip.type}</span>
              </div>

              <div>
                <span className="font-medium text-gray-700">Capacity:</span>
                <span className="text-gray-600 ml-2">{equip.capacity}</span>
              </div>

              <div>
                <span className="font-medium text-gray-700">Rental Rate:</span>
                <span className="text-gray-600 ml-2">{equip.rentalRate}</span>
              </div>

              <div>
                <span className="font-medium text-gray-700">Availability:</span>
                <span className="text-gray-600 ml-2">{equip.availability}</span>
              </div>

              <div>
                <span className="font-medium text-gray-700">Location:</span>
                <span className="text-gray-600 ml-2">{equip.location}</span>
              </div>

              <button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No equipment found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EquipmentRental;
