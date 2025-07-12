import React from 'react';
import { Clock, Utensils } from 'lucide-react';

interface FastingStateBannerProps {
  isFasting: boolean;
}

const FastingStateBanner: React.FC<FastingStateBannerProps> = ({ isFasting }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 border ${
      isFasting
        ? 'bg-gradient-to-r from-orange-500 to-red-500 border-orange-400'
        : 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400'
    } shadow-lg`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-white"></div>
      </div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-full">
            {isFasting ? (
              <Clock className="h-6 w-6 text-white" />
            ) : (
              <Utensils className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-inter font-bold text-white">
              {isFasting ? 'Fasting Mode' : 'Feeding Window'}
            </h2>
            <p className="text-white/90 font-manrope">
              {isFasting 
                ? 'Your body is in fat-burning mode' 
                : 'Time to nourish your body with healthy foods'
              }
            </p>
          </div>
        </div>
        
        <div className="hidden sm:block">
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            isFasting
              ? 'bg-orange-600 text-white'
              : 'bg-green-600 text-white'
          }`}>
            {isFasting ? '🔥 Active' : '🍽️ Active'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastingStateBanner;