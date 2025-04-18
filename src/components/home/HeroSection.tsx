"use client"; // Keep as client if other interactions are planned

const HeroSection = () => {
  return (
    <section
      className="text-center py-16 md:py-24 relative overflow-hidden bg-transparent" // Adjusted padding slightly
    >
      {/* Content container */}
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 text-gray-800 dark:text-gray-100 leading-tight drop-shadow-md">
          Welcome to <span className="text-blue-600 dark:text-blue-400 drop-shadow-[0_2px_3px_rgba(59,130,246,0.5)] animate-neon-flicker">VirtuMart</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-14 max-w-2xl mx-auto">
          Your one-stop shop for digital keys, licenses, and subscriptions. Instant delivery, secure checkout.
        </p>
      </div>
    </section>
  );
};

export default HeroSection; 