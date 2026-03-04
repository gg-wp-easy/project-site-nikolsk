import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'ru', name: 'Russian', flag: 'RU' },
  { code: 'en', name: 'English', flag: 'EN' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'ru').split('-')[0];

  useEffect(() => {
    const onClickOutside = (event: MouseEvent | PointerEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', onClickOutside);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('pointerdown', onClickOutside);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
        aria-expanded={isOpen}
        aria-label="Language switcher"
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">
          {languages.find((lang) => lang.code === currentLang)?.flag}
        </span>
        <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
      </motion.button>

      <div
        className={`absolute right-0 mt-2 w-48 transition-all duration-200 z-50 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
        }`}
      >
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                currentLang === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span className="text-xs font-bold tracking-wide">{lang.flag}</span>
              <span className="flex-1">{lang.name}</span>
              {currentLang === lang.code && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}