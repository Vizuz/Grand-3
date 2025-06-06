import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const BRAND_COLOR = '#ce9270';

  /* ————————— СКРОЛЛ ————————— */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = currentScrollPos > 100;

      setIsScrolled(isScrolledDown);

      // прячем на скролл‑вниз (кроме случая, когда меню открыто)
      if (!mobileMenuOpen && currentScrollPos > prevScrollPos && currentScrollPos > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, mobileMenuOpen]);

  /* ————————— Блокировка скролла, когда меню открыто ————————— */
  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', mobileMenuOpen);
  }, [mobileMenuOpen]);

  const darkHeader = isScrolled || mobileMenuOpen;

  const navItems = [
    { href: '/about', label: 'О компании' },
    { href: '/apartments', label: 'Квартиры' },
    { href: '/contacts', label: 'Контакты' },
  ];

  /* ————————— Компонент бургер‑крестик ————————— */
  const Burger = ({ open }) => (
    <div className="relative w-7 h-7">
      <span
        className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transition-transform duration-300
          ${open ? 'rotate-45' : '-translate-y-1.5'}`}
      />
      <span
        className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transition-transform duration-300
          ${open ? '-rotate-45' : 'translate-y-1.5'}`}
      />
    </div>
  );

  return (
    <>
      {/* Шапка */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${visible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          ${darkHeader ? 'bg-[#F2E8E0] backdrop-blur-md shadow-luxury' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Лого */}
            <Link to="/" className="flex items-center">
              <span
                className="text-2xl text-[#FFFFFF] lg:text-3xl font-bold font-serif transition-colors duration-300 hover:text-[#ce9270]"

              >
                GRAND
              </span>
            </Link>

            {/* Десктоп‑меню */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-sm lg:text-base font-medium transition-colors duration-300 hover:text-[#ce9270]"
                    style={{ color: isActive ? BRAND_COLOR : darkHeader ? '#000000' : '#FFFFFF' }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Кнопка бургер‑крестик */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2 transition-colors duration-300 hover:text-[#ce9270]"
              style={{ color: darkHeader ? '#000000' : '#FFFFFF' }}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              <Burger open={mobileMenuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Мобильное полноэкранное меню */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#F2E8E0] flex flex-col items-center justify-center space-y-8 md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="text-2xl font-medium transition-colors duration-300 hover:text-[#ce9270]"
                style={{ color: isActive ? BRAND_COLOR : '#000000' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
