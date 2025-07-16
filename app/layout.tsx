import './globals.css';
import { Inter, Manrope } from 'next/font/google';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { DarkModeProvider } from '../components/DarkModeProvider';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SimpleFastly - Smart Intermittent Fasting Tracker',
    template: '%s | SimpleFastly'
  },
  description: 'Transform your health with SimpleFastly - the most intuitive intermittent fasting app. Track 16:8, 18:6, and 20:4 fasting schedules with beautiful analytics and personalized insights.',
  keywords: ['intermittent fasting', 'fasting tracker', 'health app', 'weight loss', '16:8 fasting', 'wellness'],
  authors: [{ name: 'SimpleFastly Team' }],
  creator: 'SimpleFastly',
  publisher: 'SimpleFastly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://simplefastly.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://simplefastly.app',
    title: 'SimpleFastly - Smart Intermittent Fasting Tracker',
    description: 'Transform your health with the most intuitive intermittent fasting app. Beautiful analytics, personalized insights, and proven results.',
    siteName: 'SimpleFastly',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SimpleFastly - Intermittent Fasting App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimpleFastly - Smart Intermittent Fasting Tracker',
    description: 'Transform your health with the most intuitive intermittent fasting app.',
    images: ['/og-image.jpg'],
    creator: '@simplefastlyapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#14b8a6" />
      </head>
      <body className="font-inter antialiased">
        <AuthProvider>
        <DarkModeProvider>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}