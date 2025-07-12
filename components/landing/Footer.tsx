import Link from 'next/link';
import { Clock, Mail, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-coral-500 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-inter font-bold">FastFlow</span>
            </Link>
            
            <p className="text-gray-400 font-manrope mb-6 max-w-md">
              Transform your health with the most intuitive intermittent fasting app. 
              Beautiful analytics, personalized insights, and proven results.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-inter font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 font-manrope">
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-inter font-semibold mb-4">Support</h3>
            <ul className="space-y-2 font-manrope">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 font-manrope text-sm">
            © 2024 FastFlow. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400 font-manrope text-sm">hello@fastflow.app</span>
          </div>
        </div>
      </div>
    </footer>
  );
}