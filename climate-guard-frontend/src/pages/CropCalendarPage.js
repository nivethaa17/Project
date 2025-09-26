import React from 'react';

const CropCalendarPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">📅 Crop Calendar</h1>
      <p className="mb-4 text-gray-700">
        This page provides a seasonal planting guide for major crops.
      </p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Seasonal Planting Guide</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-2">Crop</th>
              <th className="border border-gray-300 px-4 py-2">Sowing Season</th>
              <th className="border border-gray-300 px-4 py-2">Harvest Season</th>
              <th className="border border-gray-300 px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Rice</td>
              <td className="border border-gray-300 px-4 py-2">June - July</td>
              <td className="border border-gray-300 px-4 py-2">September - October</td>
              <td className="border border-gray-300 px-4 py-2">Requires standing water</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">Wheat</td>
              <td className="border border-gray-300 px-4 py-2">October - November</td>
              <td className="border border-gray-300 px-4 py-2">March - April</td>
              <td className="border border-gray-300 px-4 py-2">Prefers cooler temperatures</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Cotton</td>
              <td className="border border-gray-300 px-4 py-2">April - May</td>
              <td className="border border-gray-300 px-4 py-2">September - October</td>
              <td className="border border-gray-300 px-4 py-2">Requires warm climate</td>
            </tr>
            {/* Add more crops as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CropCalendarPage;
