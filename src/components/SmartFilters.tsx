import React, { useState } from 'react';
import { Filter, X, ChevronDown, Search } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'range' | 'select';
  options?: FilterOption[];
  min?: number;
  max?: number;
  unit?: string;
}

interface SmartFiltersProps {
  onFiltersChange: (filters: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SmartFilters: React.FC<SmartFiltersProps> = ({ onFiltersChange, isOpen, onToggle }) => {
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['brand', 'price']);
  const [searchTerm, setSearchTerm] = useState('');

  const filterGroups: FilterGroup[] = [
    {
      id: 'brand',
      label: 'Brand',
      type: 'checkbox',
      options: [
        { id: 'rolex', label: 'Rolex', count: 45 },
        { id: 'omega', label: 'Omega', count: 32 },
        { id: 'tag-heuer', label: 'TAG Heuer', count: 28 },
        { id: 'breitling', label: 'Breitling', count: 24 },
        { id: 'seiko', label: 'Seiko', count: 67 },
        { id: 'citizen', label: 'Citizen', count: 43 },
        { id: 'casio', label: 'Casio', count: 89 },
        { id: 'tissot', label: 'Tissot', count: 36 }
      ]
    },
    {
      id: 'price',
      label: 'Price Range (₹)',
      type: 'range',
      min: 10000,
      max: 500000,
      unit: '₹'
    },
    {
      id: 'style',
      label: 'Style',
      type: 'checkbox',
      options: [
        { id: 'luxury', label: 'Luxury', count: 156 },
        { id: 'sport', label: 'Sport', count: 89 },
        { id: 'classic', label: 'Classic', count: 134 },
        { id: 'casual', label: 'Casual', count: 98 },
        { id: 'dress', label: 'Dress', count: 76 },
        { id: 'diving', label: 'Diving', count: 45 }
      ]
    },
    {
      id: 'color',
      label: 'Color',
      type: 'checkbox',
      options: [
        { id: 'black', label: 'Black', count: 234 },
        { id: 'silver', label: 'Silver', count: 189 },
        { id: 'gold', label: 'Gold', count: 156 },
        { id: 'blue', label: 'Blue', count: 98 },
        { id: 'white', label: 'White', count: 87 },
        { id: 'rose-gold', label: 'Rose Gold', count: 76 }
      ]
    },
    {
      id: 'strap',
      label: 'Strap Type',
      type: 'checkbox',
      options: [
        { id: 'metal', label: 'Metal Bracelet', count: 198 },
        { id: 'leather', label: 'Leather', count: 156 },
        { id: 'rubber', label: 'Rubber/Silicone', count: 89 },
        { id: 'fabric', label: 'Fabric/NATO', count: 67 },
        { id: 'ceramic', label: 'Ceramic', count: 34 }
      ]
    },
    {
      id: 'movement',
      label: 'Movement',
      type: 'checkbox',
      options: [
        { id: 'automatic', label: 'Automatic', count: 167 },
        { id: 'quartz', label: 'Quartz', count: 234 },
        { id: 'smartwatch', label: 'Smartwatch', count: 89 },
        { id: 'solar', label: 'Solar Powered', count: 45 },
        { id: 'kinetic', label: 'Kinetic', count: 23 }
      ]
    },
    {
      id: 'water-resistance',
      label: 'Water Resistance',
      type: 'checkbox',
      options: [
        { id: '30m', label: '30m (Splash Resistant)', count: 89 },
        { id: '50m', label: '50m (Swimming)', count: 134 },
        { id: '100m', label: '100m (Snorkeling)', count: 156 },
        { id: '200m', label: '200m (Diving)', count: 98 },
        { id: '300m+', label: '300m+ (Professional)', count: 67 }
      ]
    },
    {
      id: 'case-size',
      label: 'Case Size (mm)',
      type: 'range',
      min: 28,
      max: 50,
      unit: 'mm'
    }
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleFilterChange = (groupId: string, value: any) => {
    const newFilters = { ...activeFilters };
    
    if (filterGroups.find(g => g.id === groupId)?.type === 'checkbox') {
      if (!newFilters[groupId]) newFilters[groupId] = [];
      
      if (newFilters[groupId].includes(value)) {
        newFilters[groupId] = newFilters[groupId].filter((v: any) => v !== value);
      } else {
        newFilters[groupId] = [...newFilters[groupId], value];
      }
      
      if (newFilters[groupId].length === 0) {
        delete newFilters[groupId];
      }
    } else {
      newFilters[groupId] = value;
    }
    
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilter = (groupId: string, value?: any) => {
    const newFilters = { ...activeFilters };
    
    if (value && Array.isArray(newFilters[groupId])) {
      newFilters[groupId] = newFilters[groupId].filter((v: any) => v !== value);
      if (newFilters[groupId].length === 0) {
        delete newFilters[groupId];
      }
    } else {
      delete newFilters[groupId];
    }
    
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, value) => {
      if (Array.isArray(value)) return count + value.length;
      return count + 1;
    }, 0);
  };

  const filteredOptions = (options: FilterOption[]) => {
    if (!searchTerm) return options;
    return options.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="h-6 w-6 text-violet-600" />
          <h3 className="text-xl font-bold text-gray-900">Smart Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-violet-600 text-white text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Active Filters</h4>
            <button
              onClick={clearAllFilters}
              className="text-sm text-violet-600 hover:text-violet-700 font-medium"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([groupId, values]) => {
              const group = filterGroups.find(g => g.id === groupId);
              if (!group) return null;
              
              if (Array.isArray(values)) {
                return values.map((value: string) => {
                  const option = group.options?.find(o => o.id === value);
                  return (
                    <span
                      key={`${groupId}-${value}`}
                      className="inline-flex items-center gap-1 bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm"
                    >
                      {option?.label}
                      <button
                        onClick={() => clearFilter(groupId, value)}
                        className="hover:bg-violet-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                });
              } else {
                return (
                  <span
                    key={groupId}
                    className="inline-flex items-center gap-1 bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm"
                  >
                    {group.label}: {values}{group.unit}
                    <button
                      onClick={() => clearFilter(groupId)}
                      className="hover:bg-violet-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              }
            })}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search filters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Filter Groups */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filterGroups.map((group) => (
          <div key={group.id} className="border border-gray-200 rounded-xl">
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{group.label}</span>
              <ChevronDown 
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  expandedGroups.includes(group.id) ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {expandedGroups.includes(group.id) && (
              <div className="px-4 pb-4">
                {group.type === 'checkbox' && group.options && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredOptions(group.options).map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters[group.id]?.includes(option.id) || false}
                          onChange={() => handleFilterChange(group.id, option.id)}
                          className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                        />
                        <span className="flex-1 text-sm text-gray-700">{option.label}</span>
                        {option.count && (
                          <span className="text-xs text-gray-500">({option.count})</span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
                
                {group.type === 'range' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        placeholder={`Min ${group.unit}`}
                        value={activeFilters[group.id]?.min || ''}
                        onChange={(e) => handleFilterChange(group.id, {
                          ...activeFilters[group.id],
                          min: parseInt(e.target.value) || group.min
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        placeholder={`Max ${group.unit}`}
                        value={activeFilters[group.id]?.max || ''}
                        onChange={(e) => handleFilterChange(group.id, {
                          ...activeFilters[group.id],
                          max: parseInt(e.target.value) || group.max
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      Range: {group.min}{group.unit} - {group.max}{group.unit}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartFilters;