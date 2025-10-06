import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-violet-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-violet-400 font-medium tracking-wide uppercase text-sm">New Collection 2025</p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Timeless
                <span className="text-violet-400 block">Elegance</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Discover our premium collection of luxury timepieces crafted with precision and designed for the modern connoisseur.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 group">
                Shop Collection
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2">
                <Play className="h-5 w-5" />
                Watch Story
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-violet-400">500+</p>
                <p className="text-sm text-gray-400">Premium Watches</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-violet-400">50+</p>
                <p className="text-sm text-gray-400">Luxury Brands</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-violet-400">24/7</p>
                <p className="text-sm text-gray-400">Expert Support</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-violet-800 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img 
                src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Luxury Watch"
                className="relative w-full max-w-md mx-auto rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-violet-600 text-white p-4 rounded-xl shadow-lg">
              <p className="font-bold text-lg">₹2,49,999</p>
              <p className="text-sm opacity-90">Limited Edition</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;