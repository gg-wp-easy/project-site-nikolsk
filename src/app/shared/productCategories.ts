export type ProductCategorySlug =
  | "all"
  | "colbs"
  | "diffusers"
  | "dishes"
  | "empties"
  | "lampshades"
  | "other"
  | "vases";

export interface ProductCategory {
  slug: ProductCategorySlug;
  folder?: string;
  labelKey: string;
  fallbackLabel: string;
  previewImage: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "all",
    labelKey: "products.categories.all",
    fallbackLabel: "Все",
    previewImage: "/images/colbs/image_2.JPG",
  },
  {
    slug: "colbs",
    folder: "colbs",
    labelKey: "products.categories.colbs",
    fallbackLabel: "Колбы для кальянов",
    previewImage: "/images/colbs/image_2.JPG",
  },
  {
    slug: "diffusers",
    folder: "diffusers",
    labelKey: "products.categories.diffusers",
    fallbackLabel: "Рассеиватели",
    previewImage: "/images/diffusers/image_90.jpeg",
  },
  {
    slug: "dishes",
    folder: "dishes",
    labelKey: "products.categories.dishes",
    fallbackLabel: "Посуда",
    previewImage: "/images/dishes/image_87.jpeg",
  },
  {
    slug: "empties",
    folder: "empties",
    labelKey: "products.categories.empties",
    fallbackLabel: "Стеклотары",
    previewImage: "/images/empties/image_84.jpeg",
  },
  {
    slug: "lampshades",
    folder: "lampshades",
    labelKey: "products.categories.lampshades",
    fallbackLabel: "Плафоны",
    previewImage: "/images/lampshades/image_80.jpeg",
  },
  {
    slug: "vases",
    folder: "vases",
    labelKey: "products.categories.vases",
    fallbackLabel: "Вазы",
    previewImage: "/images/vases/image_89.jpeg",
  },
  {
    slug: "other",
    folder: "other",
    labelKey: "products.categories.other",
    fallbackLabel: "Прочее",
    previewImage: "/images/other/image_85.jpeg",
  },
];

export const PRODUCT_IMAGE_CATEGORIES = PRODUCT_CATEGORIES.filter(
  (category) => category.slug !== "all" && category.folder,
);

export const getCategoryBySlug = (
  slug: string | null | undefined,
): ProductCategory => {
  const found = PRODUCT_CATEGORIES.find((category) => category.slug === slug);
  return found ?? PRODUCT_CATEGORIES[0];
};
