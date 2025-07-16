'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Flame, Target, Activity, Calendar } from 'lucide-react';
import CircularTimer from './CircularTimer';
import FastingTypeSelector from './FastingTypeSelector';
import MotivationalQuote from './MotivationalQuote';
import FastingStateBanner from './FastingStateBanner';
import StatsPage from './StatsPage';
import CalendarPage from './CalendarPage';
import { useDarkMode } from '../DarkModeProvider';
import type { User } from '@supabase/supabase-js';
import { FastingService, LocalFastingRecord } from '@/lib/fasting';

interface DashboardAppProps {
  user: User | null;
}

function getActiveTab() {
  if (typeof window !== 'undefined' && window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    if (["timer", "progress", "stats", "calendar"].includes(hash)) return hash;
  }
  return 'timer';
}

export default function DashboardApp({ user }: DashboardAppProps) {
  const { darkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState(getActiveTab());
  const [fastingType, setFastingType] = useState('16:8');
  const [activeFastingType, setActiveFastingType] = useState<string | null>(null);
  const [isFasting, setIsFasting] = useState(false);
  const [fastingStartTime, setFastingStartTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [fastingHistory, setFastingHistory] = useState<LocalFastingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [resumeNotification, setResumeNotification] = useState<string | null>(null);

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
          // Assuming FastingService.getFastingHistory is updated to accept user.id
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

  // Add useEffect to load timer state from localStorage on mount
  useEffect(() => {
    async function hydrateState() {
      if (user) {
        // Check Supabase for in-progress fast
        const history = await FastingService.getFastingHistory(user.id);
        const inProgress = history.find(
          r => !r.completed && !r.endTime
        );
        if (inProgress) {
          setIsFasting(true);
          setFastingStartTime(new Date(inProgress.startTime));
          setActiveFastingType(inProgress.type);
          setFastingType(inProgress.type);
          localStorage.setItem('inProgressFastingId', inProgress.id);
          localStorage.setItem('isFasting', 'true');
          localStorage.setItem('fastingStartTime', new Date(inProgress.startTime).toISOString());
          localStorage.setItem('activeFastingType', inProgress.type);
          setResumeNotification(`Resumed your in-progress fast: ${inProgress.type} started at ${new Date(inProgress.startTime).toLocaleString()}`);
        } else {
          // No in-progress fast in DB, fall back to localStorage
          const savedIsFasting = localStorage.getItem('isFasting');
          const savedStartTime = localStorage.getItem('fastingStartTime');
          const savedFastingType = localStorage.getItem('fastingType');
          const savedActiveFastingType = localStorage.getItem('activeFastingType');
          if (savedIsFasting === 'true' && savedStartTime) {
            setIsFasting(true);
            setFastingStartTime(new Date(savedStartTime));
          }
          if (savedFastingType) {
            setFastingType(savedFastingType);
          }
          if (savedActiveFastingType) {
            setActiveFastingType(savedActiveFastingType);
            setFastingType(savedActiveFastingType);
          }
        }
      } else {
        // Not authenticated, use localStorage only
        const savedIsFasting = localStorage.getItem('isFasting');
        const savedStartTime = localStorage.getItem('fastingStartTime');
        const savedFastingType = localStorage.getItem('fastingType');
        const savedActiveFastingType = localStorage.getItem('activeFastingType');
        if (savedIsFasting === 'true' && savedStartTime) {
          setIsFasting(true);
          setFastingStartTime(new Date(savedStartTime));
        }
        if (savedFastingType) {
          setFastingType(savedFastingType);
        }
        if (savedActiveFastingType) {
          setActiveFastingType(savedActiveFastingType);
        }
      }
      setHydrated(true);
    }
    hydrateState();
  }, [user]);

  // Persist timer state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isFasting', isFasting ? 'true' : 'false');
    if (fastingStartTime) {
      localStorage.setItem('fastingStartTime', fastingStartTime.toISOString());
    } else {
      localStorage.removeItem('fastingStartTime');
    }
    localStorage.setItem('fastingType', fastingType);
    if (activeFastingType) {
      localStorage.setItem('activeFastingType', activeFastingType);
    } else {
      localStorage.removeItem('activeFastingType');
    }
  }, [isFasting, fastingStartTime, fastingType, activeFastingType]);

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

  // Periodically sync fasting progress to Supabase for authenticated users
  useEffect(() => {
    if (!user || !isFasting || !fastingStartTime) {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
        syncIntervalRef.current = null;
      }
      return;
    }

    const syncFastingProgress = async () => {
      const inProgressId = localStorage.getItem('inProgressFastingId');
      const record = {
        id: inProgressId || Date.now().toString(),
        type: activeFastingType || fastingType,
        startTime: fastingStartTime,
        targetDuration: getFastingDuration(),
        completed: false,
      };
      if (!inProgressId) {
        await FastingService.saveFastingRecord(record, user.id);
        localStorage.setItem('inProgressFastingId', record.id);
      } else {
        await FastingService.updateFastingRecord(record, user.id);
      }
    };

    // Initial sync
    syncFastingProgress();
    // Set interval for periodic sync
    syncIntervalRef.current = setInterval(syncFastingProgress, 30000);

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
        syncIntervalRef.current = null;
      }
    };
  }, [user, isFasting, fastingStartTime, fastingType, activeFastingType]);

  const getFastingDuration = () => {
    const durations: { [key: string]: number } = {
      '16:8': 16,
      '18:6': 18,
      '20:4': 20,
    };
    // Use locked type if fasting, else use selector
    const type = isFasting ? activeFastingType || fastingType : fastingType;
    return durations[type] || 16;
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
      const inProgressId = localStorage.getItem('inProgressFastingId');
      const record: LocalFastingRecord = {
        id: inProgressId || Date.now().toString(),
        type: activeFastingType || fastingType,
        startTime: fastingStartTime,
        endTime,
        targetDuration,
        actualDuration,
        completed: actualDuration >= targetDuration * 0.9, // 90% completion counts as success
      };
      if (user && inProgressId) {
        await FastingService.updateFastingRecord(record, user.id);
      } else {
        await saveFastingRecord(record);
      }
      setFastingHistory(prev => [record, ...prev]);
      localStorage.removeItem('inProgressFastingId');
      setActiveFastingType(null);
    }
  };

  const startFast = () => {
    setIsFasting(true);
    setFastingStartTime(new Date());
    setActiveFastingType(fastingType);
    const duration = getFastingDuration() * 60 * 60 * 1000;
    setTimeRemaining(duration);
  };

  const stopFast = async () => {
    setIsFasting(false);
    if (fastingStartTime) {
      const endTime = new Date();
      const actualDuration = (endTime.getTime() - fastingStartTime.getTime()) / (1000 * 60 * 60);
      const targetDuration = getFastingDuration();
      const inProgressId = localStorage.getItem('inProgressFastingId');
      const record: LocalFastingRecord = {
        id: inProgressId || Date.now().toString(),
        type: activeFastingType || fastingType,
        startTime: fastingStartTime,
        endTime,
        targetDuration,
        actualDuration,
        completed: false, // Manually stopped
      };
      if (user && inProgressId) {
        await FastingService.updateFastingRecord(record, user.id);
      } else {
        await saveFastingRecord(record);
      }
      setFastingHistory(prev => [record, ...prev]);
      localStorage.removeItem('inProgressFastingId');
      setActiveFastingType(null);
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

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-coral-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-manrope">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col transition-all duration-500">
      {/* Notification for resumed fast */}
      {resumeNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-manrope text-lg animate-fade-in">
          {resumeNotification}
          <button
            className="ml-4 text-white font-bold text-xl leading-none focus:outline-none"
            onClick={() => setResumeNotification(null)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-coral-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500" />
      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 lg:px-6 pt-20 pb-4 md:pb-6 flex-1 overflow-hidden">
        {/* Timer Tab - always visible */}
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
                      className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-inter font-bold text-lg shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-200 flex items-center space-x-3"
                    >
                      <Clock className="h-6 w-6" />
                      <span>Start Fasting</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopFast}
                      className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-inter font-bold text-lg shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-200 flex items-center space-x-3"
                    >
                      <Flame className="h-6 w-6" />
                      <span>Stop Fasting</span>
                    </button>
                  )}
                </div>
                {/* If not signed in, show CTA to sign in for more features */}
                {!user && (
                  <div className="mt-6 p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow text-center">
                    <p className="font-inter text-base md:text-lg text-gray-700 dark:text-gray-200 mb-2">Sign in to save your fasts, view stats, and access your fasting history across devices!</p>
                    <a href="/auth/login" className="btn-primary inline-block mt-2">Sign In or Create Account</a>
                  </div>
                )}
              </div>
              {/* Timer on the right (md+), below on mobile */}
              <div className="flex-1 flex flex-col items-center md:items-end order-2 md:order-2">
                <div className="w-full max-w-xs md:max-w-sm">
                  <CircularTimer
                    progress={getProgress()}
                    timeRemaining={timeRemaining}
                    isFasting={isFasting}
                    fastingType={isFasting ? activeFastingType || fastingType : fastingType}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Other tabs: show sign-in message if not authenticated */}
        {!user && activeTab !== 'timer' && (
          <div className="flex flex-col items-center justify-center">
            <div className="p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow text-center max-w-md">
              <h2 className="text-2xl font-inter font-bold mb-2 gradient-text">Sign In Required</h2>
              <p className="text-gray-700 dark:text-gray-200 font-manrope mb-4">Please sign in to access your fasting stats, progress, and calendar features.</p>
              <a href="/auth/login" className="btn-primary inline-block">Sign In or Create Account</a>
            </div>
          </div>
        )}
        {/* Other tabs only for signed in users */}
        {user && activeTab === 'progress' && (
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
        {user && activeTab === 'stats' && (
          <StatsPage fastingHistory={fastingHistory} onAddManualFast={addManualFast} />
        )}
        {user && activeTab === 'calendar' && (
          <CalendarPage fastingHistory={fastingHistory} onAddManualFast={addManualFast} />
        )}
      </main>
    </div>
  );
}