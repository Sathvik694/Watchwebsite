import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-violet-900 via-violet-800 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="h-16 w-16 text-violet-300 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay in <span className="text-violet-300">Time</span>
            </h2>
            <p className="text-lg text-violet-100 max-w-2xl mx-auto">
              Be the first to know about new arrivals, exclusive collections, and special offers. 
              Join our community of watch enthusiasts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                  required
                />
                <Mail className="absolute right-4 top-4 h-5 w-5 text-violet-300" />
              </div>
              <button
                type="submit"
                disabled={isSubscribed}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                  isSubscribed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-violet-900 hover:bg-violet-100'
                } flex items-center gap-2 justify-center min-w-[140px]`}
              >
                {isSubscribed ? (
                  <>
                    <Check className="h-5 w-5" />
                    Subscribed!
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-violet-700">
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">Exclusive Access</h3>
              <p className="text-sm text-violet-200">Get early access to limited edition releases</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">Expert Tips</h3>
              <p className="text-sm text-violet-200">Watch care and styling advice from professionals</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">Special Offers</h3>
              <p className="text-sm text-violet-200">Member-only discounts and promotions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;