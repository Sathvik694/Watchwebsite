import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, RotateCcw, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  has360View?: boolean;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName, has360View = false }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handle360Drag = (e: React.MouseEvent) => {
    if (!is360Mode) return;
    
    const startX = e.clientX;
    const startRotation = rotation;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newRotation = (startRotation + deltaX) % 360;
      setRotation(newRotation);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Main Image Display */}
        <div 
          ref={containerRef}
          className="relative aspect-square overflow-hidden cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseDown={is360Mode ? handle360Drag : undefined}
        >
          <img
            ref={imageRef}
            src={images[currentImage]}
            alt={`${productName} - View ${currentImage + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            } ${is360Mode ? 'cursor-grab active:cursor-grabbing' : ''}`}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transform: is360Mode 
                ? `rotate(${rotation}deg) ${isZoomed ? `scale(1.5)` : 'scale(1)'}`
                : isZoomed ? 'scale(1.5)' : 'scale(1)'
            }}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          
          {/* Control Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFullscreen(true)}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            {has360View && (
              <button
                onClick={() => setIs360Mode(!is360Mode)}
                className={`p-2 rounded-full transition-colors ${
                  is360Mode 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-black/50 hover:bg-black/70 text-white'
                }`}
                title="360° View"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Zoom Indicator */}
          {isZoomed && (
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              <ZoomIn className="h-4 w-4 inline mr-1" />
              Zoomed
            </div>
          )}
          
          {/* 360° Mode Indicator */}
          {is360Mode && (
            <div className="absolute bottom-4 left-4 bg-violet-600 text-white px-3 py-1 rounded-full text-sm">
              360° Mode - Drag to rotate
            </div>
          )}
        </div>
        
        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="p-4 bg-gray-50">
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImage === index 
                      ? 'border-violet-600' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={images[currentImage]}
            alt={`${productName} - Fullscreen`}
            className="max-w-full max-h-full object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductGallery;