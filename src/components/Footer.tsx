import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, CreditCard, Shield, Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Shield className="h-8 w-8 text-violet-400" />
              <div>
                <h4 className="font-semibold">Authentic Guarantee</h4>
                <p className="text-sm text-gray-400">100% genuine timepieces</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Truck className="h-8 w-8 text-violet-400" />
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-400">On orders over ₹75,000</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-3">
              <CreditCard className="h-8 w-8 text-violet-400" />
              <div>
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-gray-400">SSL encrypted transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-violet-400">Skouce</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your premier destination for luxury timepieces. We curate the finest watches from renowned brands worldwide, ensuring authenticity and excellence in every piece.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Luxury Collection</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Sports Watches</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Gift Cards</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Watch Services</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Size Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Returns & Exchange</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Warranty</a></li>
                <li><a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Get in Touch</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-violet-400" />
                  <span className="text-gray-400">123 Luxury Ave, New York, NY 10001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-violet-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-violet-400" />
                  <span className="text-gray-400">support@skouce.com</span>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-500">Store Hours:</p>
                <p className="text-sm text-gray-400">Mon - Sat: 9AM - 8PM</p>
                <p className="text-sm text-gray-400">Sunday: 11AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Skouce. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;