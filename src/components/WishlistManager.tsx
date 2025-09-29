import React, { useState, useEffect } from 'react';
import { Heart, X, ShoppingCart, Share2, Eye, Trash2 } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  dateAdded: Date;
  inStock: boolean;
  priceDropped?: boolean;
}

interface WishlistManagerProps {
  isOpen: boolean;
  onToggle: () => void;
}

const WishlistManager: React.FC<WishlistManagerProps> = ({ isOpen, onToggle }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [sortBy, setSortBy] = useState<'dateAdded' | 'price' | 'name'>('dateAdded');
  const [filterBy, setFilterBy] = useState<'all' | 'inStock' | 'priceDropped'>('all');

  // Mock data - in real app, this would come from API/localStorage
  useEffect(() => {
    const mockWishlist: WishlistItem[] = [
      {
        id: '1',
        name: 'Royal Heritage',
        brand: 'Skouce',
        price: 249999,
        originalPrice: 299999,
        image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        reviews: 128,
        dateAdded: new Date('2024-01-15'),
        inStock: true,
        priceDropped: true
      },
      {
        id: '2',
        name: 'Urban Classic',
        brand: 'Metropolitan',
        price: 159999,
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        reviews: 96,
        dateAdded: new Date('2024-01-10'),
        inStock: false
      },
      {
        id: '3',
        name: 'Sport Elite',
        brand: 'ActiveTime',
        price: 134999,
        image: 'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.7,
        reviews: 203,
        dateAdded: new Date('2024-01-05'),
        inStock: true
      }
    ];
    setWishlistItems(mockWishlist);
  }, []);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const moveToCart = (itemId: string) => {
    // In real app, this would add to cart and optionally remove from wishlist
    console.log('Moving to cart:', itemId);
  };

  const shareWishlist = () => {
    // In real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.href + '/wishlist/shared');
    alert('Wishlist link copied to clipboard!');
  };

  const filteredItems = wishlistItems.filter(item => {
    if (filterBy === 'inStock') return item.inStock;
    if (filterBy === 'priceDropped') return item.priceDropped;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'dateAdded':
      default:
        return b.dateAdded.getTime() - a.dateAdded.getTime();
    }
  });

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 text-violet-600" />
          <h3 className="text-xl font-bold text-gray-900">My Wishlist</h3>
          {wishlistItems.length > 0 && (
            <span className="bg-violet-600 text-white text-xs px-2 py-1 rounded-full">
              {wishlistItems.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {wishlistItems.length > 0 && (
            <>
              <button
                onClick={shareWishlist}
                className="p-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                title="Share Wishlist"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={clearWishlist}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear Wishlist"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </>
          )}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h4>
          <p className="text-gray-600 mb-6">Save watches you love to keep track of them</p>
          <button
            onClick={onToggle}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="dateAdded">Sort by Date Added</option>
                <option value="price">Sort by Price</option>
                <option value="name">Sort by Name</option>
              </select>
              
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="all">All Items</option>
                <option value="inStock">In Stock Only</option>
                <option value="priceDropped">Price Dropped</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredItems.length} of {wishlistItems.length} items
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  {item.priceDropped && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Price Drop!
                    </div>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg">₹{item.price.toLocaleString('en-IN')}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {item.priceDropped && (
                      <span className="text-sm text-green-600 font-medium">
                        Save ₹{((item.originalPrice || 0) - item.price).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Added {item.dateAdded.toLocaleDateString()}
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveToCart(item.id)}
                        disabled={!item.inStock}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                          item.inStock
                            ? 'bg-violet-600 hover:bg-violet-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bulk Actions */}
          {sortedItems.length > 0 && (
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => sortedItems.filter(item => item.inStock).forEach(item => moveToCart(item.id))}
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Add All Available to Cart
              </button>
              <button
                onClick={shareWishlist}
                className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Share Wishlist
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistManager;