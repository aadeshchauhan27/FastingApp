import React from 'react';

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
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-inter font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Choose Your Fasting Plan
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
          Select the fasting schedule that works best for you
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {fastingTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            disabled={disabled}
            className={`group relative px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
              selectedType === type.value
                ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-coral-50 dark:from-primary-900/30 dark:to-coral-900/30 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-primary-300 dark:hover:border-primary-600'
            } ${
              disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer hover:shadow-md hover:scale-105'
            }`}
          >
            <div className="text-center">
              <div className={`text-2xl font-inter font-bold mb-1 ${
                selectedType === type.value
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-800 dark:text-gray-200'
              }`}>
                {type.label}
              </div>
              <div className={`text-xs font-manrope ${
                selectedType === type.value
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {type.description}
              </div>
            </div>
            
            {selectedType === type.value && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary-500 to-coral-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FastingTypeSelector;