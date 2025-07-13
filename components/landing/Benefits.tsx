import { Heart, Zap, Brain, Scale } from 'lucide-react';

const benefits = [
  {
    icon: Scale,
    title: 'Weight Loss',
    description: 'Burn fat more efficiently and maintain a healthy weight with proven fasting protocols.',
    stats: '15-20% average weight loss',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Heart Health',
    description: 'Improve cardiovascular health, reduce blood pressure, and lower cholesterol levels.',
    stats: '25% reduction in heart disease risk',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    icon: Brain,
    title: 'Mental Clarity',
    description: 'Enhanced focus, improved cognitive function, and better mental performance.',
    stats: '40% improvement in focus',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Zap,
    title: 'Energy Boost',
    description: 'Stable energy levels throughout the day without the typical afternoon crashes.',
    stats: '60% more sustained energy',
    gradient: 'from-yellow-500 to-orange-500',
  },
];

export default function Benefits() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-inter font-bold gradient-text mb-6 slide-up">
            Science-Backed Benefits
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-manrope max-w-3xl mx-auto slide-up animation-delay-200">
            Discover the proven health benefits that thousands of users have experienced with intermittent fasting
          </p>
        </div>

        {/* Enhanced Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="glass-card-hover rounded-3xl p-8 card-hover slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className={`p-5 bg-gradient-to-r ${benefit.gradient} rounded-2xl shadow-lg glow group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-inter font-bold gradient-text mb-3">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 font-manrope mb-4 leading-relaxed text-lg">
                      {benefit.description}
                    </p>
                    
                    <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${benefit.gradient} bg-opacity-10 backdrop-blur-sm border border-white/30 rounded-2xl`}>
                      <span className="text-sm font-manrope font-semibold text-gray-700 dark:text-gray-300">
                        {benefit.stats}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Research Note */}
        <div className="glass-card-hover rounded-3xl p-8 text-center card-hover slide-up animation-delay-800">
          <h3 className="text-3xl font-inter font-bold gradient-text mb-6">
            Backed by Scientific Research
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-manrope max-w-2xl mx-auto text-lg leading-relaxed">
            Our recommendations are based on peer-reviewed studies and clinical research from leading institutions 
            including Harvard Medical School, Johns Hopkins, and the National Institute of Health.
          </p>
        </div>
      </div>
    </section>
  );
}