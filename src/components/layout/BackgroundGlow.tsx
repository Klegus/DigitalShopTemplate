"use client";

// Removed useEffect and useState as mouse tracking is no longer needed

const BackgroundGlow = () => {
  // No mouse state or effect needed

  return (
    <div
      // Increase base opacity for light mode, adjust dark mode opacity
      // Example: opacity-75 for light, dark:opacity-50 for dark
      className="pointer-events-none fixed inset-0 z-0 opacity-75 dark:opacity-50 animate-pulse-glow-soft blur-3xl transition-opacity duration-500"
      style={{
        background:
          // Slightly stronger alpha (e.g., 0.25)
          'radial-gradient(1000px circle at center 20%, rgba(59, 130, 246, 0.25), transparent 75%)', // Adjusted size and transparency stop
      }}
    ></div>
  );
};

export default BackgroundGlow; 