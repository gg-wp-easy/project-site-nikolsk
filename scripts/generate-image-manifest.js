import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пути к папкам
const imagesDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../src/shared');
const outputFile = path.join(outputDir, 'image-manifest.json');

// СОЗДАЕМ ПАПКУ shared, если её нет
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📁 Created directory: ${outputDir}`);
}

// Проверяем, существует ли папка с изображениями
if (!fs.existsSync(imagesDir)) {
  console.warn(`⚠️ Warning: Images directory does not exist: ${imagesDir}`);
  console.log('📁 Creating empty manifest...');
  
  // Создаем пустой манифест
  fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
  console.log(`✅ Created empty manifest at: ${outputFile}`);
  process.exit(0);
}

// Читаем все файлы в папке
const files = fs.readdirSync(imagesDir);
console.log(`📁 Found ${files.length} files in ${imagesDir}`);

// Фильтруем только изображения
const imageFiles = files.filter(file => 
  /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
);

console.log(`🖼️ Found ${imageFiles.length} image files`);

// Сортируем файлы по имени (числовая сортировка)
imageFiles.sort((a, b) => {
  const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
  const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
  return aNum - bNum;
});

// Создаем манифест
const manifest = imageFiles.map((file, index) => ({
  id: index + 1,
  src: `/images/${file}`,
  name: file.replace(/\.[^/.]+$/, ""),
  path: `/images/${file}`
}));

// Сохраняем в JSON
fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));

console.log(`✅ Generated manifest with ${manifest.length} images at: ${outputFile}`);
if (manifest.length > 0) {
  console.log('📋 First 3 images:', manifest.slice(0, 3));
}