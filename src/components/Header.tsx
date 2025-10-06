import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, Menu, X, User } from 'lucide-react';
import SignIn from './SignIn';
import Checkout from './Checkout';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleSignIn = (userData: any) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <>
      <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-violet-400">Skouce</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-violet-400 transition-colors font-medium">Home</a>
              <a href="#" className="hover:text-violet-400 transition-colors font-medium">Collections</a>
              <a href="#" className="hover:text-violet-400 transition-colors font-medium">About</a>
              <a href="#" className="hover:text-violet-400 transition-colors font-medium">Contact</a>
            </nav>

            {/* Search and Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search watches..."
                  className="bg-gray-900 text-white px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 w-48"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowCheckout(true)}
                className="p-2 hover:bg-gray-900 rounded-full transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-violet-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 hover:bg-gray-900 rounded-full transition-colors">
                    <User className="h-5 w-5" />
                    <span className="text-sm">{user.firstName}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-3 border-b border-gray-200">
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <a href="#" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">My Orders</a>
                      <a href="#" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Profile</a>
                      <a href="#" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Settings</a>
                      <button 
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded text-red-600"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowSignIn(true)}
                  className="p-2 hover:bg-gray-900 rounded-full transition-colors"
                >
                  <User className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search watches..."
                    className="bg-gray-900 text-white px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 w-full"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <a href="#" className="hover:text-violet-400 transition-colors">Home</a>
                <a href="#" className="hover:text-violet-400 transition-colors">Collections</a>
                <a href="#" className="hover:text-violet-400 transition-colors">About</a>
                <a href="#" className="hover:text-violet-400 transition-colors">Contact</a>
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
                  <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="p-2 hover:bg-gray-900 rounded-full transition-colors relative"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-violet-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                  </button>
                  <button 
                    onClick={() => setShowSignIn(true)}
                    className="p-2 hover:bg-gray-900 rounded-full transition-colors"
                  >
                    <User className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <SignIn 
        isOpen={showSignIn} 
        onClose={() => setShowSignIn(false)} 
        onSignIn={handleSignIn}
      />
      <Checkout 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        cartItems={[]}
      />
    </>
  );
};

export default Header;