import Link from 'next/link';
import { ArrowRight, Play, Star, Users, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-coral-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-coral-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social Proof */}
        <div className="flex items-center justify-center space-x-2 mb-8 animate-fade-in">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-gray-600 dark:text-gray-400 font-manrope text-sm">
            Trusted by 50,000+ users
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-inter font-bold gradient-text mb-6 animate-slide-up">
          Transform Your Health with
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-primary-500">
            Smart Fasting
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-manrope max-w-3xl mx-auto mb-12 animate-slide-up animation-delay-200">
          The most intuitive intermittent fasting app with beautiful analytics, 
          personalized insights, and proven results. Start your transformation today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up animation-delay-400">
          <Link
            href="/dashboard"
            className="group btn-primary px-8 py-4 text-lg flex items-center space-x-3"
          >
            <span>Start Fasting Free</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button className="flex items-center space-x-3 px-8 py-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-2xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 font-manrope font-medium text-gray-700 dark:text-gray-300">
            <Play className="h-5 w-5" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up animation-delay-600">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-primary-500 to-coral-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-inter font-bold gradient-text mb-2">50K+</div>
            <div className="text-gray-600 dark:text-gray-400 font-manrope">Active Users</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-inter font-bold gradient-text mb-2">4.9/5</div>
            <div className="text-gray-600 dark:text-gray-400 font-manrope">App Rating</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-inter font-bold gradient-text mb-2">2M+</div>
            <div className="text-gray-600 dark:text-gray-400 font-manrope">Fasting Hours</div>
          </div>
        </div>
      </div>
    </section>
  );
}