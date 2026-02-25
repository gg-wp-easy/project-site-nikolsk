// src/shared/images.ts

export interface ImageType {
  id: number;
  src: string;
  name: string;
  path: string;
}

// Этот файл будет импортировать манифест, который генерируется автоматически
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import manifest from './image-manifest.json';

export const colbImages: ImageType[] = manifest;

export const getImageById = (id: number): ImageType | undefined => {
  return colbImages.find(img => img.id === id);
};

export const getImageByIndex = (index: number): ImageType | undefined => {
  return colbImages[index % colbImages.length];
};