import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пути к папкам
const imagesDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../src/shared');
const outputFile = path.join(outputDir, 'image-manifest.json');
const appSharedDir = path.join(__dirname, '../src/app/shared');
const productManifestFile = path.join(appSharedDir, 'product-manifest.json');

// СОЗДАЕМ ПАПКИ output, если их нет
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📁 Created directory: ${outputDir}`);
}
if (!fs.existsSync(appSharedDir)) {
  fs.mkdirSync(appSharedDir, { recursive: true });
  console.log(`📁 Created directory: ${appSharedDir}`);
}

// Проверяем, существует ли папка с изображениями
if (!fs.existsSync(imagesDir)) {
  console.warn(`⚠️ Warning: Images directory does not exist: ${imagesDir}`);
  console.log('📁 Creating empty manifest...');
  
  // Создаем пустые манифесты
  fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
  fs.writeFileSync(
    productManifestFile,
    JSON.stringify({ categories: {}, all: [] }, null, 2)
  );
  console.log(`✅ Created empty manifest at: ${outputFile}`);
  console.log(`✅ Created empty product manifest at: ${productManifestFile}`);
  process.exit(0);
}

// Читаем подпапки категорий
const entries = fs.readdirSync(imagesDir, { withFileTypes: true });
const categoryDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

console.log(`📁 Found ${categoryDirs.length} category folders in ${imagesDir}`);

const allImages = [];
const categories = {};

const sortByNumber = (a, b) => {
  const aNum = parseInt(a.match(/\d+/)?.[0] || '0', 10);
  const bNum = parseInt(b.match(/\d+/)?.[0] || '0', 10);
  return aNum - bNum;
};

for (const category of categoryDirs) {
  const categoryPath = path.join(imagesDir, category);
  const files = fs.readdirSync(categoryPath);
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  imageFiles.sort(sortByNumber);

  categories[category] = imageFiles.map((file, index) => ({
    id: index + 1,
    src: `/images/${category}/${file}`,
    name: file.replace(/\.[^/.]+$/, ""),
    path: `/images/${category}/${file}`,
    category,
    filename: file,
  }));

  for (const item of categories[category]) {
    allImages.push(item);
  }
}

// Сохраняем плоский манифест для обратной совместимости
const flatManifest = allImages.map((item, index) => ({
  id: index + 1,
  src: item.src,
  name: item.name,
  path: item.path,
}));

fs.writeFileSync(outputFile, JSON.stringify(flatManifest, null, 2));

// Сохраняем манифест по категориям
fs.writeFileSync(
  productManifestFile,
  JSON.stringify({ categories, all: allImages }, null, 2)
);

console.log(`✅ Generated manifest with ${flatManifest.length} images at: ${outputFile}`);
console.log(`✅ Generated product manifest at: ${productManifestFile}`);
