import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = currentScrollPos > 100;
      
      setIsScrolled(isScrolledDown);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
        setVisible(false); // Hide when scrolling down
      } else {
        setVisible(true); // Show when scrolling up or at top
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const navItems = [
    { href: '/about', label: 'О компании' },
    { href: '/apartments', label: 'Квартиры' },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      visible ? 'translate-y-0' : '-translate-y-full'
    } ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-luxury' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl lg:text-3xl font-bold font-serif transition-colors duration-300 ${
              isScrolled ? 'text-primary-900' : 'text-white'
            }`}>
              GRAND
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm lg:text-base font-medium transition-colors duration-300 hover:text-accent ${
                  location.pathname === item.href ? 'text-accent' : ''
                } ${
                  isScrolled ? 'text-primary-900' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-primary-900' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t animate-slide-up">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-4 py-2 font-medium hover:bg-neutral-light/50 transition-colors ${
                    location.pathname === item.href ? 'text-accent' : 'text-primary-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}