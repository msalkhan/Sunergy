import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Search, Filter, CheckCircle2, User, X, Plus } from 'lucide-react';
import { REVIEWS_DATA, SUNERGY_BUSINESS } from '../data/sunergyData';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [activeTag, setActiveTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');
  const [writeModalOpen, setWriteModalOpen] = useState<boolean>(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newLocation, setNewLocation] = useState('Port St. Lucie, FL');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const tags = [
    { label: 'All', count: 138 },
    { label: 'friendly consultant', count: 4 },
    { label: 'installation time', count: 5 },
    { label: 'solar explanation', count: 3 },
    { label: 'professional installers', count: 4 },
    { label: 'hurricane rated', count: 2 }
  ];

  const handleLike = (id: string) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r)
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;

    const newRev: Review = {
      id: "rev-" + Date.now(),
      author: newAuthor,
      rating: newRating,
      date: "Just now",
      text: newText,
      tags: ["verified customer"],
      likes: 0,
      location: newLocation
    };

    setReviews([newRev, ...reviews]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setWriteModalOpen(false);
      setNewAuthor('');
      setNewText('');
    }, 1500);
  };

  const filteredReviews = reviews.filter(r => {
    const matchesTag = activeTag === 'All' || r.tags.includes(activeTag);
    const matchesSearch = r.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (r.location && r.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <section id="reviews" className="py-16 bg-[#FCFAF7] border-t border-[#E8E2D9] text-[#3D3D37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E8E2D9]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] bg-[#5A5A40]/10 border border-[#5A5A40]/20 px-3 py-1 rounded-full">
              Google Maps Rating & Feedback
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#3D3D37] mt-3 flex items-center gap-2">
              <span>Customer Reviews</span>
              <span className="text-[#F2B035] text-2xl font-bold">({SUNERGY_BUSINESS.totalReviews})</span>
            </h2>
            <p className="text-[#7A7A6B] text-sm mt-1">
              Read authentic feedback from homeowners in Port St. Lucie, Tradition, and St. Lucie West.
            </p>
          </div>

          <button
            onClick={() => setWriteModalOpen(true)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F2B035] hover:bg-[#d99c2b] text-[#3D3D37] transition-colors flex items-center gap-2 shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Google Review</span>
          </button>
        </div>

        {/* Rating Summary Bar & Stars Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F7F5F0] p-6 sm:p-8 rounded-2xl border border-[#E8E2D9] mb-10">
          
          {/* Big Score Box */}
          <div className="lg:col-span-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-[#E8E2D9] pb-6 lg:pb-0 lg:pr-8">
            <div className="text-5xl font-serif font-bold text-[#3D3D37] tracking-tight">4.3</div>
            <div className="flex items-center justify-center lg:justify-start text-[#F2B035] gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-[#F2B035]' : 'fill-[#F2B035]/30'}`} />
              ))}
            </div>
            <div className="text-xs text-[#7A7A6B]">Based on 138 verified Google reviews</div>
            <div className="text-xs font-semibold text-[#008A3D] mt-1">Verified Local Solar Installer</div>
          </div>

          {/* Star Distribution Bars */}
          <div className="lg:col-span-8 space-y-2 text-xs font-medium">
            {[
              { star: 5, pct: 72, count: 98 },
              { star: 4, pct: 15, count: 20 },
              { star: 3, pct: 7, count: 10 },
              { star: 2, pct: 2, count: 3 },
              { star: 1, pct: 4, count: 7 },
            ].map((item) => (
              <div key={item.star} className="flex items-center gap-3">
                <span className="w-4 text-right text-[#3D3D37] font-bold">{item.star}</span>
                <Star className="w-3.5 h-3.5 text-[#F2B035] fill-[#F2B035] shrink-0" />
                <div className="flex-1 h-2.5 bg-[#E8E2D9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#F2B035] rounded-full transition-all duration-500" 
                    style={{ width: `${item.pct}%` }} 
                  />
                </div>
                <span className="w-8 text-[#7A7A6B] text-right">{item.count}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Filters & Search Bar */}
        <div className="space-y-4 mb-8">
          {/* Review Filter Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#7A7A6B] mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter by topic:
            </span>
            {tags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => setActiveTag(tag.label)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTag === tag.label
                    ? 'bg-[#5A5A40] text-[#FCFAF7] font-bold shadow-sm'
                    : 'bg-[#F7F5F0] text-[#3D3D37] border border-[#E8E2D9] hover:bg-[#E8E2D9]'
                }`}
              >
                {tag.label} <span className="opacity-75">({tag.count})</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#7A7A6B] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews (e.g. financing, installer, hurricane)..."
              className="w-full bg-white border border-[#E8E2D9] rounded-xl pl-9 pr-4 py-2 text-xs text-[#3D3D37] placeholder-[#7A7A6B] focus:outline-none focus:border-[#5A5A40]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[#7A7A6B] hover:text-[#3D3D37]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#5A5A40] transition-all"
            >
              <div className="space-y-3">
                {/* Reviewer Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5A5A40] flex items-center justify-center font-bold text-[#FCFAF7] text-sm shadow-sm">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#3D3D37] text-sm flex items-center gap-1">
                        <span>{rev.author}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#008A3D]" />
                      </h3>
                      <div className="text-[11px] text-[#7A7A6B]">
                        {rev.location || 'Port St. Lucie, FL'} · {rev.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex text-[#F2B035]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#F2B035]' : 'fill-[#E8E2D9]'}`} />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[#3D3D37] text-xs sm:text-sm leading-relaxed italic font-serif">
                  &quot;{rev.text}&quot;
                </p>

                {/* Tags */}
                {rev.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {rev.tags.map((t, idx) => (
                      <span key={idx} className="bg-[#F7F5F0] border border-[#E8E2D9] text-[#5A5A40] text-[10px] font-medium px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Response from Owner (if available) */}
                {rev.ownerResponse && (
                  <div className="bg-[#F7F5F0] border-l-2 border-[#F2B035] p-3 rounded-r-xl text-xs space-y-1">
                    <div className="font-bold text-[#5A5A40] flex items-center justify-between">
                      <span>Response from Sunergy owner</span>
                      <span className="text-[10px] text-[#7A7A6B] font-normal">{rev.ownerResponse.date}</span>
                    </div>
                    <p className="text-[#3D3D37] text-[11px] leading-relaxed">
                      {rev.ownerResponse.text}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-[#E8E2D9] flex justify-between items-center text-xs text-[#7A7A6B]">
                <button
                  onClick={() => handleLike(rev.id)}
                  className="hover:text-[#5A5A40] flex items-center gap-1.5 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.likes || 0})</span>
                </button>
                <span className="text-[10px] text-[#7A7A6B]">Verified Google Review</span>
              </div>

            </div>
          ))}
        </div>

        {/* Modal: Write A Review */}
        {writeModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#3D3D37]/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-[#E8E2D9] rounded-2xl max-w-lg w-full p-6 shadow-xl relative">
              <button
                onClick={() => setWriteModalOpen(false)}
                className="absolute top-4 right-4 text-[#7A7A6B] hover:text-[#3D3D37]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-serif font-bold text-[#3D3D37] mb-1">Write a Review for Sunergy</h3>
              <p className="text-xs text-[#7A7A6B] mb-4">Share your experience with Sunergy Solar Energy Systems in Port St. Lucie.</p>

              {submitSuccess ? (
                <div className="bg-[#52B788]/20 border border-[#52B788]/30 text-[#008A3D] p-4 rounded-xl text-center text-xs font-semibold">
                  Thank you! Your review has been added to our live feed.
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl px-3 py-2 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Neighborhood / City</label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Port St. Lucie, FL"
                      className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl px-3 py-2 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Star Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 text-[#F2B035]"
                        >
                          <Star className={`w-6 h-6 ${star <= newRating ? 'fill-[#F2B035]' : 'fill-[#E8E2D9]'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Review Comments</label>
                    <textarea
                      required
                      rows={3}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder="Tell us about your solar installation, consultant, or FPL energy savings..."
                      className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl p-3 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#F2B035] hover:bg-[#d99c2b] text-[#3D3D37] font-extrabold rounded-xl text-xs transition-colors shadow-sm"
                  >
                    Post Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

