import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Share2, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPostsData } from '../data/blogPosts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { useGallery } from '../context/GalleryContext';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useGallery();

  const post = blogPostsData.find(p => p.slug === slug || p.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">Article Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">
          The requested curatorial guide or journal article could not be found.
        </p>
        <Link
          to="/blog"
          className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-amber-900 transition"
        >
          Return to Art Journal
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPostsData.filter(p => p.id !== post.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article Link Copied', 'Share this curatorial guide with other collectors.', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Journal', path: '/blog' },
            { label: post.title }
          ]}
        />

        <article className="my-8 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          {/* Article Header */}
          <div className="p-6 sm:p-10 border-b border-stone-100 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                {post.category}
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTimeMinutes} min read
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              {post.title}
            </h1>

            {/* Author info & Share */}
            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                  {post.author.charAt(0)}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block">{post.author}</span>
                  <span className="text-stone-500">{post.authorRole} • {post.publishDate}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition"
                title="Share article link"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Banner Hero Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-12 space-y-6 text-stone-700 leading-relaxed text-sm sm:text-base font-light">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Tags row */}
            <div className="pt-8 border-t border-stone-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" />
                Tags:
              </span>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Next / Previous Related Articles */}
        <div className="my-12">
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-6">
            Continue Reading Art Guides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map(rel => (
              <Link
                key={rel.id}
                to={`/blog/${rel.slug}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-700/60 shadow-xs transition group"
              >
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="h-20 w-20 object-cover rounded-xl"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    {rel.category}
                  </span>
                  <h4 className="font-serif font-bold text-stone-900 text-sm group-hover:text-amber-800 transition line-clamp-2 mt-0.5">
                    {rel.title}
                  </h4>
                  <span className="text-xs text-stone-400 mt-1 block">
                    {rel.readTimeMinutes} min read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mandatory Compact Advertisement Placeholder */}
        <AdPlaceholder slotName="Blog Post Bottom Banner" />
      </div>
    </div>
  );
};
