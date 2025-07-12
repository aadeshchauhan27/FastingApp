import './globals.css';
import { Inter, Manrope } from 'next/font/google';
import { Metadata } from 'next';

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
    default: 'FastFlow - Smart Intermittent Fasting Tracker',
    template: '%s | FastFlow'
  },
  description: 'Transform your health with FastFlow - the most intuitive intermittent fasting app. Track 16:8, 18:6, and 20:4 fasting schedules with beautiful analytics and personalized insights.',
  keywords: ['intermittent fasting', 'fasting tracker', 'health app', 'weight loss', '16:8 fasting', 'wellness'],
  authors: [{ name: 'FastFlow Team' }],
  creator: 'FastFlow',
  publisher: 'FastFlow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fastflow.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fastflow.app',
    title: 'FastFlow - Smart Intermittent Fasting Tracker',
    description: 'Transform your health with the most intuitive intermittent fasting app. Beautiful analytics, personalized insights, and proven results.',
    siteName: 'FastFlow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FastFlow - Intermittent Fasting App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FastFlow - Smart Intermittent Fasting Tracker',
    description: 'Transform your health with the most intuitive intermittent fasting app.',
    images: ['/og-image.jpg'],
    creator: '@fastflowapp',
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
        {children}
      </body>
    </html>
  );
}