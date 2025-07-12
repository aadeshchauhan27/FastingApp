import { Heart, Zap, Brain, Scale } from 'lucide-react';

const benefits = [
  {
    icon: Scale,
    title: 'Weight Loss',
    description: 'Burn fat more efficiently and maintain a healthy weight with proven fasting protocols.',
    stats: '15-20% average weight loss',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    icon: Heart,
    title: 'Heart Health',
    description: 'Improve cardiovascular health, reduce blood pressure, and lower cholesterol levels.',
    stats: '25% reduction in heart disease risk',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    icon: Brain,
    title: 'Mental Clarity',
    description: 'Enhanced focus, improved cognitive function, and better mental performance.',
    stats: '40% improvement in focus',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    icon: Zap,
    title: 'Energy Boost',
    description: 'Stable energy levels throughout the day without the typical afternoon crashes.',
    stats: '60% more sustained energy',
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
  },
];

export default function Benefits() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-inter font-bold gradient-text mb-6">
            Science-Backed Benefits
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-manrope max-w-3xl mx-auto">
            Discover the proven health benefits that thousands of users have experienced with intermittent fasting
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex items-start space-x-6">
                  <div className={`p-4 ${benefit.bg} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-inter font-bold text-gray-800 dark:text-gray-200 mb-3">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 font-manrope mb-4 leading-relaxed">
                      {benefit.description}
                    </p>
                    
                    <div className={`inline-flex items-center px-4 py-2 ${benefit.bg} rounded-full`}>
                      <span className={`text-sm font-manrope font-semibold ${benefit.color}`}>
                        {benefit.stats}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Research Note */}
        <div className="glass-card rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-inter font-bold gradient-text mb-4">
            Backed by Scientific Research
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-manrope max-w-2xl mx-auto">
            Our recommendations are based on peer-reviewed studies and clinical research from leading institutions 
            including Harvard Medical School, Johns Hopkins, and the National Institute of Health.
          </p>
        </div>
      </div>
    </section>
  );
}