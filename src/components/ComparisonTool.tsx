import React, { useState } from 'react';
import { Plus, X, Scale, Star, Heart, ShoppingCart } from 'lucide-react';

interface Watch {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  specs: {
    movement: string;
    caseSize: string;
    caseMaterial: string;
    strapMaterial: string;
    waterResistance: string;
    features: string[];
    warranty: string;
  };
}

interface ComparisonToolProps {
  isOpen: boolean;
  onToggle: () => void;
  availableWatches: Watch[];
}

const ComparisonTool: React.FC<ComparisonToolProps> = ({ isOpen, onToggle, availableWatches }) => {
  const [selectedWatches, setSelectedWatches] = useState<Watch[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const addWatch = (watch: Watch) => {
    if (selectedWatches.length < 3 && !selectedWatches.find(w => w.id === watch.id)) {
      setSelectedWatches([...selectedWatches, watch]);
    }
    setShowAddModal(false);
  };

  const removeWatch = (watchId: string) => {
    setSelectedWatches(selectedWatches.filter(w => w.id !== watchId));
  };

  const clearAll = () => {
    setSelectedWatches([]);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-violet-600" />
            <h3 className="text-xl font-bold text-gray-900">Compare Watches</h3>
            {selectedWatches.length > 0 && (
              <span className="bg-violet-600 text-white text-xs px-2 py-1 rounded-full">
                {selectedWatches.length}/3
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedWatches.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {selectedWatches.length === 0 ? (
          <div className="text-center py-12">
            <Scale className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Start Comparing</h4>
            <p className="text-gray-600 mb-6">Add up to 3 watches to compare their features side by side</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Add First Watch
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Add Watch Button */}
            {selectedWatches.length < 3 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full border-2 border-dashed border-gray-300 hover:border-violet-400 rounded-xl p-6 transition-colors group"
              >
                <Plus className="h-8 w-8 text-gray-400 group-hover:text-violet-600 mx-auto mb-2" />
                <span className="text-gray-600 group-hover:text-violet-600 font-medium">
                  Add Watch to Compare
                </span>
              </button>
            )}

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <td className="p-4 font-medium text-gray-900 border-b">Watch</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4 border-b">
                        <div className="relative">
                          <button
                            onClick={() => removeWatch(watch.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <img
                            src={watch.image}
                            alt={watch.name}
                            className="w-24 h-24 object-cover rounded-lg mx-auto mb-3"
                          />
                          <div className="text-center">
                            <h4 className="font-semibold text-sm">{watch.name}</h4>
                            <p className="text-xs text-gray-600">{watch.brand}</p>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Price</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4 text-center">
                        <div className="font-bold text-lg">₹{watch.price.toLocaleString('en-IN')}</div>
                        {watch.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{watch.originalPrice.toLocaleString('en-IN')}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Rating</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(watch.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">({watch.reviews} reviews)</div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Movement</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4 text-center text-sm">
                        {watch.specs.movement}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Case Size</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4 text-center text-sm">
                        {watch.specs.caseSize}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Case Material</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4 text-center text-sm">
                        {watch.specs.caseMaterial}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Strap Material</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4 text-center text-sm">
                        {watch.specs.strapMaterial}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Water Resistance</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4 text-center text-sm">
                        {watch.specs.waterResistance}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Features</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4">
                        <ul className="text-xs space-y-1">
                          {watch.specs.features.map((feature, index) => (
                            <li key={index} className="text-center">• {feature}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Warranty</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4 text-center text-sm">
                        {watch.specs.warranty}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Actions</td>
                    {selectedWatches.map((watch) => (
                      <td key={watch.id} className="p-4">
                        <div className="flex flex-col gap-2">
                          <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                          </button>
                          <button className="border border-gray-300 hover:border-red-400 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                            <Heart className="h-4 w-4" />
                            Wishlist
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Watch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Add Watch to Compare</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableWatches
                  .filter(watch => !selectedWatches.find(w => w.id === watch.id))
                  .map((watch) => (
                    <div
                      key={watch.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-violet-400 transition-colors cursor-pointer"
                      onClick={() => addWatch(watch)}
                    >
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-sm mb-1">{watch.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{watch.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">₹{watch.price.toLocaleString('en-IN')}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs">{watch.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComparisonTool;