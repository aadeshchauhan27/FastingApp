import { Metadata } from 'next';
import DashboardApp from '@/components/dashboard/DashboardApp';

export const metadata: Metadata = {
  title: 'Dashboard - Track Your Fasting Journey',
  description: 'Monitor your intermittent fasting progress with real-time timers, detailed analytics, and personalized insights.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <DashboardApp />;
}