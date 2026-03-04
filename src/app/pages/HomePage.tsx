import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle, Award, Users, Sparkles, Shield } from "lucide-react";
import { GlassAnimation } from "../components/animations/GlassAnimation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { PRODUCT_CATEGORIES, PRODUCT_IMAGE_CATEGORIES } from "../shared/productCategories";

export function HomePage() {
  const { t } = useTranslation();

  const features = [
    /*{
      icon: Award,
      title: t('features.quality.title'),
      description: t('features.quality.description'),
    },*/
    {
      icon: Sparkles,
      title: t('features.innovation.title'),
      description: t('features.innovation.description'),
    },
    {
      icon: Users,
      title: t('features.team.title'),
      description: t('features.team.description'),
    },
    {
      icon: Shield,
      title: t("products.advantages.safety.title"),
      description: t("products.advantages.safety.description"),
    },
  ];

  const categoryLinks = PRODUCT_CATEGORIES.map((category) => ({
    slug: category.slug,
    title: t(category.labelKey, { defaultValue: category.fallbackLabel }),
    to: category.slug === "all" ? "/products" : `/products?category=${category.slug}`,
  }));
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[88vh] sm:h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas анимация вместо изображения */}
        <GlassAnimation />

        {/* Кнопка переключения языка в правом верхнем углу */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <LanguageSwitcher />
        </div>

        {/* Затемняющий оверлей для лучшей читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-transparent to-cyan-950/70 gradient-animate" />
        <div className="floating-orb h-36 w-36 sm:h-52 sm:w-52 bg-cyan-300/30 top-16 left-4 sm:left-12" />
        <div className="floating-orb floating-orb-delay floating-orb-slow h-44 w-44 sm:h-64 sm:w-64 bg-blue-400/25 bottom-10 right-2 sm:right-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-5 sm:mb-6"
          >
              {t('hero.title')}
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto"
          >
            
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4 justify-center items-center sm:flex-row sm:justify-center"
          >
            <Link to="/products" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary-soft w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg"
              >
                {t('hero.products')}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50"
              >
                {t('hero.contact')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Stats Section */}
      {/*<section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Features Section */}
      <section className="py-14 sm:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" >
              {t('features.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -7, rotate: -0.3 }}
                className="surface-card surface-card-hover p-6"
              >
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.08 }}
                  transition={{ duration: 0.25 }}
                  className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4"
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('products.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              {t('products.subtitle')}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categoryLinks.map((category) => (
              <Link
                key={`category-link-${category.slug}`}
                to={category.to}
                className="pill-filter bg-white/85 text-gray-700 border-slate-200 hover:border-sky-400 hover:text-sky-700"
              >
                {category.title}
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCT_IMAGE_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.01 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg mb-4 h-80">
                  <ImageWithFallback
                    src={category.previewImage}
                    alt={t(category.labelKey, { defaultValue: category.fallbackLabel })}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {t(category.labelKey, { defaultValue: category.fallbackLabel })}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="text-white"
                    >
                      <Link to={`/products?category=${category.slug}`} className="flex items-center gap-2">
                        <span>{t('products.details')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary-soft px-8 py-3"
              >
                {t('products.viewAll')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1610896813398-6e965b3cc1b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG1hbnVmYWN0dXJpbmclMjBmYWN0b3J5fGVufDF8fHx8MTc3MTkwODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Производство стекла"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-blue-600 rounded-lg text-base sm:text-lg font-semibold shadow-xl"
              >
                {t('cta.button')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
