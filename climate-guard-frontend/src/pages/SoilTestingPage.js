import React from 'react';
import SoilTesting from '../components/resources/SoilTesting';

const SoilTestingPage = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SoilTesting onBack={handleBack} />
    </div>
  );
};

export default SoilTestingPage;
