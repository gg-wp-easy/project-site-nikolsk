import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PRODUCT_CATEGORIES } from "../shared/productCategories";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            {/*<div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl"></span>
              </div>
              <span className="font-bold text-white">{t('footer.boldTitle')}</span>
            </div>*/}
            <p className="text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="text-sm font-semibold text-gray-200 mb-2">
              {t('footer.marketplaces')}
            </div>
            <div className="flex gap-4 text-base">
              <motion.a
                whileHover={{ y: -2 }}
                href="https://www.wildberries.ru"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-gray-100 hover:text-pink-400 transition-colors"
              >
                Wildberries
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://www.ozon.ru"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-gray-100 hover:text-blue-400 transition-colors"
              >
                Ozon
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://market.yandex.ru"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-gray-100 hover:text-yellow-400 transition-colors"
              >
                Yandex Market
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.navigationLabel')}</h3>
            <ul className="space-y-2">
              {[
                { path: "/", label: t('links.home') },
                { path: "/products", label: t('links.products') },
                { path: "/contact", label: t('links.contact') },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-sm hover:text-blue-400 transition-colors inline-block"
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('links.products')}</h3>
            <ul className="space-y-2 text-sm">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={`footer-category-${category.slug}`}>
                  <Link to={category.slug === "all" ? "/products" : `/products?category=${category.slug}`}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-sm hover:text-blue-400 transition-colors inline-block"
                    >
                      {t(category.labelKey, { defaultValue: category.fallbackLabel })}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('links.contact')}</h3>
            <div className="space-y-4 text-sm">
              <div className="space-y-3">
                {[
                  {
                    label: t('contact.phoneLabels.sales'),
                    display: "+7 937 418 1818",
                    digits: "79374181818",
                  },
                  {
                    label: t('contact.phoneLabels.production'),
                    display: "+7 927 288 6191",
                    digits: "79272886191",
                  },
                ].map((phone) => (
                  <div key={phone.digits} className="space-y-1">
                    <div className="font-medium text-white">{phone.label}</div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <a
                          href={`tel:+${phone.digits}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {phone.display}
                        </a>
                      </div>
                                    
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://t.me/+${phone.digits}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="currentColor"
                        >
                          <path d="M9.993 15.164 9.82 19.1c.43 0 .62-.183.85-.402l2.04-1.932 4.233 3.097c.778.429 1.332.204 1.525-.72l2.763-12.965c.236-1.1-.398-1.53-1.1-1.275L2.28 9.57c-1.063.418-1.048 1.018-.182 1.286l4.64 1.447 10.77-6.8c.506-.312.967-.14.587.198L9.993 15.164z" />
                        </svg>
                        {t('contact.messengers.telegram')}
                      </a>
                      <a
                        href={`https://wa.me/${phone.digits}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-green-400 hover:text-green-300"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="currentColor"
                        >
                          <path d="M20.52 3.48A11.85 11.85 0 0 0 12.03 0C5.4 0 0 5.4 0 12.03c0 2.12.55 4.19 1.6 6.03L0 24l6.18-1.57a12.06 12.06 0 0 0 5.85 1.5h.01c6.63 0 12.03-5.4 12.03-12.03 0-3.22-1.25-6.25-3.55-8.42ZM12.03 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.67.93.98-3.58-.22-.37a9.46 9.46 0 0 1-1.46-4.92c0-5.25 4.27-9.52 9.53-9.52a9.45 9.45 0 0 1 6.73 2.79 9.46 9.46 0 0 1 2.79 6.73c0 5.26-4.27 9.53-9.48 9.53Zm5.47-7.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.89 1.23 3.09.15.2 2.13 3.26 5.15 4.57.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                        </svg>
                        {t('contact.messengers.whatsapp')}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-gray-300 pt-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:info@glasstech.ru" className="hover:text-blue-300">
                  info@glasstech.ru
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
