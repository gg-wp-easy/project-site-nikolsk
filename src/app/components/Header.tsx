import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation(); 
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: t('links.home') },
    { path: "/products", label: t('links.products') },
    //{ path: "/about", label: t('links.about') },
    { path: "/contact", label: t('links.contact') },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              {/*<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>*/}
              <div>
                {/*<div className="font-bold text-gray-900">GlassTech</div>*/}
                <div className="nav-brand-text">{t('header.nameFacture')}</div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="relative py-2 px-3 rounded-full transition-colors hover:bg-slate-100/70"
                >
                  <span
                    className={`nav-link-text transition-colors ${
                      location.pathname === item.path
                        ? "text-sky-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-600"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <span className="text-sm font-semibold text-gray-600">
                {t('header.marketplaces')}
              </span>
              <a
                href="https://www.wildberries.ru"
                target="_blank"
                rel="noreferrer"
                className="nav-link-text text-gray-800 hover:text-pink-600 transition-colors"
              >
                Wildberries
              </a>
              <a
                href="https://www.ozon.ru"
                target="_blank"
                rel="noreferrer"
                className="nav-link-text text-gray-800 hover:text-blue-600 transition-colors"
              >
                Ozon
              </a>
              <a
                href="https://market.yandex.ru"
                target="_blank"
                rel="noreferrer"
                className="nav-link-text text-gray-800 hover:text-yellow-600 transition-colors"
              >
                Yandex Market
              </a>
            </div>
          </nav>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact">
              <button className="hidden md:block btn-primary-soft">
                {t('header.connection')}
              </button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100/80 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div
                  className={`py-3 px-4 rounded-xl mb-2 ${
                    location.pathname === item.path
                      ? "bg-sky-50 text-sky-700"
                      : "text-gray-600 hover:bg-slate-100/80"
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            <div className="mt-3 px-4">
              <div className="nav-link-text text-gray-600 mb-2">
                {t('header.marketplaces')}
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.wildberries.ru"
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link-text text-gray-800 hover:text-pink-600 transition-colors"
                >
                  Wildberries
                </a>
                <a
                  href="https://www.ozon.ru"
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link-text text-gray-800 hover:text-blue-600 transition-colors"
                >
                  Ozon
                </a>
                <a
                  href="https://market.yandex.ru"
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link-text text-gray-800 hover:text-yellow-600 transition-colors"
                >
                  Yandex Market
                </a>
              </div>
            </div>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full mt-2 btn-primary-soft">
                {t('header.connection')}
              </button>
            </Link>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
