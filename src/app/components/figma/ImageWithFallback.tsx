import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = 'https://via.placeholder.com/400x300?text=No+Image',
  onLoad, // optional callbacks
  onError, 
  ...props 
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src as string || fallbackSrc);
  const [retryCount, setRetryCount] = useState(0);

  // сбрасываем, когда меняется исходный src
  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setRetryCount(0);
  }, [src, fallbackSrc]);

  // обрабатываем ошибку загрузки – сначала простой кеш‑бастер, затем fallback
  const handleError = async (e?: React.SyntheticEvent<HTMLImageElement>) => {
    // позовём внешний обработчик, если был
    if (onError) {
      try { onError(e as any); } catch {} // не останавливать
    }
    //console.log(`🖼️ Error loading: ${currentSrc}, retry ${retryCount}`);

    // первый раз попробуем альтернативные расширения
    if (retryCount === 0 && src) {
      const basePath = src.replace(/\.\w+$/, '');
      const extensions = ['.jpg', '.JPG', '.jpeg', '.png'];
      for (const ext of extensions) {
        const testUrl = `${basePath}${ext}`;
        try {
          const resp = await fetch(testUrl, { method: 'HEAD' });
          if (resp.ok && resp.headers.get('content-type')?.startsWith('image')) {
            setCurrentSrc(testUrl);
            setRetryCount(prev => prev + 1);
            return;
          }
        } catch {}
      }
    }

    if (retryCount < 3 && src) {
      setRetryCount(prev => prev + 1);
      setCurrentSrc(`${src}?t=${Date.now()}`);
    } else {
      setCurrentSrc(fallbackSrc);
    }
  };



  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (onLoad) {
      try { onLoad(e); } catch {}
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt || 'image'}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};