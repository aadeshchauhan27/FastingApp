import { Metadata } from 'next';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Benefits from '@/components/landing/Benefits';
import Testimonials from '@/components/landing/Testimonials';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'FastFlow - Transform Your Health with Smart Intermittent Fasting',
  description: 'Join thousands who transformed their health with FastFlow. Track 16:8, 18:6, and 20:4 fasting schedules with beautiful analytics, personalized insights, and proven results.',
  openGraph: {
    title: 'FastFlow - Transform Your Health with Smart Intermittent Fasting',
    description: 'Join thousands who transformed their health with FastFlow. Beautiful analytics, personalized insights, and proven results.',
    images: ['/og-home.jpg'],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}