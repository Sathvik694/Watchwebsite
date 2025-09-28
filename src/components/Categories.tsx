import React from 'react';

const categories = [
  {
    name: "Luxury",
    description: "Premium timepieces for the discerning collector",
    image: "https://images.pexels.com/photos/5120892/pexels-photo-5120892.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: "150+ Watches"
  },
  {
    name: "Sport",
    description: "Built for performance and adventure",
    image: "https://images.pexels.com/photos/1036646/pexels-photo-1036646.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: "80+ Watches"
  },
  {
    name: "Classic",
    description: "Timeless designs that never go out of style",
    image: "https://images.pexels.com/photos/9663717/pexels-photo-9663717.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: "120+ Watches"
  },
  {
    name: "Smart",
    description: "Technology meets traditional craftsmanship",
    image: "https://images.pexels.com/photos/1877338/pexels-photo-1877338.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: "45+ Watches"
  }
];

const Categories = () => {
  return (
    <section className="py-16 md:py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-violet-400 font-medium tracking-wide uppercase text-sm mb-2">Browse Categories</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect <span className="text-violet-400">Style</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            From luxury elegance to rugged sports watches, discover the category that matches your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <div className="aspect-square relative">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-violet-900/80 transition-colors duration-300"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-violet-300 transition-colors">{category.name}</h3>
                  <p className="text-sm text-gray-300 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{category.description}</p>
                  <p className="text-xs text-violet-400 font-medium">{category.count}</p>
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;