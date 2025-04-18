export default function FAQPage() {
  // Placeholder content for FAQ
  const faqs = [
    { q: "How do I receive my virtual product?", a: "Once your payment is confirmed, you will receive an email with instructions and your virtual product key/link." },
    { q: "What payment methods are accepted?", a: "We accept major credit cards, PayPal, and potentially other methods displayed at checkout." },
    { q: "What is the refund policy?", a: "Due to the nature of virtual goods, refunds are generally not provided once the product has been delivered. Please refer to our Terms page for detailed information." },
    { q: "How long does delivery take?", a: "Delivery is typically instant or within a few minutes after payment confirmation. You will be notified via email." },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 glossy-effect">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">{faq.q}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 