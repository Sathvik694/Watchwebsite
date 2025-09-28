import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedWatches from './components/FeaturedWatches';
import Categories from './components/Categories';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedWatches />
        <Categories />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;