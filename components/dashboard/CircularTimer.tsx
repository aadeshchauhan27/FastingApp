import React from 'react';
import { Flame } from 'lucide-react';

interface CircularTimerProps {
  progress: number;
  timeRemaining: number;
  isFasting: boolean;
  fastingType: string;
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  progress,
  timeRemaining,
  isFasting,
  fastingType,
}) => {
  const circumference = 2 * Math.PI * 140;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };

  const time = formatTime(timeRemaining);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        className="w-80 h-80 transform -rotate-90"
        viewBox="0 0 320 320"
      >
        {/* Background circle */}
        <circle
          cx="160"
          cy="160"
          r="140"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Progress circle */}
        <circle
          cx="160"
          cy="160"
          r="140"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.5))',
          }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#f56747" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Flame icon with animation */}
        <div className="mb-4">
          <div className={`p-4 rounded-full ${
            isFasting 
              ? 'bg-gradient-to-r from-orange-400 to-red-500 animate-pulse-slow' 
              : 'bg-gray-200 dark:bg-gray-700'
          } transition-all duration-500`}>
            <Flame 
              className={`h-8 w-8 ${
                isFasting ? 'text-white' : 'text-gray-400'
              } transition-colors duration-500`}
              style={{
                filter: isFasting ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' : 'none',
              }}
            />
          </div>
        </div>

        {/* Timer display */}
        {isFasting ? (
          <div className="text-center">
            <div className="text-4xl font-inter font-bold text-gray-800 dark:text-gray-200 mb-2">
              {String(time.hours).padStart(2, '0')}:
              {String(time.minutes).padStart(2, '0')}:
              {String(time.seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
              Time Remaining
            </div>
            <div className="mt-2 px-3 py-1 bg-gradient-to-r from-primary-500 to-coral-500 text-white text-xs font-medium rounded-full">
              {Math.round(progress)}% Complete
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200 mb-2">
              Ready to Start
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
              {fastingType} Intermittent Fasting
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularTimer;