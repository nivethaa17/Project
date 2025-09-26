import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { learningCenterData } from '../../data/resourcesData';

const LearningCenter = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTutorials, setExpandedTutorials] = useState(new Set());

  // Filter tutorials based on search
  const filteredTutorials = learningCenterData.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (index) => {
    const newExpanded = new Set(expandedTutorials);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTutorials(newExpanded);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-indigo-600" />
          Learning Center
        </h1>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search tutorials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Tutorials List */}
      <div className="space-y-6">
        {filteredTutorials.map((tutorial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{tutorial.description}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Category: {tutorial.category}</span>
              <span>Level: {tutorial.level}</span>
              <span>Duration: {tutorial.duration}</span>
            </div>
            <button onClick={() => toggleExpand(index)} className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800">
              {expandedTutorials.has(index) ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
              {expandedTutorials.has(index) ? 'Collapse' : 'Read More'}
            </button>
            {expandedTutorials.has(index) && (
              <div className="mt-4 space-y-4">
                {tutorial.detailedContent.map((section, secIndex) => (
                  <div key={secIndex}>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{section.heading}</h4>
                    <p className="text-gray-700">{section.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tutorials found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default LearningCenter;
