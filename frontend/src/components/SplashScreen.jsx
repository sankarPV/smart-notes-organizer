import React from 'react';

export default function SplashScreen({ isVisible }) {
  return (
    <div
      className={`fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center z-50 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <img
        src="/logo/notewhiz-logo.png"
        alt="NoteWhiz Logo"
        className="w-24 h-24 mb-4 animate-pulse"
      />
      <p className="text-xl font-semibold animate-bounce">Organizing your thoughts...</p>
    </div>
  );
}
