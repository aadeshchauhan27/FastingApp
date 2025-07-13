import React from 'react';
import { Check } from 'lucide-react';

interface FastingTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  disabled?: boolean;
}

const FastingTypeSelector: React.FC<FastingTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  disabled = false,
}) => {
  const fastingTypes = [
    { value: '16:8', label: '16:8', description: '16h fast, 8h eating' },
    { value: '18:6', label: '18:6', description: '18h fast, 6h eating' },
    { value: '20:4', label: '20:4', description: '20h fast, 4h eating' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-inter font-bold gradient-text mb-3">
          Choose Your Fasting Plan
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-manrope">
          Select the fasting schedule that works best for you
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {fastingTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            disabled={disabled}
            className={`group relative px-8 py-6 rounded-3xl border-2 transition-all duration-300 card-hover ${
              selectedType === type.value
                ? 'border-primary-500/50 bg-gradient-to-r from-primary-500/20 to-coral-500/20 backdrop-blur-xl shadow-lg glow-hover'
                : 'border-white/30 dark:border-gray-600/30 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl hover:border-primary-300/50 dark:hover:border-primary-600/50 hover:bg-white/40 dark:hover:bg-gray-800/40'
            } ${
              disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer hover:scale-105'
            }`}
          >
            <div className="text-center">
              <div className={`text-3xl font-inter font-bold mb-2 ${
                selectedType === type.value
                  ? 'gradient-text'
                  : 'text-gray-800 dark:text-gray-200'
              }`}>
                {type.label}
              </div>
              <div className={`text-sm font-manrope ${
                selectedType === type.value
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {type.description}
              </div>
            </div>
            
            {selectedType === type.value && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-500 to-coral-500 rounded-full flex items-center justify-center shadow-lg glow">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FastingTypeSelector;