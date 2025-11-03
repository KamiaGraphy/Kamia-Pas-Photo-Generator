import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Kamia Pas Photo Generator
      </h1>
      <p className="text-gray-400 mt-2 text-md md:text-lg">
        Unggah foto Anda, dan biarkan AI menyempurnakannya menjadi pas photo profesional.
      </p>
    </header>
  );
};

export default Header;
