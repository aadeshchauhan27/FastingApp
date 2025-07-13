import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const MotivationalQuote: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Your body is healing, keep going! 💪",
    "Every hour of fasting is a step towards better health 🌟",
    "You're stronger than your cravings ⚡",
    "Autophagy is working its magic right now ✨",
    "Your willpower is inspiring! 🔥",
    "This fast is an investment in your future self 🚀",
    "Rest and nourish your body wisely 🥗",
    "Quality nutrition fuels your next fast 🌱",
    "Listen to your body and eat mindfully 🧘",
    "Every meal is an opportunity to nourish yourself 💚",
    "Prepare your mind for the next fasting journey 🎯",
    "Balance is the key to sustainable health 🌈",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="relative">
      <div className="glass-card-hover rounded-3xl p-8 card-hover">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="p-3 bg-gradient-to-r from-primary-500/20 to-coral-500/20 rounded-2xl backdrop-blur-sm border border-white/30">
              <Quote className="h-6 w-6 text-primary-500" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xl font-manrope font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              {quotes[currentQuote]}
            </p>
          </div>
        </div>
        
        {/* Enhanced quote indicator dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentQuote
                  ? 'bg-gradient-to-r from-primary-500 to-coral-500 w-12 glow'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-3'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuote;