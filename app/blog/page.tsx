import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Intermittent Fasting Blog - Expert Guides & Tips',
  description: 'Discover the latest research, expert tips, and success stories about intermittent fasting. Learn how to optimize your fasting journey for maximum health benefits.',
  openGraph: {
    title: 'Intermittent Fasting Blog - Expert Guides & Tips',
    description: 'Discover the latest research, expert tips, and success stories about intermittent fasting.',
    images: ['/og-blog.jpg'],
  },
};

const blogPosts = [
  {
    slug: 'complete-guide-intermittent-fasting',
    title: 'The Complete Guide to Intermittent Fasting for Beginners',
    excerpt: 'Everything you need to know to start your intermittent fasting journey safely and effectively.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Beginner Guide',
  },
  {
    slug: '16-8-method-complete-guide',
    title: '16:8 Intermittent Fasting: The Ultimate Beginner-Friendly Method',
    excerpt: 'Learn why 16:8 is the most popular fasting method and how to implement it successfully.',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Mike Chen',
    date: '2024-01-12',
    readTime: '6 min read',
    category: 'Methods',
  },
  {
    slug: 'best-foods-break-fast',
    title: 'Best Foods to Break Your Fast: A Nutritionist\'s Guide',
    excerpt: 'Discover which foods optimize your metabolism and energy when breaking your fast.',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Lisa Rodriguez, RD',
    date: '2024-01-10',
    readTime: '5 min read',
    category: 'Nutrition',
  },
  {
    slug: 'intermittent-fasting-weight-loss',
    title: 'How Intermittent Fasting Accelerates Weight Loss',
    excerpt: 'The science behind why intermittent fasting is so effective for sustainable weight loss.',
    image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Dr. James Wilson',
    date: '2024-01-08',
    readTime: '7 min read',
    category: 'Weight Loss',
  },
  {
    slug: 'managing-hunger-during-fasts',
    title: 'Managing Hunger During Extended Fasts: Expert Tips',
    excerpt: 'Practical strategies to overcome hunger pangs and stay motivated during your fasting windows.',
    image: 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Emma Thompson',
    date: '2024-01-05',
    readTime: '4 min read',
    category: 'Tips',
  },
  {
    slug: 'autophagy-cellular-renewal',
    title: 'Autophagy and Cellular Renewal: The Hidden Benefits of Fasting',
    excerpt: 'Understand how fasting triggers your body\'s natural cellular cleanup and renewal processes.',
    image: 'https://images.pexels.com/photos/1640778/pexels-photo-1640778.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Dr. Maria Garcia',
    date: '2024-01-03',
    readTime: '9 min read',
    category: 'Science',
  },
];

const categories = ['All', 'Beginner Guide', 'Methods', 'Nutrition', 'Weight Loss', 'Tips', 'Science'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-coral-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-inter font-bold gradient-text mb-6">
            Fasting Insights & Guides
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-manrope max-w-3xl mx-auto">
            Expert-backed articles, research insights, and practical tips to optimize your intermittent fasting journey
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 font-manrope font-medium text-gray-700 dark:text-gray-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-coral-500 text-white text-xs font-manrope font-medium rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-inter font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 font-manrope mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}