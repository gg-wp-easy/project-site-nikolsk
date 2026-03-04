import { motion } from "motion/react";
import React, { JSX, useEffect, useMemo, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CheckCircle, Shield, Sparkles, Layers, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import {
  getCategoryBySlug,
  PRODUCT_CATEGORIES,
  PRODUCT_IMAGE_CATEGORIES,
  ProductCategorySlug,
} from "../shared/productCategories";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import productManifest from "../shared/product-manifest.json";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import productsData from "../shared/products-data.json";

interface Product {
  id: number;
  title: string;
  image: string;
  category: Exclude<ProductCategorySlug, "all">;
  description: string;
}

interface Advantage {
  icon: React.ElementType;
  title: string;
  description: string;
}

const PAGE_SIZE = 12;
type ProductManifestItem = {
  id: number;
  src: string;
  name: string;
  path: string;
  category: string;
  filename: string;
};

type ProductManifest = {
  categories: Record<string, ProductManifestItem[]>;
  all: ProductManifestItem[];
};

const manifest = productManifest as ProductManifest;

type ProductDataItem = {
  title: string;
  description: string;
};

type ProductsData = {
  categories: Record<string, Record<string, ProductDataItem>>;
};

const productsCatalog = productsData as ProductsData;

const splitDescriptionLines = (description: string): string[] =>
  description
    .replace(/\\n/g, "\n")
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

export const ProductsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  const activeCategory = useMemo(
    () => getCategoryBySlug(searchParams.get("category")).slug,
    [searchParams],
  );

  const fallbackText = t("image.notLoaded");
  const FALLBACK_IMAGE =
    "data:image/svg+xml," +
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
      title: t("products.advantages.safety.title"),
      description: t("products.advantages.safety.description"),
    },
    {
      icon: Sparkles,
      title: t("products.advantages.quality.title"),
      description: t("products.advantages.quality.description"),
    },
    {
      icon: Layers,
      title: t("products.advantages.technology.title"),
      description: t("products.advantages.technology.description"),
    },
    /*{
      icon: CheckCircle,
      title: t("products.advantages.warranty.title"),
      description: t("products.advantages.warranty.description"),
    },*/
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProducts = useMemo(() => {
    const loaded: Product[] = [];
    let productId = 1;

    for (const category of PRODUCT_IMAGE_CATEGORIES) {
      if (!category.folder) continue;
      const items = manifest.categories?.[category.folder] ?? [];
      const catalogItems = productsCatalog.categories?.[category.folder] ?? {};

      for (const item of items) {
        const meta = catalogItems[item.filename];
        loaded.push({
          id: productId++,
          title: meta?.title?.trim() ? meta.title : "",
          image: item.src,
          category: category.slug,
          description: meta?.description?.trim() ? meta.description : "",
        });
      }
    }

    return loaded;
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return allProducts;
    return allProducts.filter((product) => product.category === activeCategory);
  }, [activeCategory, allProducts]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredProducts]);

  const changeCategory = (slug: ProductCategorySlug) => {
    const next = new URLSearchParams(searchParams);
    if (slug === "all") {
      next.delete("category");
    } else {
      next.set("category", slug);
    }
    setSearchParams(next);
  };

  const currentCategoryLabel = t(getCategoryBySlug(activeCategory).labelKey, {
    defaultValue: getCategoryBySlug(activeCategory).fallbackLabel,
  });

  return (
    <div className="min-h-screen">
      <section className="relative py-14 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 overflow-hidden gradient-animate">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:50px_50px]" />
        </div>
        <div className="floating-orb h-48 w-48 bg-cyan-300/25 -top-12 left-8" />
        <div className="floating-orb floating-orb-delay floating-orb-slow h-56 w-56 bg-blue-300/20 -bottom-16 right-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6"
          >
            {t("products.title")}
          </motion.h1>
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
              </div>

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
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-10 h-10 px-3 rounded-lg border ${
                      page === currentPage
                        ? "bg-sky-600 text-white border-sky-600 shadow-[0_8px_18px_rgba(2,132,199,0.35)]"
                        : "bg-white/90 text-slate-700 border-slate-300 hover:border-sky-500"
                    }`}
                  >
                    {page}
                  </button>
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
        </div>
      </section>

      {modalSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setModalSrc(null)}
        >
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalSrc(null);
              }}
              aria-label={t("products.closeImage")}
              className="absolute top-2 right-2 text-white p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition"
            >
              <X className="w-6 h-6" />
            </button>
            {modalLoading && <div className="w-1/2 h-1/2 bg-gray-200 animate-pulse" />}
            <div className="max-w-[100vw] max-h-[100vh]">
              <ImageWithFallback
                src={modalSrc}
                alt=""
                className={`w-full h-full object-contain ${
                  modalLoading ? "opacity-0" : "opacity-100"
                } transition-opacity duration-500`}
                fallbackSrc={FALLBACK_IMAGE}
                onClick={(e) => e.stopPropagation()}
                onLoad={() => setModalLoading(false)}
                onError={() => setModalLoading(false)}
              />
            </div>
          </div>
        </div>
      )}

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("features.title")}</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">{t("features.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{t("cta.title")}</h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t("cta.description")}</p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-blue-600 rounded-lg text-base sm:text-lg font-semibold shadow-xl"
              >
                {t("cta.button")}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
