import React, { useState } from 'react';
import { Cloud } from 'lucide-react';

const NavigationMenu = ({ user, currentPage, setCurrentPage, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getAvailablePages = () => {
    const role = user?.role;
    // Base pages without profile
    const basePages = ['home', 'weather'];

    let pages = [];

      switch (role) {
        case 'admin':
          pages = [...basePages, 'reports', 'alerts', 'recommendations', 'pest_management', 'agriculture', 'solar_monitoring'];
          break;
        case 'government_officer':
          pages = [...basePages, 'reports', 'alerts', 'recommendations', 'pest_management', 'agriculture', 'solar_monitoring'];
          break;
        case 'field_officer':
          pages = [...basePages, 'alerts', 'recommendations', 'pest_management', 'agriculture', 'solar_monitoring'];
          break;
        case 'farmer':
          pages = [...basePages, 'recommendations', 'pest_management', 'agriculture', 'solar_monitoring'];
          break;
        case 'researcher':
          pages = [...basePages, 'reports', 'recommendations', 'pest_management', 'agriculture', 'solar_monitoring'];
          break;
        default:
          pages = [...basePages, 'solar_monitoring'];
      }

    // Always add profile at the end
    pages.push('profile');

    return pages;
  };

  const availablePages = getAvailablePages();

  const getPageLabel = (page) => {
    const labels = {
      home: 'Home',
      weather: 'Weather Reports',
      reports: 'Reports & Analytics',
      alerts: 'Alerts & Notifications',
      recommendations: 'Smart Recommendations',
      pest_management: 'Pest Management',
      agriculture: 'Agriculture',
      solar_monitoring: 'Solar Monitoring',
      profile: 'Profile'
    };
    return labels[page] || page;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Cloud className="h-8 w-8 text-blue-600 mr-3" />
            <span className="text-xl font-bold text-gray-900">Climate Guard</span>
          </div>

          {/* Dropdown Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                <span className="mr-2">Menu</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    {availablePages.map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition duration-200 ${
                          currentPage === page ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {getPageLabel(page)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-right">
              <span className="text-gray-700 block text-sm">Welcome, {user?.name}</span>
              <span className="text-xs text-gray-500">({user?.role?.replace('_', ' ')})</span>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default NavigationMenu;
