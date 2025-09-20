import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const BRAND_COLOR = "#ce9270";
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  /* ————————— СКРОЛЛ ————————— */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrolledPast = currentScrollPos > 100;

      setIsScrolled(scrolledPast);
      if (!mobileMenuOpen && currentScrollPos > prevScrollPos && scrolledPast) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, mobileMenuOpen]);

  /* ————————— Блокировка скролла при открытом меню ————————— */
  useEffect(() => {
    document.documentElement.classList.toggle(
      "overflow-hidden",
      mobileMenuOpen,
    );
  }, [mobileMenuOpen]);

  const darkHeader = isScrolled || mobileMenuOpen;

  const navItems = [
    { href: "/", label: "Главная" },
    { href: "/about", label: "О компании" },
    { href: "/apartments", label: "Квартиры" },
    { href: "/contacts", label: "Контакты" },
  ];

  /* ————————— Бургер-крестик ————————— */
  const Burger = ({ open }) => (
    <div className="relative w-7 h-7">
      <span
        className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transition-transform duration-300 ${
          open ? "rotate-45" : "-translate-y-1.5"
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 w-full h-0.5 bg-current transition-transform duration-300 ${
          open ? "-rotate-45" : "translate-y-1.5"
        }`}
      />
    </div>
  );

  return (
    <>
      {/* Навигационная шапка */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-200
          ${visible || mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}
          ${
            isHomePage || isAboutPage
              ? darkHeader
                ? "bg-[#FFFFFF]"
                : "bg-transparent"
              : "bg-[#FFFFFF]"
          }
          
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Логотип */}
            <Link to="/" className="flex items-center">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "https://storage.yandexcloud.net/vizuz/logo-update.webp"
                }
                alt="GRAND Logo"
                className="h-16 w-auto"
              />
            </Link>

            {/* Десктоп-меню */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const linkColor = isActive
                  ? BRAND_COLOR
                  : isHomePage || isAboutPage
                    ? darkHeader
                      ? "#000"
                      : "#FFF"
                    : "#000";

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-sm lg:text-base font-medium transition-colors duration-300 hover:text-[#ce9270]"
                    style={{ color: linkColor }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Бургер-кнопка для мобильного */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2 transition-colors duration-300 hover:text-[#ce9270]"
              style={{
                color:
                  isHomePage || isAboutPage
                    ? darkHeader
                      ? "#000"
                      : "#FFF"
                    : "#000",
              }}
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <Burger open={mobileMenuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Мобильное полноэкранное меню */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="
            fixed inset-0 z-40 bg-[#FFFFFF]
            flex flex-col justify-between
            pt-20 px-8 pb-10
            overflow-y-auto md:hidden
          "
        >
          {/* Ссылки страниц */}
          <div className="space-y-6 pt-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="
                  block
                  text-2xl sm:text-3xl md:text-4xl
                  text-[#24292E] opacity-80 hover:opacity-100
                  transition-opacity
                "
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Контакты внизу мобильного меню */}

          <div className="space-y-1 pb-8">
            <div className="pb-4">
              <a
                href="tel:+77006512373"
                className="block text-lg font-medium hover:opacity-80"
                onClick={(e) => e.stopPropagation()}
              >
                +7 (700) 651-23-73
              </a>
              <p className="text-sm text-gray-500">Пн–Пт: 9:00–18:00</p>
            </div>
            <a
              href="https://wa.me/77006512373"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-2xl hover:opacity-80"
              onClick={(e) => e.stopPropagation()}
            >
              <IoLogoWhatsapp className="w-8 h-8 text-primary-600 flex-shrink-0 mr-4 mt-1" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
