import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import icon from "../assets/icon.png";

export function Header() {
  const { t } = useTranslation(); 
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const marketplaces = [
    {
      name: "Wildberries",
      href: "https://www.wildberries.ru",
      color: "hover:text-pink-600",
    },
    {
      name: "Ozon",
      href: "https://www.ozon.ru",
      color: "hover:text-blue-600",
    },
    {
      name: "Yandex Market",
      href: "https://market.yandex.ru",
      color: "hover:text-yellow-600",
    },
  ];

  const navItems = [
    { path: "/", label: t('links.home') },
    { path: "/products", label: t('links.products') },
    //{ path: "/about", label: t('links.about') },
    { path: "/contact", label: t('links.contact') },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-white/70 bg-white/75 backdrop-blur-md shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
    >
      <div className="mx-auto w-full max-w-[24rem] px-4 sm:max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-3 py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="min-w-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex min-w-0 items-center gap-2"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl"><img src={icon} alt="Трайд Сервис" /></span>
              </div>
              <div>
                {/*<div className="font-bold text-gray-900">GlassTech</div>*/}
                <div className="nav-brand-text max-w-[180px] sm:max-w-none leading-snug">
                  {t('header.nameFacture')}
                </div>
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
            <div className="relative border-l border-gray-200 pl-4">
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-slate-100/80 hover:text-gray-900"
                >
                  <span>{t('header.marketplaces')}</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="pointer-events-none absolute left-0 top-full z-50 min-w-56 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  <div className="rounded-xl border border-slate-200/90 bg-white/95 p-2 shadow-[0_16px_32px_rgba(15,23,42,0.14)] backdrop-blur-sm">
                    {marketplaces.map((marketplace) => (
                      <a
                        key={marketplace.name}
                        href={marketplace.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`block rounded-lg px-3 py-2 nav-link-text text-gray-800 transition-colors hover:bg-slate-50 ${marketplace.color}`}
                      >
                        {marketplace.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
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
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden shrink-0 p-2 rounded-lg hover:bg-slate-100/80 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px]"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.nav
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="md:hidden relative z-50 pb-4"
              >
                <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-[0_16px_30px_rgba(15,23,42,0.1)] backdrop-blur-sm">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: 0.03 * index }}
                    >
                      <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>
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
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: 0.12 }}
                    className="mt-2 px-4 pb-1"
                  >
                    <div className="nav-link-text text-gray-600 mb-2">
                      {t('header.marketplaces')}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      {marketplaces.map((marketplace) => (
                        <a
                          key={marketplace.name}
                          href={marketplace.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`nav-link-text text-gray-800 transition-colors ${marketplace.color}`}
                        >
                          {marketplace.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: 0.15 }}
                  >
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full mt-3 btn-primary-soft">
                        {t('header.connection')}
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
