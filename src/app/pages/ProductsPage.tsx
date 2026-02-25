import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CheckCircle, Shield, Sparkles, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

// Простые типы
interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface Advantage {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Константа для заглушки
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%239ca3af\' font-family=\'system-ui\' font-size=\'14\'%3EИзображение не загружено%3C/text%3E%3C/svg%3E';

const advantages: Advantage[] = [
  {
    icon: Shield,
    title: "Безопасность",
    description: "Все продукты соответствуют стандартам безопасности",
  },
  {
    icon: Sparkles,
    title: "Качество",
    description: "Используем только премиальное сырье",
  },
  {
    icon: Layers,
    title: "Технологии",
    description: "Современное оборудование и методы производства",
  },
  {
    icon: CheckCircle,
    title: "Гарантия",
    description: "Долгосрочная гарантия на всю продукцию",
  },
];

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const categories = [
    t('classProducts.all'),
    t('classProducts.colbs'),
    t('classProducts.glassDecorate'),
    t('classProducts.different')
  ];

  // Просто загружаем изображения 1-50
  useEffect(() => {
    const loadProducts = async () => {
      console.log('📸 Загрузка изображений...');
      const loadedProducts: Product[] = [];
      
      // Пробуем загрузить до 50 изображений
      for (let i = 1; i <= 50; i++) {
        // Пробуем разные расширения
        const extensions = ['jpg', 'JPG', 'jpeg', 'png'];
        let found = false;
        
        for (const ext of extensions) {
          const imagePath = `/images/image_${i}.${ext}`;
          
          try {
            const response = await fetch(imagePath, { method: 'HEAD' });
            if (response.ok) {
              console.log(`✅ Найдено: image_${i}.${ext}`);
              
              // Определяем категорию
              const categoryIndex = (i - 1) % 3;
              const category = categoryIndex === 0 ? categories[1] : 
                              categoryIndex === 1 ? categories[2] : 
                              categories[3];
              
              loadedProducts.push({
                id: i,
                title: `Продукт ${i}`,
                category: category,
                image: imagePath
              });
              found = true;
              break;
            }
          } catch {
            // Игнорируем ошибки
          }
        }
        
        // Если 3 раза подряд не нашли, прекращаем поиск
        if (!found && i > 3) {
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
            console.log(`🛑 Остановка после ${i-1} изображений`);
            break;
          }
        }
      }
      
      console.log(`📊 Всего загружено: ${loadedProducts.length} товаров`);
      setProducts(loadedProducts);
      setLoading(false);
    };
    
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка товаров...</p>
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
          <p className="text-lg text-blue-100">
            Всего товаров: {products.length}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
              >
                {category}
              </button>
            ))}
          </div>
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
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    fallbackSrc={FALLBACK_IMAGE}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full shadow-lg">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Описание продукта {product.id}
                  </p>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold">
                    {t('products.detailsView')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              {t('advantages.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('advantages.subtitle')}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold shadow-xl"
            >
              {t('cta.button')}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};