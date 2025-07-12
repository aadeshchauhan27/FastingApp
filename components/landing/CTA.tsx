import Link from 'next/link';
import { ArrowRight, Smartphone, Clock } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-coral-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-primary-500 to-coral-500 rounded-2xl">
                <Clock className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-inter font-bold gradient-text mb-6">
              Ready to Transform Your Health?
            </h2>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 dark:text-gray-300 font-manrope max-w-2xl mx-auto mb-12">
              Join thousands who have already started their intermittent fasting journey. 
              Start free today and see results in just one week.
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-coral-500 rounded-full" />
                <span className="font-manrope text-gray-600 dark:text-gray-400">Free to start</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-coral-500 rounded-full" />
                <span className="font-manrope text-gray-600 dark:text-gray-400">No credit card required</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-coral-500 rounded-full" />
                <span className="font-manrope text-gray-600 dark:text-gray-400">Cancel anytime</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="group btn-primary px-8 py-4 text-lg flex items-center space-x-3"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/blog"
                className="flex items-center space-x-3 px-8 py-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-2xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 font-manrope font-medium text-gray-700 dark:text-gray-300"
              >
                <span>Learn More</span>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 pt-8 border-t border-white/20 dark:border-gray-700/20">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-manrope">
                Trusted by 50,000+ users worldwide • 4.9/5 rating • Featured in Health & Fitness
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}