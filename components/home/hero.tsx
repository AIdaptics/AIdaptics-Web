import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isLargeDevice, setIsLargeDevice] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // Function to determine if device is PC/laptop/tablet
      const checkDeviceSize = () => {
        setIsLargeDevice(window.innerWidth >= 768); // 768px is typical tablet breakpoint
      };
      
      // Check on initial load
      checkDeviceSize();
      
      // Add event listener for window resize
      window.addEventListener('resize', checkDeviceSize);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkDeviceSize);
    }
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900 overflow-hidden">
 {/* Background Video - only shown on larger devices */}
      {isLargeDevice ? (
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            style={{ minWidth: '100%', minHeight: '100%' }}
          >
            <source src="/videos/clarity-stream.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        /* Content for smaller devices */
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AIdaptics
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10">
            We turn Complex ideas into effortless solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-300">
              Get Started
            </button>
            <button className="mt-4 sm:mt-0 px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-900 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;