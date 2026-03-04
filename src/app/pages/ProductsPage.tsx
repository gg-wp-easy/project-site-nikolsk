import { motion } from "motion/react";
import React, { useEffect, useState, useRef, JSX } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CheckCircle, Shield, Sparkles, Layers, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

// Простые типы
interface Product {
  id: number;
  title: string;
  image: string;
}

interface Advantage {
  icon: React.ElementType;
  title: string;
  description: string;
}


// advantages array will be generated inside component to allow translation

export const ProductsPage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);

  // pagination
  const PAGE_SIZE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageProducts, setPageProducts] = useState<Product[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const cacheRef = useRef<Record<number, Product[]>>({});
  const lastIndexRef = useRef<number>(1);
  const doneRef = useRef<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const { t } = useTranslation();

  const fallbackText = t('image.notLoaded');
  const FALLBACK_IMAGE =
    'data:image/svg+xml,' +
    encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <rect width='100%' height='100%' fill='#f3f4f6'/>
        <text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='#9ca3af' font-family='system-ui' font-size='14'>
          ${fallbackText}
        </text>
      </svg>
    `);

  const advantages: Advantage[] = [
    {
      icon: Shield,
      title: t('products.advantages.safety.title'),
      description: t('products.advantages.safety.description'),
    },
    {
      icon: Sparkles,
      title: t('products.advantages.quality.title'),
      description: t('products.advantages.quality.description'),
    },
    {
      icon: Layers,
      title: t('products.advantages.technology.title'),
      description: t('products.advantages.technology.description'),
    },
    {
      icon: CheckCircle,
      title: t('products.advantages.warranty.title'),
      description: t('products.advantages.warranty.description'),
    },
  ];


  // initial full scan removed; we'll load pages on demand

  const persistCache = () => {
    try {
      sessionStorage.setItem(
        'productsCache',
        JSON.stringify({
          cache: cacheRef.current,
          lastIndex: lastIndexRef.current,
          done: doneRef.current,
        })
      );
    } catch {}
  };

  const loadPage = async (page: number) => {
    if (cacheRef.current[page]) {
      setPageProducts(cacheRef.current[page]);
      setLoadingPage(false);
      return;
    }
    setLoadingPage(true);
    const loaded: Product[] = [];
    const extensions = ['jpg', 'JPG', 'jpeg', 'png'];
    while (loaded.length < PAGE_SIZE && !doneRef.current) {
      const i = lastIndexRef.current;
      if (i > 90) {
        doneRef.current = true;
        break;
      }
      let found = false;
      for (const ext of extensions) {
        const imagePath = `/images/image_${i}.${ext}`;
        try {
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok) {
            found = true;
            loaded.push({
              id: i,
              title: t('products.dummyTitle', { id: i }),
              image: imagePath,
            });
            break;
          }
        } catch {}
      }
      if (!found) {
        if (i > 3) {
          let misses = 0;
          for (let j = i - 3; j < i; j++) {
            let found_j = false;
            for (const ext of extensions) {
              try {
                const resp = await fetch(`/images/image_${j}.${ext}`, { method: 'HEAD' });
                if (resp.ok) {
                  found_j = true;
                  break;
                }
              } catch {}
            }
            if (!found_j) misses++;
          }
          if (misses >= 3) {
            doneRef.current = true;
            persistCache();
            break;
          }
        }
      }
      lastIndexRef.current++;
    }
    cacheRef.current[page] = loaded;
    persistCache();
    setPageProducts(loaded);
    setLoadingPage(false);
  };

  useEffect(() => {
    loadPage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // initial call to populate first page
  useEffect(() => {
    // restore cache
    const saved = sessionStorage.getItem('productsCache');
    if (saved) {
      try {
        const obj = JSON.parse(saved);
        cacheRef.current = obj.cache || {};
        lastIndexRef.current = obj.lastIndex || 1;
        doneRef.current = obj.done || false;
      } catch {}
    }

    loadPage(1).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('products.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
<<<<<<< Updated upstream
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 overflow-hidden">
=======
      <section className="relative py-14 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 overflow-hidden gradient-animate">
>>>>>>> Stashed changes
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:50px_50px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6"
          >
            {t('products.title')}
          </motion.h1>
<<<<<<< Updated upstream
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingPage ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{t('products.loading')}</p>
=======
          <p className="text-base sm:text-lg text-blue-100">
            {t("products.currentCategory", {
              defaultValue: "Категория: {{category}}",
              category: currentCategoryLabel,
            })}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-8">
            {PRODUCT_CATEGORIES.map((category) => {
              const isActive = category.slug === activeCategory;
              return (
                <button
                  key={category.slug}
                  onClick={() => changeCategory(category.slug)}
                  className={`pill-filter ${
                    isActive
                      ? "bg-gradient-to-r from-sky-600 to-cyan-500 text-white border-transparent shadow-[0_10px_20px_rgba(2,132,199,0.3)]"
                      : "bg-white/85 text-gray-700 border-slate-200 hover:border-sky-400 hover:text-sky-700"
                  }`}
                >
                  {t(category.labelKey, { defaultValue: category.fallbackLabel })}
                </button>
              );
            })}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600 py-10">
              {t("products.noItems", { defaultValue: "В этой категории пока нет товаров" })}
            </p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedProducts.map((product) => {
                  const productCategory = getCategoryBySlug(product.category);
                  const productCategoryLabel = t(productCategory.labelKey, {
                    defaultValue: productCategory.fallbackLabel,
                  });
                  const descriptionLines = splitDescriptionLines(product.description);

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -8, scale: 1.01 }}
                      className="surface-card surface-card-hover overflow-hidden group"
                    >
                      <div className="relative h-56 sm:h-64 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain p-4 group-hover:scale-[1.04] transition-transform duration-500"
                          fallbackSrc={FALLBACK_IMAGE}
                        />
                        <div className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-sky-700 backdrop-blur-sm">
                          {productCategoryLabel}
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        {product.title ? (
                          <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                            {product.title}
                          </h3>
                        ) : (
                          <h3 className="text-xl font-bold text-slate-900 mb-2 min-h-[3.5rem]">
                            {t("products.defaultTitle", { defaultValue: "Glass products" })}
                          </h3>
                        )}
                        {descriptionLines.length > 0 ? (
                          <div className="text-slate-600 mb-5 space-y-1.5 min-h-[4.5rem]">
                            {descriptionLines.map((line, index) => (
                              <p key={`${product.id}-description-${index}`} className="text-sm leading-relaxed">
                                {line}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 mb-5 min-h-[4.5rem]">
                            {t("products.subtitle")}
                          </p>
                        )}
                        <button
                          onClick={() => {
                            setModalSrc(product.image);
                            setModalLoading(true);
                          }}
                          className="w-full btn-primary-soft"
                        >
                          {t("products.detailsView")}
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
>>>>>>> Stashed changes
              </div>
            ) : (
              pageProducts.map((product: Product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    fallbackSrc={FALLBACK_IMAGE}
                  />
                </div>

<<<<<<< Updated upstream
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('products.dummyDescription', { id: product.id })}
                  </p>
=======
              <div className="mt-10 overflow-x-auto">
                <div className="flex w-max min-w-full items-center justify-center gap-2 px-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white/90 text-slate-700 disabled:opacity-40"
                  aria-label={t("products.prevPage", { defaultValue: "Предыдущая страница" })}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
>>>>>>> Stashed changes
                  <button
                    onClick={() => {
                      setModalSrc(product.image);
                      setModalLoading(true);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold"
                  >
                    {t('products.detailsView')}
                  </button>
<<<<<<< Updated upstream
                </div>
              </motion.div>
            ))) }
          </div>
=======
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white/90 text-slate-700 disabled:opacity-40"
                  aria-label={t("products.nextPage", { defaultValue: "Следующая страница" })}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                </div>
              </div>
            </>
          )}
>>>>>>> Stashed changes
        </div>
      </section>

      {/* pagination */}
      <div className="flex justify-center items-center gap-4 py-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {t('products.prevPage') || 'Prev'}
        </button>
        <span className="text-gray-700">
          {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={doneRef.current && pageProducts.length < PAGE_SIZE}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {t('products.nextPage') || 'Next'}
        </button>
      </div>

      {/* modal overlay */}
      {modalSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setModalSrc(null)}
        >
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setModalSrc(null); }}
              aria-label={t('products.closeImage')}
              className="absolute top-2 right-2 text-white p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition"
            >
              <X className="w-6 h-6" />
            </button>
            {modalLoading && (
              <div className="w-1/2 h-1/2 bg-gray-200 animate-pulse" />
            )}
            <div className="max-w-[90vw] max-h-[90vh]">
              <ImageWithFallback
                src={modalSrc}
                alt=""
                className={`w-full h-full object-contain ${modalLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                fallbackSrc={FALLBACK_IMAGE}
                onClick={(e) => e.stopPropagation()}
                onLoad={() => setModalLoading(false)}
                onError={() => {
                  setModalLoading(false);
                  console.log('modal image error');
                }}
              />
            </div>
          </div>
        </div>
      )}

<<<<<<< Updated upstream
      {/* Advantages Section */}
      <section className="py-20 bg-white">
=======
      <section className="py-14 sm:py-20 bg-white">
>>>>>>> Stashed changes
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
<<<<<<< Updated upstream
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
=======
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("features.title")}</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">{t("features.subtitle")}</p>
>>>>>>> Stashed changes
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center"
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< Updated upstream
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
=======
      <section className="py-14 sm:py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
>>>>>>> Stashed changes
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
<<<<<<< Updated upstream
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
=======
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{t("cta.title")}</h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t("cta.description")}</p>
>>>>>>> Stashed changes
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
};