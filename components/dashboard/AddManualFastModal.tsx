import React, { useState } from 'react';
import { X, Clock, Calendar, Target } from 'lucide-react';
import { FastingRecord } from './DashboardApp';

interface AddManualFastModalProps {
  onClose: () => void;
  onAdd: (record: Omit<FastingRecord, 'id'>) => void;
  preselectedDate?: Date | null;
}

const AddManualFastModal: React.FC<AddManualFastModalProps> = ({ 
  onClose, 
  onAdd, 
  preselectedDate 
}) => {
  const [fastingType, setFastingType] = useState('16:8');
  const [startDate, setStartDate] = useState(
    preselectedDate?.toISOString().split('T')[0] || 
    new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState('18:00');
  const [completed, setCompleted] = useState(true);
  const [actualDuration, setActualDuration] = useState('');

  const fastingTypes = [
    { value: '16:8', label: '16:8', hours: 16 },
    { value: '18:6', label: '18:6', hours: 18 },
    { value: '20:4', label: '20:4', hours: 20 },
  ];

  const selectedType = fastingTypes.find(type => type.value === fastingType);
  const targetDuration = selectedType?.hours || 16;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(startDateTime);
    
    let finalActualDuration = targetDuration;
    
    if (completed && actualDuration) {
      const [hours, minutes] = actualDuration.split(':').map(Number);
      finalActualDuration = hours + (minutes / 60);
    } else if (!completed) {
      // For incomplete fasts, calculate based on a reasonable assumption
      finalActualDuration = targetDuration * 0.7; // Assume 70% completion
    }
    
    endDateTime.setHours(endDateTime.getHours() + finalActualDuration);

    const record: Omit<FastingRecord, 'id'> = {
      type: fastingType,
      startTime: startDateTime,
      endTime: endDateTime,
      targetDuration,
      actualDuration: finalActualDuration,
      completed,
      manuallyAdded: true,
    };

    onAdd(record);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
            Add Manual Fast
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fasting Type */}
          <div>
            <label className="block text-sm font-manrope font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Fasting Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {fastingTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFastingType(type.value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    fastingType === type.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-primary-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`font-inter font-bold ${
                      fastingType === type.value
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {type.label}
                    </div>
                    <div className={`text-xs font-manrope ${
                      fastingType === type.value
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {type.hours}h fast
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-manrope font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-manrope"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-manrope font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="h-4 w-4 inline mr-2" />
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-manrope"
                required
              />
            </div>
          </div>

          {/* Completion Status */}
          <div>
            <label className="block text-sm font-manrope font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Fast Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCompleted(true)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  completed
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50'
                }`}
              >
                <div className="text-center">
                  <div className={`font-inter font-semibold ${
                    completed ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Completed
                  </div>
                  <div className={`text-xs font-manrope ${
                    completed ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Successfully finished
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setCompleted(false)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  !completed
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50'
                }`}
              >
                <div className="text-center">
                  <div className={`font-inter font-semibold ${
                    !completed ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Incomplete
                  </div>
                  <div className={`text-xs font-manrope ${
                    !completed ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Stopped early
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Actual Duration (for completed fasts) */}
          {completed && (
            <div>
              <label className="block text-sm font-manrope font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Target className="h-4 w-4 inline mr-2" />
                Actual Duration (optional)
              </label>
              <input
                type="time"
                value={actualDuration}
                onChange={(e) => setActualDuration(e.target.value)}
                placeholder="HH:MM"
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent font-manrope"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-manrope">
                Leave empty to use target duration ({targetDuration} hours)
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 font-manrope font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-coral-500 text-white rounded-xl hover:from-primary-600 hover:to-coral-600 transition-all duration-300 font-manrope font-medium"
            >
              Add Fast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddManualFastModal;