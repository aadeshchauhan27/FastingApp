import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'SimpleFastly completely transformed my relationship with food. I\'ve lost 25 pounds and feel more energetic than ever. The app makes fasting so simple and motivating!',
    rating: 5,
    result: 'Lost 25 lbs in 3 months',
  },
  {
    name: 'Mike Chen',
    role: 'Software Developer',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'As a developer, I love the clean interface and smart features. The analytics help me track my progress perfectly. Best fasting app I\'ve ever used.',
    rating: 5,
    result: 'Improved focus by 40%',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Fitness Coach',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'I recommend SimpleFastly to all my clients. The visual progress tracking and motivational quotes keep them engaged and committed to their fasting goals.',
    rating: 5,
    result: 'Recommends to 100+ clients',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-inter font-bold gradient-text mb-6">
            Real Results from Real People
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-manrope max-w-3xl mx-auto">
            Join thousands who have transformed their health and achieved their goals with SimpleFastly
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-coral-500 rounded-full">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-400 font-manrope text-center mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Result Badge */}
              <div className="flex justify-center mb-6">
                <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-manrope font-semibold">
                  {testimonial.result}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-center">
                  <div className="font-inter font-semibold text-gray-800 dark:text-gray-200">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-manrope">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="glass-card rounded-3xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-inter font-bold gradient-text mb-2">50,000+</div>
                <div className="text-gray-600 dark:text-gray-400 font-manrope">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-inter font-bold gradient-text mb-2">4.9/5</div>
                <div className="text-gray-600 dark:text-gray-400 font-manrope">App Store Rating</div>
              </div>
              <div>
                <div className="text-3xl font-inter font-bold gradient-text mb-2">2M+</div>
                <div className="text-gray-600 dark:text-gray-400 font-manrope">Fasting Hours</div>
              </div>
              <div>
                <div className="text-3xl font-inter font-bold gradient-text mb-2">95%</div>
                <div className="text-gray-600 dark:text-gray-400 font-manrope">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}