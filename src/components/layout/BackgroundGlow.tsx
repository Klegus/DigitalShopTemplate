"use client"; // This component handles mouse interaction

import { useState, MouseEvent, useEffect } from 'react';

const BackgroundGlow = () => {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      // Update CSS variables directly on the body for global access
      document.body.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.body.style.setProperty('--mouse-y', `${event.clientY}px`);
    };

    // Add listener to window
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Optional: remove CSS variables on cleanup
      document.body.style.removeProperty('--mouse-x');
      document.body.style.removeProperty('--mouse-y');
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-30 transition duration-300 animate-pulse-glow-soft"
      style={{
        background:
          // CSS variables are now set globally on the body
          'radial-gradient(1200px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 70%)',
      }}
    ></div>
  );
};

export default BackgroundGlow; 