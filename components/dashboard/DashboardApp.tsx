'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Flame, Target, Activity, Calendar } from 'lucide-react';
import CircularTimer from './CircularTimer';
import FastingTypeSelector from './FastingTypeSelector';
import MotivationalQuote from './MotivationalQuote';
import FastingStateBanner from './FastingStateBanner';
import StatsPage from './StatsPage';
import CalendarPage from './CalendarPage';
import { useDarkMode } from '../DarkModeProvider';
import { useAuth } from '../AuthProvider';
import { FastingService, LocalFastingRecord } from '@/lib/fasting';

function getActiveTab() {
  if (typeof window !== 'undefined' && window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    if (["timer", "progress", "stats", "calendar"].includes(hash)) return hash;
  }
  return 'timer';
}

export default function DashboardApp() {
  const { darkMode } = useDarkMode();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(getActiveTab());
  const [fastingType, setFastingType] = useState('16:8');
  const [isFasting, setIsFasting] = useState(false);
  const [fastingStartTime, setFastingStartTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [fastingHistory, setFastingHistory] = useState<LocalFastingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for hash changes to update the active tab
  useEffect(() => {
    const onHashChange = () => setActiveTab(getActiveTab());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Load fasting history
  useEffect(() => {
    const loadFastingHistory = async () => {
      setIsLoading(true);
      try {
        if (user) {
          // Load from Supabase if user is authenticated
          const history = await FastingService.getFastingHistory(user.id);
          setFastingHistory(history);
        } else {
          // Load from local storage if no user
          const history = FastingService.getLocalFastingHistory();
          setFastingHistory(history);
        }
      } catch (error) {
        console.error('Error loading fasting history:', error);
        // Fallback to local storage
        const history = FastingService.getLocalFastingHistory();
        setFastingHistory(history);
      } finally {
        setIsLoading(false);
      }
    };

    loadFastingHistory();
  }, [user]);

  // Migrate local data to Supabase when user signs in
  useEffect(() => {
    const migrateData = async () => {
      if (user) {
        try {
          await FastingService.migrateLocalToSupabase(user.id);
          // Reload history after migration
          const history = await FastingService.getFastingHistory(user.id);
          setFastingHistory(history);
        } catch (error) {
          console.error('Error migrating data:', error);
        }
      }
    };

    migrateData();
  }, [user]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFasting && fastingStartTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const startTime = fastingStartTime.getTime();
        const duration = getFastingDuration() * 60 * 60 * 1000; // Convert hours to milliseconds
        const elapsed = now - startTime;
        const remaining = Math.max(0, duration - elapsed);
        
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          setIsFasting(false);
          completeFast();
          setFastingStartTime(null);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFasting, fastingStartTime, fastingType]);

  const getFastingDuration = () => {
    const durations: { [key: string]: number } = {
      '16:8': 16,
      '18:6': 18,
      '20:4': 20,
    };
    return durations[fastingType] || 16;
  };

  const getProgress = () => {
    if (!isFasting || !fastingStartTime) return 0;
    const duration = getFastingDuration() * 60 * 60 * 1000;
    const elapsed = new Date().getTime() - fastingStartTime.getTime();
    return Math.min(100, (elapsed / duration) * 100);
  };

  const saveFastingRecord = async (record: LocalFastingRecord) => {
    try {
      if (user) {
        await FastingService.saveFastingRecord(record, user.id);
      } else {
        // Save to local storage if no user
        const history = FastingService.getLocalFastingHistory();
        history.unshift(record);
        FastingService.saveLocalFastingHistory(history);
      }
    } catch (error) {
      console.error('Error saving fasting record:', error);
      // Fallback to local storage
      const history = FastingService.getLocalFastingHistory();
      history.unshift(record);
      FastingService.saveLocalFastingHistory(history);
    }
  };

  const completeFast = async () => {
    if (fastingStartTime) {
      const endTime = new Date();
      const actualDuration = (endTime.getTime() - fastingStartTime.getTime()) / (1000 * 60 * 60);
      const targetDuration = getFastingDuration();
      
      const record: LocalFastingRecord = {
        id: Date.now().toString(),
        type: fastingType,
        startTime: fastingStartTime,
        endTime,
        targetDuration,
        actualDuration,
        completed: actualDuration >= targetDuration * 0.9, // 90% completion counts as success
      };
      
      await saveFastingRecord(record);
      setFastingHistory(prev => [record, ...prev]);
    }
  };

  const startFast = () => {
    setIsFasting(true);
    setFastingStartTime(new Date());
    const duration = getFastingDuration() * 60 * 60 * 1000;
    setTimeRemaining(duration);
  };

  const stopFast = async () => {
    setIsFasting(false);
    if (fastingStartTime) {
      const endTime = new Date();
      const actualDuration = (endTime.getTime() - fastingStartTime.getTime()) / (1000 * 60 * 60);
      const targetDuration = getFastingDuration();
      
      const record: LocalFastingRecord = {
        id: Date.now().toString(),
        type: fastingType,
        startTime: fastingStartTime,
        endTime,
        targetDuration,
        actualDuration,
        completed: false, // Manually stopped
      };
      
      await saveFastingRecord(record);
      setFastingHistory(prev => [record, ...prev]);
    }
    setFastingStartTime(null);
    setTimeRemaining(0);
  };

  const addManualFast = async (record: Omit<LocalFastingRecord, 'id'>) => {
    const newRecord: LocalFastingRecord = {
      ...record,
      id: Date.now().toString(),
      manuallyAdded: true,
    };
    
    await saveFastingRecord(newRecord);
    setFastingHistory(prev => [newRecord, ...prev].sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-coral-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-manrope">Loading your fasting data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-all duration-500">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-coral-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500" />
      
      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 lg:px-6 py-4 md:py-6">
        {activeTab === 'timer' && (
          <div className="space-y-4 md:space-y-6">
            {/* Fasting State Banner */}
            <div className="mb-2 md:mb-4">
              <FastingStateBanner isFasting={isFasting} />
            </div>

            {/* Timer and Controls Section */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 gap-4 md:gap-8">
              {/* Plan selector and action button on the left (md+), above on mobile */}
              <div className="flex-1 flex flex-col items-center md:items-start space-y-4 md:space-y-6 order-1 md:order-1">
                <div className="w-full">
                  <FastingTypeSelector
                    selectedType={fastingType}
                    onTypeChange={setFastingType}
                    disabled={isFasting}
                  />
                </div>
                <div className="flex justify-center w-full">
                  {!isFasting ? (
                    <button
                      onClick={startFast}
                      className="group relative px-6 py-3 btn-primary text-base md:text-lg glow-hover min-w-[160px]"
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Start Fasting</span>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={stopFast}
                      className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-inter font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[160px]"
                    >
                      <div className="flex items-center space-x-2">
                        <Flame className="h-5 w-5" />
                        <span>Stop Fasting</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
              {/* Timer on the right (md+), below on mobile */}
              <div className="flex-1 flex flex-col items-center md:items-end order-2 md:order-2">
                <div className="w-full max-w-xs md:max-w-sm">
                  <CircularTimer
                    progress={getProgress()}
                    timeRemaining={timeRemaining}
                    isFasting={isFasting}
                    fastingType={fastingType}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-4 md:space-y-6">
            <div className="glass-card-hover rounded-2xl p-4 md:p-6">
              <h2 className="text-xl font-inter font-bold gradient-text mb-4">Your Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-xl font-inter font-bold gradient-text mb-1">
                    {fastingHistory.filter(f => f.completed).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-manrope">Completed Fasts</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-xl font-inter font-bold gradient-text mb-1">
                    {fastingHistory.length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-manrope">Total Fasts</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-xl font-inter font-bold gradient-text mb-1">
                    {fastingHistory.length > 0 
                      ? Math.round((fastingHistory.filter(f => f.completed).length / fastingHistory.length) * 100)
                      : 0}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-manrope">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <StatsPage fastingHistory={fastingHistory} onAddManualFast={addManualFast} />
        )}

        {activeTab === 'calendar' && (
          <CalendarPage fastingHistory={fastingHistory} onAddManualFast={addManualFast} />
        )}
      </main>
    </div>
  );
}