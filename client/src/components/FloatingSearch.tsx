import React from 'react';

const FloatingSearchBar: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 bg-white rounded-lg p-2 shadow-md">
      <input
        type="text"
        placeholder="Search..."
        className="w-40 bg-gray-100 rounded-md px-3 py-1 outline-none"
      />
    </div>
  );
};

export default FloatingSearchBar;
