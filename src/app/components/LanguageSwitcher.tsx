import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'ru', name: 'Русский', flag: 'ru' },
  { code: 'en', name: 'English', flag: 'en' }
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">
          {languages.find(lang => lang.code === currentLang)?.flag}
        </span>
        <span className="text-sm font-medium">
          {currentLang.toUpperCase()}
        </span>
      </motion.button>

      {/* Выпадающее меню */}
      <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                currentLang === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="flex-1">{lang.name}</span>
              {currentLang === lang.code && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-blue-600 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}