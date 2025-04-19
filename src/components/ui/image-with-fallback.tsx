import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { BOOKING_IMAGES } from '@/config/image-config';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const ImageWithFallback = ({ src, alt, className = '', fallbackSrc = BOOKING_IMAGES.HOTELS.MIDSCALE }: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className={`${className} bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}>
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;