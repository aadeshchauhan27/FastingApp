'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Clock, Flame, Target, Activity, Calendar } from 'lucide-react';
import CircularTimer from './CircularTimer';
import FastingTypeSelector from './FastingTypeSelector';
import MotivationalQuote from './MotivationalQuote';
import FastingStateBanner from './FastingStateBanner';
import StatsPage from './StatsPage';
import CalendarPage from './CalendarPage';
import Link from 'next/link';

export interface FastingRecord {
  id: string;
  type: string;
  startTime: Date;
  endTime?: Date;
  targetDuration: number; // in hours
  actualDuration?: number; // in hours
  completed: boolean;
  manuallyAdded?: boolean;
}

export default function DashboardApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('timer');
  const [fastingType, setFastingType] = useState('16:8');
  const [isFasting, setIsFasting] = useState(false);
  const [fastingStartTime, setFastingStartTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [fastingHistory, setFastingHistory] = useState<FastingRecord[]>([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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

  const completeFast = () => {
    if (fastingStartTime) {
      const endTime = new Date();
      const actualDuration = (endTime.getTime() - fastingStartTime.getTime()) / (1000 * 60 * 60);
      const targetDuration = getFastingDuration();
      
      const record: FastingRecord = {
        id: Date.now().toString(),
        type: fastingType,
        startTime: fastingStartTime,
        endTime,
        targetDuration,
        actualDuration,
        completed: actualDuration >= targetDuration * 0.9, // 90% completion counts as success
      };
      
      setFastingHistory(prev => [record, ...prev]);
    }
  };

  const startFast = () => {
    setIsFasting(true);
    setFastingStartTime(new Date());
    const duration = getFastingDuration() * 60 * 60 * 1000;
    setTimeRemaining(duration);
  };

  const stopFast = () => {
    setIsFasting(false);
    if (fastingStartTime) {
      const endTime = new Date();
      const actualDuration = (endTime.getTime() - fastingStartTime.getTime()) / (1000 * 60 * 60);
      const targetDuration = getFastingDuration();
      
      const record: FastingRecord = {
        id: Date.now().toString(),
        type: fastingType,
        startTime: fastingStartTime,
        endTime,
        targetDuration,
        actualDuration,
        completed: false, // Manually stopped
      };
      
      setFastingHistory(prev => [record, ...prev]);
    }
    setFastingStartTime(null);
    setTimeRemaining(0);
  };

  const addManualFast = (record: Omit<FastingRecord, 'id'>) => {
    const newRecord: FastingRecord = {
      ...record,
      id: Date.now().toString(),
      manuallyAdded: true,
    };
    setFastingHistory(prev => [newRecord, ...prev].sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    ));
  };

  const tabs = [
    { id: 'timer', label: 'Timer', icon: Clock },
    { id: 'progress', label: 'Progress', icon: Target },
    { id: 'stats', label: 'Stats', icon: Activity },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark' : ''}`}>
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-coral-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border-b border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-coral-500 rounded-xl shadow-lg">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-inter font-bold bg-gradient-to-r from-primary-600 to-coral-600 bg-clip-text text-transparent">
                FastFlow
              </h1>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/blog"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-manrope"
              >
                Blog
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-16 z-40 backdrop-blur-xl bg-white/20 dark:bg-gray-900/20 border-b border-white/10 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-manrope font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary-500 to-coral-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'timer' && (
          <div className="space-y-8">
            {/* Fasting State Banner */}
            <FastingStateBanner isFasting={isFasting} />

            {/* Main Timer Card */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
              <div className="text-center space-y-8">
                {/* Fasting Type Selector */}
                <FastingTypeSelector
                  selectedType={fastingType}
                  onTypeChange={setFastingType}
                  disabled={isFasting}
                />

                {/* Circular Timer */}
                <CircularTimer
                  progress={getProgress()}
                  timeRemaining={timeRemaining}
                  isFasting={isFasting}
                  fastingType={fastingType}
                />

                {/* Action Button */}
                <div className="flex justify-center">
                  {!isFasting ? (
                    <button
                      onClick={startFast}
                      className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-coral-500 hover:from-primary-600 hover:to-coral-600 text-white font-inter font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-glow"
                    >
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5" />
                        <span>Start Fasting</span>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={stopFast}
                      className="px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white font-inter font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Stop Fast
                    </button>
                  )}
                </div>

                {/* Motivational Quote */}
                <MotivationalQuote isFasting={isFasting} />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <div className="text-center">
                  <div className="text-3xl font-inter font-bold text-primary-600 dark:text-primary-400">
                    {fastingType}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
                    Current Plan
                  </div>
                </div>
              </div>

              <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <div className="text-center">
                  <div className="text-3xl font-inter font-bold text-coral-600 dark:text-coral-400">
                    {isFasting ? Math.round(getProgress()) : 0}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
                    Progress
                  </div>
                </div>
              </div>

              <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <div className="text-center">
                  <div className="text-3xl font-inter font-bold text-indigo-600 dark:text-indigo-400">
                    0
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
                    Streak Days
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <StatsPage 
            fastingHistory={fastingHistory} 
            onAddManualFast={addManualFast}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarPage 
            fastingHistory={fastingHistory} 
            onAddManualFast={addManualFast}
          />
        )}

        {activeTab === 'progress' && (
          <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200 mb-2">
                Progress Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-manrope">
                Advanced progress analytics coming soon!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}