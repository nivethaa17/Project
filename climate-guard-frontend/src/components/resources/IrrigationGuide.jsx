import React, { useState } from 'react';
import { Droplets, ArrowLeft, Search } from 'lucide-react';
import { irrigationGuideData } from '../../data/resourcesData';

const IrrigationGuide = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter methods based on search
  const filteredMethods = irrigationGuideData.filter(method =>
    method.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.suitableFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold flex items-center">
          <Droplets className="w-8 h-8 mr-3 text-cyan-600" />
          Irrigation Guide
        </h1>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search irrigation methods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Methods Grid */}
      <div className="grid md:grid-cols-1 gap-6">
        {filteredMethods.map((method, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.method}</h3>
            <p className="text-gray-600 text-sm mb-4">{method.description}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-700">Advantages:</span>
                <ul className="text-gray-600 text-sm mt-1 list-disc list-inside">
                  {method.advantages.map((advantage, idx) => (
                    <li key={idx}>{advantage}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-medium text-gray-700">Suitable For:</span>
                <p className="text-gray-600 text-sm mt-1">{method.suitableFor}</p>
              </div>
            </div>

            <div className="mt-4">
              <span className="font-medium text-gray-700">Estimated Cost:</span>
              <span className="text-gray-600 ml-2">{method.cost}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                Learn More
              </button>
              <button className="border border-cyan-600 text-cyan-600 hover:bg-cyan-50 py-2 px-4 rounded-lg font-medium transition duration-200">
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMethods.length === 0 && (
        <div className="text-center py-12">
          <Droplets className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No methods found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default IrrigationGuide;
