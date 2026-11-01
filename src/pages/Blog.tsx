import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User, Tag, Sparkles } from 'lucide-react';
import { blogPostsData, BlogPost } from '../data/blogPosts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Collecting Guide', 'Artist Spotlight', 'Conservation & Framing', 'Market Trends'];

  const filteredPosts = blogPostsData.filter(post => {
    if (selectedCategory === 'All') return true;
    return post.category === selectedCategory;
  });

  const featuredPost = blogPostsData[0];

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Art Journal & Guides' }]} />

        {/* Header */}
        <div className="my-8 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-2">
            The Shine Gallery Gazette
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            Art Journal & Collector Insights
          </h1>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Curatorial essays, art market perspectives, master artist spotlights,
            and expert advice on caring for original oil, acrylic, and serigraph works.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Editorial Post */}
        {selectedCategory === 'All' && (
          <div className="mb-14 overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-900">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-amber-600 text-stone-950 font-bold px-3 py-1 rounded text-[11px] uppercase tracking-wider">
                  Featured Editorial
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-amber-800">{featuredPost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTimeMinutes} min read
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 hover:text-amber-800 transition">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold text-stone-900 block">{featuredPost.author}</span>
                    <span className="text-stone-500">{featuredPost.authorRole}</span>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-amber-900 text-white text-xs font-semibold transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                  {post.category}
                </div>
              </div>

              <div className="p-5 flex flex-1 flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1">
                    <span>{post.publishDate}</span>
                    <span>•</span>
                    <span>{post.readTimeMinutes} min read</span>
                  </div>

                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-stone-600 line-clamp-3 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium truncate max-w-[150px]">
                    {post.author}
                  </span>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-amber-800 hover:underline"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Blog Page Bottom Banner" />
      </div>
    </div>
  );
};
