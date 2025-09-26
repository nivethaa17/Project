import React, { useState } from 'react';
import { Shield, ArrowLeft, Search, Info } from 'lucide-react';
import { cropInsuranceData } from '../../data/resourcesData';

const CropInsurance = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter schemes based on search
  const filteredSchemes = cropInsuranceData.filter(scheme =>
    scheme.scheme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.coverage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.benefits.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold flex items-center">
          <Shield className="w-8 h-8 mr-3 text-purple-600" />
          Crop Insurance Schemes
        </h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search insurance schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid md:grid-cols-1 gap-6">
        {filteredSchemes.map((scheme, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{scheme.scheme}</h3>
              <Info className="w-5 h-5 text-purple-500" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-700">Coverage:</span>
                <p className="text-gray-600 text-sm mt-1">{scheme.coverage}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Premium:</span>
                <p className="text-gray-600 text-sm mt-1">{scheme.premium}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Benefits:</span>
                <p className="text-gray-600 text-sm mt-1">{scheme.benefits}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Eligibility:</span>
                <p className="text-gray-600 text-sm mt-1">{scheme.eligibility}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                Apply Now
              </button>
              <button className="border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 px-4 rounded-lg font-medium transition duration-200">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No schemes found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default CropInsurance;
