// TODO: Fetch social links dynamically from settings/API in the future
// TODO: Add actual icons (e.g., using react-icons or svgs)

const SocialBar = () => {
  // Placeholder data
  const socialLinks = [
    { name: "Telegram", url: "#" },
    { name: "Discord", url: "#" },
    { name: "Twitter", url: "#" },
  ];

  return (
    <div className="flex justify-center space-x-5">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
          aria-label={`Follow us on ${link.name}`}
        >
          {/* Replace with actual icon component or SVG */}
          <span className="text-sm font-medium">{link.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialBar; 