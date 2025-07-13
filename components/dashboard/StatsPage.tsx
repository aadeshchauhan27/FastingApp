import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Clock, 
  Target, 
  Award, 
  Plus,
  BookOpen,
  ExternalLink,
  Filter,
  CheckCircle,
  XCircle,
  Flame
} from 'lucide-react';
import { LocalFastingRecord } from '@/lib/fasting';
import AddManualFastModal from './AddManualFastModal';
import Image from 'next/image';

interface StatsPageProps {
  fastingHistory: LocalFastingRecord[];
  onAddManualFast: (record: Omit<LocalFastingRecord, 'id'>) => void;
}

const StatsPage: React.FC<StatsPageProps> = ({ fastingHistory, onAddManualFast }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const blogPosts = [
    {
      title: "The Science Behind Intermittent Fasting",
      excerpt: "Discover how intermittent fasting affects your metabolism and cellular health...",
      readTime: "5 min read",
      category: "Science",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Best Foods to Break Your Fast",
      excerpt: "Learn which nutrients your body craves most after a fasting period...",
      readTime: "3 min read",
      category: "Nutrition",
      image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Managing Hunger During Extended Fasts",
      excerpt: "Practical tips and strategies to overcome hunger pangs and stay motivated...",
      readTime: "4 min read",
      category: "Tips",
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const calculateStreak = (history: LocalFastingRecord[]) => {
    if (history.length === 0) return 0;
    
    const sortedHistory = [...history]
      .filter(r => r.completed)
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (const record of sortedHistory) {
      const recordDate = new Date(record.startTime);
      recordDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const filteredHistory = useMemo(() => {
    let filtered = fastingHistory;

    // Time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      if (timeFilter === 'week') {
        cutoff.setDate(now.getDate() - 7);
      } else if (timeFilter === 'month') {
        cutoff.setMonth(now.getMonth() - 1);
      }
      filtered = filtered.filter(record => new Date(record.startTime) >= cutoff);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(record => 
        statusFilter === 'completed' ? record.completed : !record.completed
      );
    }

    return filtered;
  }, [fastingHistory, timeFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = fastingHistory.length;
    const completed = fastingHistory.filter(r => r.completed).length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    
    const thisWeek = fastingHistory.filter(record => {
      const recordDate = new Date(record.startTime);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return recordDate >= weekAgo;
    });

    const thisMonth = fastingHistory.filter(record => {
      const recordDate = new Date(record.startTime);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return recordDate >= monthAgo;
    });

    const averageDuration = fastingHistory.length > 0 
      ? fastingHistory.reduce((sum, record) => sum + (record.actualDuration || 0), 0) / fastingHistory.length
      : 0;

    const currentStreak = calculateStreak(fastingHistory);

    return {
      total,
      completed,
      completionRate,
      thisWeek: thisWeek.length,
      thisMonth: thisMonth.length,
      averageDuration,
      currentStreak
    };
  }, [fastingHistory]);

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-coral-500 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
              {stats.completed}
            </span>
          </div>
          <h3 className="font-manrope font-semibold text-gray-700 dark:text-gray-300">
            Completed Fasts
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stats.completionRate.toFixed(1)}% success rate
          </p>
        </div>

        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
              {stats.currentStreak}
            </span>
          </div>
          <h3 className="font-manrope font-semibold text-gray-700 dark:text-gray-300">
            Current Streak
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Consecutive days
          </p>
        </div>

        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
              {formatDuration(stats.averageDuration)}
            </span>
          </div>
          <h3 className="font-manrope font-semibold text-gray-700 dark:text-gray-300">
            Average Duration
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Per fast session
          </p>
        </div>

        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <CalendarIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
              {stats.thisWeek}
            </span>
          </div>
          <h3 className="font-manrope font-semibold text-gray-700 dark:text-gray-300">
            This Week
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stats.thisMonth} this month
          </p>
        </div>
      </div>

      {/* Fasting History */}
      <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200 mb-4 sm:mb-0">
            Fasting History
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as any)}
                className="px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-manrope focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-manrope focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-coral-500 text-white rounded-xl hover:from-primary-600 hover:to-coral-600 transition-all duration-300 font-manrope font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add Fast</span>
            </button>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-inter font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No fasting records found
            </h3>
            <p className="text-gray-500 dark:text-gray-500 font-manrope">
              Start your first fast or add a manual entry to see your history here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 bg-white/30 dark:bg-gray-700/30 rounded-xl border border-white/20 dark:border-gray-600/20 hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    record.completed 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    {record.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-inter font-semibold text-gray-800 dark:text-gray-200">
                        {record.type} Fast
                      </span>
                      {record.manuallyAdded && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-manrope">
                          Manual
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
                      {new Date(record.startTime).toLocaleDateString()} at{' '}
                      {new Date(record.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-inter font-semibold text-gray-800 dark:text-gray-200">
                    {record.actualDuration ? formatDuration(record.actualDuration) : 'In Progress'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
                    Target: {formatDuration(record.targetDuration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blog Section */}
      <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200">
              Fasting Insights
            </h2>
          </div>
          
          <button className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 font-manrope font-medium">
            <span>View All</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="group bg-white/30 dark:bg-gray-700/30 rounded-2xl overflow-hidden border border-white/20 dark:border-gray-600/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-coral-500 text-white text-xs font-manrope font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-manrope">
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="font-inter font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 font-manrope line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Manual Fast Modal */}
      {showAddModal && (
        <AddManualFastModal
          onClose={() => setShowAddModal(false)}
          onAdd={onAddManualFast}
        />
      )}
    </div>
  );
};

export default StatsPage;