import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl"></span>
              </div>
              <span className="font-bold text-white">{t('footer.boldTitle')}</span>
            </div>
            <p className="text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
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
              <li className="hover:text-blue-400 transition-colors cursor-pointer">
                <Link to="/products">
                  {t('classProducts.colbs')}
                </Link>
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">
                <Link to="/products">
                  {t('classProducts.glassDecorate')}
                </Link>
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">
                <Link to="/products">
                  {t('classProducts.different')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('links.contact')}</h3>
            <ul className="space-y-3 text-sm">
              {/*<li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-blue-400" />
                <span>{t('footer.address')}</span>
              </li>*/}
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{t('contact.details.phone.0')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>info@glasstech.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
