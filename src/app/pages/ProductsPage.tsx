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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const PAGE_SIZE = 6;

  const cacheRef = useRef<Record<number, Product[]>>({});
  const lastIndexRef = useRef<number>(1);
  const doneRef = useRef<boolean>(false);
  const nextPageRef = useRef<number>(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState<boolean>(false);

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


  // utilities for caching and incremental loading
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

  const loadPage = async (page: number): Promise<Product[]> => {
    if (cacheRef.current[page]) {
      return cacheRef.current[page];
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
    setLoadingPage(false);
    return loaded;
  };

  const loadNextPage = async () => {
    if (loadingPage || doneRef.current) return;
    const page = nextPageRef.current;
    const newItems = await loadPage(page);
    if (newItems.length > 0) {
      setProducts((prev) => [...prev, ...newItems]);
      nextPageRef.current++;
    }
  };

  // intersection observer for infinite scroll
  useEffect(() => {
    if (doneRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage();
        }
      },
      { rootMargin: '200px' }
    );
    const el = sentinelRef.current;
    if (el) obs.observe(el);
    return () => {
      if (el) obs.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // initial page load + restore cache
  useEffect(() => {
    const saved = sessionStorage.getItem('productsCache');
    if (saved) {
      try {
        const obj = JSON.parse(saved);
        cacheRef.current = obj.cache || {};
        lastIndexRef.current = obj.lastIndex || 1;
        doneRef.current = obj.done || false;
        const pages = Object.keys(cacheRef.current)
          .map(Number)
          .sort((a, b) => a - b);
        const all: Product[] = [];
        for (const p of pages) {
          all.push(...(cacheRef.current[p] || []));
        }
        setProducts(all);
        nextPageRef.current = pages.length + 1;
      } catch {}
    }
    loadNextPage().then(() => setLoading(false));
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
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:50px_50px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {t('products.title')}
          </motion.h1>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
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

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('products.dummyDescription', { id: product.id })}
                  </p>
                  <button
                    onClick={() => {
                      setModalSrc(product.image);
                      setModalLoading(true);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold"
                  >
                    {t('products.detailsView')}
                  </button>
                </div>
              </motion.div>
            ))}

            {/* skeleton cards while loading more */}
            {loadingPage && products.length > 0 &&
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-64 bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 w-full animate-pulse" />
                    <div className="h-10 bg-gray-200 w-full animate-pulse" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-1" />

      {/* no more items indicator */}
      {doneRef.current && !loadingPage && (
        <p className="text-center text-gray-500 py-4">
          {t('products.noMore') || 'No more products'}
        </p>
      )}

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
                  //console.log('modal image error');
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold shadow-xl"
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