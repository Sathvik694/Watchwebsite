import React, { useState } from 'react';
import { Filter, Scale, Heart, Grid2x2 as Grid, List } from 'lucide-react';
import ProductGallery from './ProductGallery';
import VirtualTryOn from './VirtualTryOn';
import SmartFilters from './SmartFilters';
import ComparisonTool from './ComparisonTool';
import WishlistManager from './WishlistManager';

// Mock data for demonstration
const mockWatches = [
  {
    id: '1',
    name: 'Royal Heritage',
    brand: 'Skouce',
    price: 249999,
    originalPrice: 299999,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    has360View: true,
    specs: {
      movement: 'Automatic',
      caseSize: '42mm',
      caseMaterial: 'Stainless Steel',
      strapMaterial: 'Leather',
      waterResistance: '100m',
      features: ['Date Display', 'Luminous Hands', 'Sapphire Crystal'],
      warranty: '2 Years'
    }
  },
  {
    id: '2',
    name: 'Urban Classic',
    brand: 'Metropolitan',
    price: 159999,
    rating: 4.8,
    reviews: 96,
    image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    has360View: false,
    specs: {
      movement: 'Quartz',
      caseSize: '40mm',
      caseMaterial: 'Titanium',
      strapMaterial: 'Metal Bracelet',
      waterResistance: '50m',
      features: ['Chronograph', 'Date Display', 'Anti-Reflective'],
      warranty: '3 Years'
    }
  },
  {
    id: '3',
    name: 'Sport Elite',
    brand: 'ActiveTime',
    price: 134999,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    has360View: true,
    specs: {
      movement: 'Solar Powered',
      caseSize: '44mm',
      caseMaterial: 'Carbon Fiber',
      strapMaterial: 'Rubber',
      waterResistance: '200m',
      features: ['GPS', 'Heart Rate Monitor', 'Bluetooth'],
      warranty: '5 Years'
    }
  }
];

const ProductShowcase = () => {
  const [selectedWatch, setSelectedWatch] = useState(mockWatches[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredWatches, setFilteredWatches] = useState(mockWatches);

  const handleFiltersChange = (filters: any) => {
    // In a real app, this would filter the watches based on the selected filters
    console.log('Filters changed:', filters);
    // For demo, we'll just keep all watches
    setFilteredWatches(mockWatches);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-violet-600">Collection</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our watches like never before with advanced features and detailed comparisons.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                showFilters 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <Filter className="h-4 w-4" />
              Smart Filters
            </button>
            
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                showComparison 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <Scale className="h-4 w-4" />
              Compare
            </button>
            
            <button
              onClick={() => setShowWishlist(!showWishlist)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                showWishlist 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <Heart className="h-4 w-4" />
              Wishlist
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Filters & Tools */}
          <div className="space-y-6">
            {showFilters && (
              <SmartFilters
                onFiltersChange={handleFiltersChange}
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
              />
            )}
            
            {showComparison && (
              <ComparisonTool
                isOpen={showComparison}
                onToggle={() => setShowComparison(!showComparison)}
                availableWatches={mockWatches}
              />
            )}
            
            {showWishlist && (
              <WishlistManager
                isOpen={showWishlist}
                onToggle={() => setShowWishlist(!showWishlist)}
              />
            )}
          </div>

          {/* Center Column - Product Gallery */}
          <div className="space-y-6">
            <ProductGallery
              images={selectedWatch.images}
              productName={selectedWatch.name}
              has360View={selectedWatch.has360View}
            />
            
            {/* Product Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedWatch.name}</h3>
                <p className="text-lg text-gray-600">{selectedWatch.brand}</p>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{selectedWatch.price.toLocaleString('en-IN')}
                </span>
                {selectedWatch.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{selectedWatch.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Movement:</span>
                  <span className="ml-2 text-gray-600">{selectedWatch.specs.movement}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Case Size:</span>
                  <span className="ml-2 text-gray-600">{selectedWatch.specs.caseSize}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Material:</span>
                  <span className="ml-2 text-gray-600">{selectedWatch.specs.caseMaterial}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Water Resistance:</span>
                  <span className="ml-2 text-gray-600">{selectedWatch.specs.waterResistance}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Virtual Try-On */}
          <div>
            <VirtualTryOn
              watchImage={selectedWatch.image}
              watchName={selectedWatch.name}
            />
          </div>
        </div>

        {/* Watch Selection */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Select a Watch to Explore</h3>
          <div className={`grid gap-6 ${
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          }`}>
            {filteredWatches.map((watch) => (
              <div
                key={watch.id}
                onClick={() => setSelectedWatch(watch)}
                className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300 ${
                  selectedWatch.id === watch.id 
                    ? 'ring-2 ring-violet-600 transform scale-105' 
                    : 'hover:shadow-xl hover:scale-102'
                } ${viewMode === 'list' ? 'flex gap-4' : ''}`}
              >
                <img
                  src={watch.image}
                  alt={watch.name}
                  className={`object-cover rounded-lg ${
                    viewMode === 'list' ? 'w-24 h-24' : 'w-full h-48'
                  }`}
                />
                <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-4'}`}>
                  <h4 className="font-semibold text-gray-900">{watch.name}</h4>
                  <p className="text-sm text-gray-600">{watch.brand}</p>
                  <div className="mt-2">
                    <span className="font-bold text-lg">₹{watch.price.toLocaleString('en-IN')}</span>
                    {watch.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{watch.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;