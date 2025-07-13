import Link from 'next/link';
import { Clock, Mail, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl float" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-coral-500 rounded-full blur-3xl float float-delay-1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Enhanced Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="p-3 bg-gradient-to-r from-primary-500 to-coral-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-inter font-bold gradient-text">SimpleFastly</span>
            </Link>
            
            <p className="text-gray-300 font-manrope mb-8 max-w-md text-lg leading-relaxed">
              Transform your health with the most intuitive intermittent fasting app. 
              Beautiful analytics, personalized insights, and proven results.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h3 className="font-inter font-bold text-xl mb-6 gradient-text">Quick Links</h3>
            <ul className="space-y-3 font-manrope">
              <li><Link href="/dashboard" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Dashboard</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Blog</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">About</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Contact</Link></li>
            </ul>
          </div>

          {/* Enhanced Support */}
          <div>
            <h3 className="font-inter font-bold text-xl mb-6 gradient-text">Support</h3>
            <ul className="space-y-3 font-manrope">
              <li><Link href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Help Center</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-300 font-manrope text-lg">
            © 2024 SimpleFastly. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
              <Mail className="h-4 w-4 text-gray-300" />
            </div>
            <span className="text-gray-300 font-manrope text-lg">hello@simplefastly.app</span>
          </div>
        </div>
      </div>
    </footer>
  );
}