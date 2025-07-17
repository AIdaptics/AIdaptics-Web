"use client";

import { useEffect } from 'react';

export default function Meeting() {
  useEffect(() => {
    // Load Calendly script dynamically
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="py-16">
      <h2 className="text-4xl font-bold text-center mb-8">
        Book a Free Meeting With Us and Let&apos;s See How We Can Help
      </h2>
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/aidaptics/30min?hide_gdpr_banner=1" 
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
}
