# SimpleFastly - Smart Intermittent Fasting Tracker

A modern, intuitive intermittent fasting app built with Next.js, TypeScript, and Supabase. Track your fasting journey with beautiful analytics, personalized insights, and seamless data synchronization.

## Features

### 🔐 Authentication & Data Sync
- **Supabase Authentication**: Secure email/password and Google OAuth authentication
- **Automatic Data Migration**: Seamlessly migrate from local storage to cloud
- **Backward Compatibility**: Works offline with local storage fallback
- **Cross-device Sync**: Access your fasting data from anywhere

### ⏰ Fasting Tracking
- **Multiple Fasting Protocols**: Support for 16:8, 18:6, and 20:4 fasting
- **Real-time Timer**: Beautiful circular timer with progress tracking
- **Manual Entry**: Add past fasting sessions manually
- **Progress Analytics**: Track completion rates and success metrics

### 📊 Analytics & Insights
- **Visual Statistics**: Beautiful charts and progress indicators
- **Calendar View**: See your fasting history at a glance
- **Success Metrics**: Track completion rates and streaks
- **Personalized Insights**: Get motivated with progress summaries

### 🎨 Modern UI/UX
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Delightful user experience
- **Accessibility**: Built with accessibility in mind

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth (Email/Password + Google OAuth)
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud Console account (for OAuth)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd FastingApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Google OAuth (Optional but Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Configure the OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)
7. Copy the Client ID and Client Secret
8. In your Supabase dashboard, go to Authentication > Providers > Google
9. Enable Google provider and add your Client ID and Client Secret

### 5. Set Up Database

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the migration script from `supabase/migrations/001_create_fasting_records.sql`

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Backend Features

### 🔐 Authentication Backend (Supabase Auth)
1. **Email/Password Authentication**
   - User registration with email verification
   - Secure login with password
   - Password reset functionality
   - Session management

2. **Google OAuth Authentication**
   - One-click Google sign-in
   - Automatic user profile creation
   - Secure token management
   - Cross-platform compatibility

3. **User Management**
   - Get current user information
   - Update user profile
   - Sign out functionality
   - Real-time auth state changes

### 🗄️ Database Backend (Supabase PostgreSQL)
1. **Fasting Records Table**
   - UUID primary keys for security
   - User-specific data with foreign key relationships
   - Support for multiple fasting protocols (16:8, 18:6, 20:4)
   - Timestamp tracking (start_time, end_time, created_at, updated_at)
   - Duration calculations (target_duration, actual_duration)
   - Completion status tracking
   - Manual entry flagging

2. **Security Features**
   - Row Level Security (RLS) enabled
   - User-specific data access policies
   - Automatic user_id validation
   - Cascade deletion for user cleanup

3. **Performance Optimizations**
   - Indexed queries for fast data retrieval
   - Composite indexes for user + time queries
   - Automatic timestamp updates via triggers

### 🔄 Data Management Backend
1. **Dual Storage System**
   - Local storage fallback for offline functionality
   - Supabase cloud storage for authenticated users
   - Automatic data migration from local to cloud

2. **CRUD Operations**
   - Create fasting records
   - Read user's fasting history
   - Update existing records
   - Delete records
   - Bulk data migration

3. **Error Handling**
   - Graceful fallback to local storage
   - Comprehensive error logging
   - Data integrity preservation

## Backward Compatibility

The app is designed to work seamlessly whether you're authenticated or not:

### Unauthenticated Users
- All fasting data is stored locally in browser storage
- Full functionality available offline
- No data loss when switching between devices

### Authenticated Users
- Data is automatically synced to Supabase
- Local data is migrated to cloud on first login
- Cross-device synchronization
- Enhanced security and backup

### Data Migration
When a user signs in for the first time:
1. Local fasting history is automatically migrated to Supabase
2. Local storage is cleared after successful migration
3. Future data is synced in real-time

## Project Structure

```
FastingApp/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   ├── signup/        # Signup page
│   │   └── callback/      # OAuth callback page
│   ├── dashboard/         # Main dashboard
│   └── blog/              # Blog pages
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── landing/          # Landing page components
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Supabase client
│   ├── auth.ts           # Authentication service
│   └── fasting.ts        # Fasting data service
├── supabase/             # Database migrations
└── public/               # Static assets
```

## Key Components

### Authentication Flow
- `AuthProvider`: Manages authentication state
- `LoginForm` & `SignupForm`: User authentication with Google OAuth
- `AuthCallbackPage`: Handles OAuth redirects
- Automatic redirects based on auth status

### Data Management
- `FastingService`: Handles data operations with fallback
- Local storage for offline functionality
- Supabase integration for cloud sync

### Dashboard Features
- `DashboardApp`: Main dashboard with timer and analytics
- `CircularTimer`: Real-time fasting timer
- `StatsPage`: Analytics and insights
- `CalendarPage`: Calendar view of fasting history

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Update Google OAuth redirect URIs to include your production domain
5. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@simplefastly.app or create an issue in the repository.

---

Built with ❤️ for the fasting community 