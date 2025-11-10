'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Car } from 'lucide-react';

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg backdrop-blur-sm bg-opacity-95'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <Car className="w-8 h-8 text-toyota-red transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-toyota-red opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-300" />
            </div>
            <span
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-toyota-red' : 'text-white'
              }`}
            >
              Toyota
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-toyota-red ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-toyota-red transition-all duration-300 hover:w-full" />
              </a>
            ))}
            <Link
              href="#vehicles"
              onClick={(e) => handleNavClick(e, '#vehicles')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isScrolled
                  ? 'bg-toyota-red text-white hover:bg-red-700'
                  : 'bg-white text-toyota-red hover:bg-gray-100'
              }`}
            >
              Browse Vehicles
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 animate-rotate-in" />
            ) : (
              <Menu className="w-6 h-6 animate-fade-in" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block py-2 text-base font-medium transition-colors duration-300 hover:text-toyota-red ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link
              href="#vehicles"
              onClick={(e) => handleNavClick(e, '#vehicles')}
              className="block w-full px-6 py-2 bg-toyota-red text-white rounded-full font-medium text-center transition-all duration-300 hover:bg-red-700"
            >
              Browse Vehicles
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

