import React from 'react';

const SplashScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4">
      <div className="text-6xl md:text-8xl mb-6 animate-bounce-slow">☂️</div>
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        RainShield
      </h1>
      <p className="text-xl md:text-2xl font-light tracking-wide opacity-95 mb-12">
        Never get caught in the rain again!
      </p>
      <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-full text-lg md:text-xl">
        🌧️ Grab an umbrella, return it anywhere! ☂️
      </div>
      <div className="absolute bottom-10 text-sm md:text-base font-light opacity-70">
        Made with ❤️ for CU Students
      </div>
    </div>
  );
};

export default SplashScreen;
