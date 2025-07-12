import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

interface MotivationalQuoteProps {
  isFasting: boolean;
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ isFasting }) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const fastingQuotes = [
    "Your body is healing, keep going! 💪",
    "Every hour of fasting is a step towards better health 🌟",
    "You're stronger than your cravings ⚡",
    "Autophagy is working its magic right now ✨",
    "Your willpower is inspiring! 🔥",
    "This fast is an investment in your future self 🚀",
  ];

  const restingQuotes = [
    "Rest and nourish your body wisely 🥗",
    "Quality nutrition fuels your next fast 🌱",
    "Listen to your body and eat mindfully 🧘",
    "Every meal is an opportunity to nourish yourself 💚",
    "Prepare your mind for the next fasting journey 🎯",
    "Balance is the key to sustainable health 🌈",
  ];

  const quotes = isFasting ? fastingQuotes : restingQuotes;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-600/30">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Quote className="h-5 w-5 text-primary-500 mt-1" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-manrope font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              {quotes[currentQuote]}
            </p>
          </div>
        </div>
        
        {/* Quote indicator dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentQuote
                  ? 'bg-gradient-to-r from-primary-500 to-coral-500 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuote;