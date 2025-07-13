import React from 'react';
import { Clock, Utensils } from 'lucide-react';

interface FastingStateBannerProps {
  isFasting: boolean;
}

const FastingStateBanner: React.FC<FastingStateBannerProps> = ({ isFasting }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl p-3 md:p-4 border backdrop-blur-xl shadow-lg transition-all duration-500 card-hover ${
      isFasting
        ? 'bg-gradient-to-r from-orange-500/90 to-red-500/90 border-orange-400/30 glow-hover'
        : 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 border-green-400/30 glow-hover'
    }`}>
      {/* Enhanced Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-white float"></div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-white float float-delay-1"></div>
      </div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 ${
            isFasting ? 'glow-hover' : 'glow-hover'
          }`}>
            {isFasting ? (
              <Clock className="h-5 w-5 text-white" />
            ) : (
              <Utensils className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-base md:text-lg font-inter font-bold text-white mb-1">
              {isFasting ? 'Fasting Mode' : 'Feeding Window'}
            </h2>
            <p className="text-xs md:text-sm text-white/90 font-manrope">
              {isFasting 
                ? 'Your body is in fat-burning mode' 
                : 'Time to nourish your body with healthy foods'
              }
            </p>
          </div>
        </div>
        
        <div className="hidden sm:block">
          <div className={`px-3 py-1 rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/30 transition-all duration-300 ${
            isFasting
              ? 'bg-orange-600/80 text-white glow-hover'
              : 'bg-green-600/80 text-white glow-hover'
          }`}>
            {isFasting ? '🔥 Active' : '🍽️ Active'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastingStateBanner;