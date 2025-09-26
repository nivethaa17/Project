import React from 'react';
import PestManagement from '../components/resources/PestManagement';
import NavigationMenu from '../components/NavigationMenu';

const PestManagementPage = ({ user, currentPage, setCurrentPage, onLogout }) => {
  const handleBack = () => {
    // Navigate back to home or previous page
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu user={user} currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={onLogout} />
      <PestManagement onBack={handleBack} />
    </div>
  );
};

export default PestManagementPage;
