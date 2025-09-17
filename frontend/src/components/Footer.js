import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="luxury-gradient text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-3">
            <h3 className="text-3xl font-bold font-serif text-accent mb-4">
              Grand Komfort Stroy
            </h3>
            <p className="text-lg text-white/80 mb-6 max-w-md">
              Строительная компания комфорт-класса. Создаём качественную
              недвижимость для комфортной жизни.
            </p>

            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent" />
                <span>+7 (700) 651-23-73</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-accent" />
                <span>г. Кокшетау, ул. Акбидай, 13Б</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl  mb-6">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link
                  to="/apartments"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Квартиры
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          {/* <div>
            <h4 className="text-xl  mb-6">Услуги</h4>
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
              <a
                href="https://www.instagram.com/grand_komfort_stroy?igsh=amIyNWI2azQyeHQz"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary-800"
              >
                <Instagram className="w-6 h-6 text-primary-600 flex-shrink-0 mr-4 mt-1" />
              </a>
              <a
                href="https://wa.me/77006512373"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary-800"
              >
                <FaWhatsapp className="w-6 h-6 text-primary-600 flex-shrink-0 mr-4 mt-1" />
              </a>
            </div>

            <div className="text-white/60 text-center md:text-right">
              <p>&copy; 2025 ТОО Гранд Комфорт Строй</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
