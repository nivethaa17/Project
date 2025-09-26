import React from 'react';
import CropInsurance from '../components/resources/CropInsurance';

const CropInsurancePage = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CropInsurance onBack={handleBack} />
    </div>
  );
};

export default CropInsurancePage;
