import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const watches = [
  {
    id: 1,
    name: "Royal Heritage",
    brand: "TimeVault",
    price: 249999,
    originalPrice: 299999,
    rating: 4.9,
    reviews: 128,
    image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400",
    tag: "Bestseller"
  },
  {
    id: 2,
    name: "Urban Classic",
    brand: "Metropolitan",
    price: 159999,
    rating: 4.8,
    reviews: 96,
    image: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=400",
    tag: "New"
  },
  {
    id: 3,
    name: "Sport Elite",
    brand: "ActiveTime",
    price: 134999,
    rating: 4.7,
    reviews: 203,
    image: "https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=400",
    tag: "Limited"
  },
  {
    id: 4,
    name: "Luxury Crown",
    brand: "Premium",
    price: 359999,
    originalPrice: 419999,
    rating: 5.0,
    reviews: 45,
    image: "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=400",
    tag: "Premium"
  }
];

const FeaturedWatches = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-violet-600 font-medium tracking-wide uppercase text-sm mb-2">Featured Collection</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Handpicked <span className="text-violet-600">Timepieces</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated selection of premium watches from renowned brands worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {watches.map((watch) => (
            <div key={watch.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={watch.image} 
                  alt={watch.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    watch.tag === 'Bestseller' ? 'bg-violet-600 text-white' :
                    watch.tag === 'New' ? 'bg-green-500 text-white' :
                    watch.tag === 'Limited' ? 'bg-orange-500 text-white' :
                    'bg-black text-white'
                  }`}>
                    {watch.tag}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Quick Add
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <p className="text-sm text-gray-500 font-medium">{watch.brand}</p>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-600 transition-colors">{watch.name}</h3>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(watch.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({watch.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">₹{watch.price.toLocaleString('en-IN')}</span>
                    {watch.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{watch.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  {watch.originalPrice && (
                    <span className="text-sm text-green-600 font-medium">
                      Save ₹{(watch.originalPrice - watch.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-full font-semibold transition-colors">
            View All Watches
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWatches;