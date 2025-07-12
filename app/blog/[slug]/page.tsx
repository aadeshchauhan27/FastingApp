import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'complete-guide-intermittent-fasting',
    title: 'The Complete Guide to Intermittent Fasting for Beginners',
    excerpt: 'Everything you need to know to start your intermittent fasting journey safely and effectively.',
    content: `
# The Complete Guide to Intermittent Fasting for Beginners

Intermittent fasting (IF) has become one of the most popular health and fitness trends worldwide. But what exactly is it, and how can you get started safely?

## What is Intermittent Fasting?

Intermittent fasting is an eating pattern that cycles between periods of fasting and eating. It doesn't specify which foods you should eat but rather when you should eat them.

## Popular Intermittent Fasting Methods

### 16:8 Method
The most popular and beginner-friendly approach. You fast for 16 hours and eat during an 8-hour window.

### 18:6 Method
A slightly more advanced approach with an 18-hour fast and 6-hour eating window.

### 20:4 Method
Also known as the "Warrior Diet," this involves a 20-hour fast with a 4-hour eating window.

## Health Benefits

Research shows intermittent fasting may help with:
- Weight loss and fat burning
- Improved insulin sensitivity
- Enhanced brain function
- Cellular repair processes
- Longevity

## Getting Started

1. **Choose your method**: Start with 16:8 if you're a beginner
2. **Pick your eating window**: Many people choose 12pm-8pm
3. **Stay hydrated**: Drink plenty of water during fasting periods
4. **Listen to your body**: Adjust as needed

## Common Mistakes to Avoid

- Starting too aggressively
- Not staying hydrated
- Overeating during eating windows
- Ignoring your body's signals

Remember, intermittent fasting isn't for everyone. Consult with a healthcare provider before starting any new eating pattern.
    `,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Beginner Guide',
  },
  // Add more blog posts here...
];

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-coral-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="glass-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-coral-500 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-inter font-bold gradient-text">FastFlow</span>
            </Link>
            
            <Link href="/blog" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="mb-12">
            <div className="mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-primary-500 to-coral-500 text-white text-sm font-manrope font-medium rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-inter font-bold text-gray-800 dark:text-gray-200 mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="font-manrope">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span className="font-manrope">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="font-manrope">{post.readTime}</span>
              </div>
              <button className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Share2 className="h-4 w-4" />
                <span className="font-manrope">Share</span>
              </button>
            </div>
            
            <div className="aspect-video overflow-hidden rounded-3xl mb-8">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-inter prose-headings:gradient-text prose-p:font-manrope prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:font-manrope prose-li:text-gray-600 dark:prose-li:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            </div>
          </div>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-3xl font-inter font-bold gradient-text mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.slice(0, 2).map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="font-inter font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-manrope text-sm">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}