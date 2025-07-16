'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X, BookOpen, Target, Activity, Clock, Calendar, User, LogOut } from 'lucide-react';
import { useDarkMode } from './DarkModeProvider';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Only 'Blog' remains in main navigation
  const navigation = [
    { name: 'Blog', href: '/blog', icon: BookOpen },
  ];

  // Dashboard tabs
  const dashboardTabs = [
    { id: 'timer', label: 'Timer', icon: Clock },
    { id: 'progress', label: 'Progress', icon: Target },
    { id: 'stats', label: 'Stats', icon: Activity },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  // Determine if we are on the dashboard route
  const isDashboard = pathname.startsWith('/dashboard');

  // Dashboard tab state (persisted in URL hash for SPA feel)
  const currentTab = typeof window !== 'undefined' && window.location.hash
    ? window.location.hash.replace('#', '')
    : 'timer';

  const setTab = (tab: string) => {
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/dashboard#timer');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/dashboard#timer" className="flex items-center space-x-3 group" onClick={handleLogoClick}>
          <div className="relative p-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden">
            <div className="relative z-10">
              <svg className="h-8 w-8 text-white dark:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-inter font-bold text-gray-900 dark:text-white transition-all duration-300">
              SimpleFastly
            </h1>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-manrope -mt-1">
              Smart Fasting
            </span>
          </div>
        </a>

        {/* Centered Navigation: Blog + Dashboard Tabs */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center space-x-2 md:space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-manrope font-medium group px-2 py-2 transform hover:scale-105 hover:bg-white/30 dark:hover:bg-gray-800/30 rounded-xl"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {/* Dashboard tabs always visible */}
            <div className="flex items-center space-x-1 ml-4">
              {dashboardTabs.map((tab) => {
                const Icon = tab.icon;
                const selected = (typeof window !== 'undefined' ? window.location.hash.replace('#', '') : 'timer') === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.hash = tab.id;
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`relative flex items-center space-x-2 px-5 py-2 rounded-full font-inter font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
                      ${selected
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200'
                        : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-700 dark:hover:text-blue-200'}
                    `}
                    style={{ border: 'none', boxShadow: 'none' }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {selected && (
                      <span className="absolute left-4 right-4 -bottom-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80 animate-navbar-underline" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 hover:scale-105"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600" />
            )}
          </button>

          {/* User menu or auth buttons */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
              >
                <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="hidden md:block text-sm font-manrope text-gray-700 dark:text-gray-300">
                  {user.email?.split('@')[0]}
                </span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-manrope text-gray-900 dark:text-white">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-manrope text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 text-sm font-manrope bg-gradient-to-r from-primary-600 to-coral-600 text-white rounded-xl hover:from-primary-700 hover:to-coral-700 transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/40 dark:bg-gray-800/40 rounded-2xl mt-4 border border-white/20 dark:border-gray-700/20 shadow-2xl">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-xl transition-all duration-300 font-manrope font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {/* Dashboard tabs in mobile menu */}
            {dashboardTabs.map((tab) => {
              const Icon = tab.icon;
              const selected = (typeof window !== 'undefined' ? window.location.hash.replace('#', '') : 'timer') === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.location.hash = tab.id;
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl font-manrope font-medium text-base transition-all duration-200 focus:outline-none
                    ${selected
                      ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200'
                      : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-700 dark:hover:text-blue-200'}
                  `}
                  style={{ border: 'none', boxShadow: 'none' }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
            {!user && (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-xl transition-all duration-300 font-manrope font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-xl transition-all duration-300 font-manrope font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 