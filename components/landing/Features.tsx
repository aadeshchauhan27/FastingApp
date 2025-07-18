import { Clock, BarChart3, Calendar, Flame, Target, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Smart Timer',
    description: 'Beautiful circular timer with real-time progress tracking and motivational insights.',
    gradient: 'from-primary-500 to-coral-500',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Detailed statistics, trends, and insights to optimize your fasting journey.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Calendar,
    title: 'Visual Calendar',
    description: 'Track your fasting history with an intuitive calendar view and success indicators.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Flame,
    title: 'Fasting States',
    description: 'Clear visual indicators for fasting and feeding windows with progress animations.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Target,
    title: 'Multiple Methods',
    description: 'Support for 16:8, 18:6, and 20:4 fasting schedules with personalized recommendations.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Responsive design that works perfectly on all devices with offline capabilities.',
    gradient: 'from-cyan-500 to-blue-500',
  },
];

export default function Features() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-inter font-bold gradient-text mb-6 slide-up">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-manrope max-w-3xl mx-auto slide-up animation-delay-200">
            Powerful features designed to make intermittent fasting simple, effective, and sustainable
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group glass-card-hover rounded-3xl p-8 card-hover slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center mb-8">
                  <div className={`p-5 bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-lg glow group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-inter font-bold gradient-text mb-4 text-center">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 font-manrope text-center leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}