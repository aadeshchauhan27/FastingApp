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
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
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
        className="w-80 h-80 transform -rotate-90 relative z-10"
        viewBox="0 0 320 320"
      >
        {/* Background track circle for contrast */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="transparent"
          className="dark:stroke-gray-700"
        />
        {/* Moving progress ring with enhanced animation and glow */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: isFasting ? 'drop-shadow(0 0 32px rgba(20, 184, 166, 0.7)) drop-shadow(0 0 16px #f97316)' : 'drop-shadow(0 0 16px rgba(20, 184, 166, 0.3))',
            transformOrigin: 'center',
            animation: isFasting ? 'pulse-slow' : 'none',
          }}
        />

        {/* Animated dots around the ring */}
        {isFasting && (
          <>
            <circle
              cx="160"
              cy="20"
              r="4"
              fill="url(#gradient)"
              className="animate-pulse"
              style={{ animationDelay: '0s' }}
            />
            <circle
              cx="300"
              cy="160"
              r="4"
              fill="url(#gradient)"
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
            <circle
              cx="160"
              cy="300"
              r="4"
              fill="url(#gradient)"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <circle
              cx="20"
              cy="160"
              r="4"
              fill="url(#gradient)"
              className="animate-pulse"
              style={{ animationDelay: '1.5s' }}
            />
          </>
        )}
        
        {/* Enhanced gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="25%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="75%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content with glassmorphism */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        {/* Enhanced flame icon with glassmorphism */}
        <div className="mb-6">
          <div className={`p-5 rounded-2xl backdrop-blur-sm border border-white/30 transition-all duration-500 ${
            isFasting 
              ? 'bg-gradient-to-r from-orange-500/80 to-red-500/80 animate-pulse-slow glow-hover' 
              : 'bg-white/20 dark:bg-gray-800/20'
          }`}>
            <Flame 
              className={`h-10 w-10 ${
                isFasting ? 'text-white' : 'text-gray-400'
              } transition-all duration-500`}
              style={{
                filter: isFasting ? 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.8))' : 'none',
              }}
            />
          </div>
        </div>

        {/* Enhanced timer display */}
        {isFasting ? (
          <div className="text-center">
            <div className="text-5xl font-inter font-bold gradient-text mb-3 text-shadow">
              {String(time.hours).padStart(2, '0')}:
              {String(time.minutes).padStart(2, '0')}:
              {String(time.seconds).padStart(2, '0')}
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400 font-manrope mb-4">
              Time Remaining
            </div>
            <div className="px-6 py-2 bg-gradient-to-r from-primary-500/90 to-coral-500/90 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold rounded-2xl glow">
              {Math.round(progress)}% Complete
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-3xl font-inter font-bold gradient-text mb-3">
              Ready to Start
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400 font-manrope mb-4">
              {fastingType} Intermittent Fasting
            </div>
            <div className="px-6 py-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-2xl">
              Click Start to Begin
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularTimer;