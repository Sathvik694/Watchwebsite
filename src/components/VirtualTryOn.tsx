import React, { useState, useRef, useEffect } from 'react';
import { Camera, Ruler, RotateCcw, Download, Share2 } from 'lucide-react';

interface VirtualTryOnProps {
  watchImage: string;
  watchName: string;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ watchImage, watchName }) => {
  const [isActive, setIsActive] = useState(false);
  const [wristSize, setWristSize] = useState(170); // mm
  const [watchPosition, setWatchPosition] = useState({ x: 50, y: 50 });
  const [watchScale, setWatchScale] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const wristSizes = [
    { size: 140, label: 'XS (140mm)', description: 'Very Small Wrist' },
    { size: 160, label: 'S (160mm)', description: 'Small Wrist' },
    { size: 170, label: 'M (170mm)', description: 'Medium Wrist' },
    { size: 180, label: 'L (180mm)', description: 'Large Wrist' },
    { size: 200, label: 'XL (200mm)', description: 'Very Large Wrist' }
  ];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied. Please allow camera permissions to use virtual try-on.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      // Add watch overlay
      const watchImg = new Image();
      watchImg.onload = () => {
        const watchWidth = (canvas.width * watchScale) / 4;
        const watchHeight = (watchWidth * watchImg.height) / watchImg.width;
        const x = (canvas.width * watchPosition.x) / 100 - watchWidth / 2;
        const y = (canvas.height * watchPosition.y) / 100 - watchHeight / 2;
        
        ctx.drawImage(watchImg, x, y, watchWidth, watchHeight);
        
        // Download the image
        const link = document.createElement('a');
        link.download = `${watchName}-virtual-try-on.png`;
        link.href = canvas.toDataURL();
        link.click();
      };
      watchImg.src = watchImage;
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Calculate watch scale based on wrist size
  useEffect(() => {
    const baseScale = wristSize / 170; // 170mm as base
    setWatchScale(Math.max(0.5, Math.min(1.5, baseScale)));
  }, [wristSize]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Camera className="h-6 w-6 text-violet-600" />
        <h3 className="text-xl font-bold text-gray-900">Virtual Try-On</h3>
      </div>

      {!isActive ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Camera className="h-12 w-12 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">See How It Looks On You</h4>
          <p className="text-gray-600 mb-6">Use your camera to virtually try on this watch</p>
          
          {/* Wrist Size Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Ruler className="h-4 w-4 inline mr-2" />
              Select Your Wrist Size
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {wristSizes.map((size) => (
                <button
                  key={size.size}
                  onClick={() => setWristSize(size.size)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    wristSize === size.size
                      ? 'border-violet-600 bg-violet-50 text-violet-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{size.label}</div>
                  <div className="text-xs text-gray-500">{size.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={startCamera}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Start Virtual Try-On
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Camera View */}
          <div className="relative bg-black rounded-xl overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover"
            />
            
            {/* Watch Overlay */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: `${watchPosition.x}%`,
                top: `${watchPosition.y}%`,
                transform: `translate(-50%, -50%) scale(${watchScale})`,
              }}
            >
              <img
                src={watchImage}
                alt={watchName}
                className="w-24 h-24 object-contain opacity-80"
              />
            </div>
            
            {/* Position Controls */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, index) => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                const x = (col + 1) * 25;
                const y = (row + 1) * 25;
                
                return (
                  <button
                    key={index}
                    onClick={() => setWatchPosition({ x, y })}
                    className="hover:bg-white/10 transition-colors"
                  />
                );
              })}
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Size:</label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={watchScale}
                onChange={(e) => setWatchScale(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-600">{Math.round(watchScale * 100)}%</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setWatchPosition({ x: 50, y: 50 })}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Reset Position"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={capturePhoto}
                className="p-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
                title="Capture Photo"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <button
            onClick={stopCamera}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
          >
            Stop Try-On
          </button>
        </div>
      )}
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default VirtualTryOn;