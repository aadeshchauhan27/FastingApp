import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Target,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { LocalFastingRecord } from '@/lib/fasting';
import AddManualFastModal from './AddManualFastModal';

interface CalendarPageProps {
  fastingHistory: LocalFastingRecord[];
  onAddManualFast: (record: Omit<LocalFastingRecord, 'id'>) => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ fastingHistory, onAddManualFast }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getFastingDataForDate = (date: Date) => {
    const dateStr = date.toDateString();
    return fastingHistory.filter(record => 
      new Date(record.startTime).toDateString() === dateStr
    );
  };

  const getDateStatus = (date: Date) => {
    const fasts = getFastingDataForDate(date);
    if (fasts.length === 0) return 'none';
    
    const hasCompleted = fasts.some(f => f.completed);
    const hasIncomplete = fasts.some(f => !f.completed);
    
    if (hasCompleted && hasIncomplete) return 'mixed';
    if (hasCompleted) return 'completed';
    return 'incomplete';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthlyStats = useMemo(() => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const monthlyFasts = fastingHistory.filter(record => {
      const recordDate = new Date(record.startTime);
      return recordDate >= monthStart && recordDate <= monthEnd;
    });

    const completed = monthlyFasts.filter(f => f.completed).length;
    const total = monthlyFasts.length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    const fastingDays = new Set(
      monthlyFasts.map(f => new Date(f.startTime).toDateString())
    ).size;

    return {
      total,
      completed,
      completionRate,
      fastingDays
    };
  }, [currentDate, fastingHistory]);

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-8">
      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-coral-500 rounded-xl">
              <CalendarIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
              {monthlyStats.fastingDays}
            </span>
          </div>
          <h3 className="font-manrope font-semibold text-gray-700 dark:text-gray-300">
            Fasting Days
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            This month
          </p>
        </div>

        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
              {monthlyStats.completed}
            </span>
          </div>
          <h3 className="font-manrope font-semibold text-gray-700 dark:text-gray-300">
            Completed
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Out of {monthlyStats.total} fasts
          </p>
        </div>

        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
              {monthlyStats.completionRate.toFixed(0)}%
            </span>
          </div>
          <h3 className="font-manrope font-semibold text-gray-700 dark:text-gray-300">
            Success Rate
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            This month
          </p>
        </div>

        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-center">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-coral-500 text-white rounded-xl hover:from-primary-600 hover:to-coral-600 transition-all duration-300 font-manrope font-medium w-full justify-center"
            >
              <Plus className="h-5 w-5" />
              <span>Add Fast</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-xl bg-white/30 dark:bg-gray-700/30 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-white/20 dark:border-gray-600/20"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-coral-500 text-white rounded-xl hover:from-primary-600 hover:to-coral-600 transition-all duration-300 font-manrope font-medium text-sm"
            >
              Today
            </button>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-xl bg-white/30 dark:bg-gray-700/30 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-white/20 dark:border-gray-600/20"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map(day => (
            <div key={day} className="text-center py-3">
              <span className="text-sm font-manrope font-semibold text-gray-600 dark:text-gray-400">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="aspect-square" />;
            }

            const status = getDateStatus(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = selectedDate?.toDateString() === day.toDateString();
            const fasts = getFastingDataForDate(day);

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square p-2 rounded-xl border-2 transition-all duration-300 relative ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                    : isToday
                    ? 'border-coral-400 bg-coral-50 dark:bg-coral-900/30'
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                } ${
                  status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : status === 'incomplete'
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : status === 'mixed'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30'
                    : 'bg-white/30 dark:bg-gray-700/30'
                } hover:bg-opacity-70`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className={`text-sm font-inter font-medium ${
                    isToday
                      ? 'text-coral-700 dark:text-coral-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {day.getDate()}
                  </span>
                  
                  {fasts.length > 0 && (
                    <div className="flex space-x-1 mt-1">
                      {fasts.slice(0, 3).map((fast, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            fast.completed
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        />
                      ))}
                      {fasts.length > 3 && (
                        <span className="text-xs text-gray-500">+{fasts.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="mt-8 p-6 bg-white/30 dark:bg-gray-700/30 rounded-2xl border border-white/20 dark:border-gray-600/20">
            <h3 className="text-lg font-inter font-bold text-gray-800 dark:text-gray-200 mb-4">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            {getFastingDataForDate(selectedDate).length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-manrope">
                  No fasting sessions on this date
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-primary-500 to-coral-500 text-white rounded-xl hover:from-primary-600 hover:to-coral-600 transition-all duration-300 font-manrope font-medium text-sm"
                >
                  Add Fast for This Date
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {getFastingDataForDate(selectedDate).map((fast) => (
                  <div
                    key={fast.id}
                    className="flex items-center justify-between p-4 bg-white/40 dark:bg-gray-600/40 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        fast.completed 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        {fast.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      
                      <div>
                        <div className="font-inter font-semibold text-gray-800 dark:text-gray-200">
                          {fast.type} Fast
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
                          Started at {new Date(fast.startTime).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-inter font-semibold text-gray-800 dark:text-gray-200">
                        {fast.actualDuration ? formatDuration(fast.actualDuration) : 'In Progress'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
                        Target: {formatDuration(fast.targetDuration)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Manual Fast Modal */}
      {showAddModal && (
        <AddManualFastModal
          onClose={() => setShowAddModal(false)}
          onAdd={onAddManualFast}
          preselectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default CalendarPage;