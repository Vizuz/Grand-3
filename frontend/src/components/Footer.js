import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="luxury-gradient text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-3">
            <h3 className="text-3xl font-bold font-serif text-accent mb-4">GRAND</h3>
            <p className="text-lg text-white/80 mb-6 max-w-md">
              Строительная компания премиум-класса. Создаём элитную недвижимость для комфортной жизни.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent" />
                <span>+7 (727) 123-45-67</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent" />
                <span>info@grand-construction.kz</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-accent" />
                <span>г. Алматы, ул. Абая 125, офис 501</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-accent transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/apartments" className="text-white/80 hover:text-accent transition-colors">
                  Квартиры
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-white/80 hover:text-accent transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          {/* <div>
            <h4 className="text-xl font-semibold mb-6">Услуги</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/apartments" className="text-white/80 hover:text-accent transition-colors">
                  Продажа квартир
                </Link>
              </li>
              <li>
                <span className="text-white/80">Ипотечное кредитование</span>
              </li>
              <li>
                <span className="text-white/80">Бронирование</span>
              </li>
              <li>
                <span className="text-white/80">Консультации</span>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-white/80 hover:text-accent transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors">
                <Send className="w-6 h-6" />
              </a>
            </div>
            
            <div className="text-white/60 text-center md:text-right">
              <p>&copy; 2025 GrandKomfortStroy. Все права защищены.</p>
              <p className="text-sm mt-1">
                Лицензия на строительную деятельность №12345 |{' '}
                <Link to="/admin" className="text-accent hover:text-accent-600 transition-colors">
                  Администрирование
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}