
import React, { useState, useRef, useEffect } from 'react';
import ArrowUpTrayIcon from './icons/ArrowUpTrayIcon';

interface ImageUploaderProps {
  defaultImageUrl: string;
  altText: string;
  storageKey: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ defaultImageUrl, altText, storageKey }) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl);
  const [isCustomImage, setIsCustomImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const savedImage = localStorage.getItem(storageKey);
      if (savedImage) {
        setImageUrl(savedImage);
        setIsCustomImage(true);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, [storageKey]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setIsCustomImage(true);
        try {
            localStorage.setItem(storageKey, result);
        } catch (error) {
            console.error("Could not save image to localStorage:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent triggering other group hover effects
    setImageUrl(defaultImageUrl);
    setIsCustomImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    try {
        localStorage.removeItem(storageKey);
    } catch (error) {
        console.error("Could not remove image from localStorage:", error);
    }
  };

  return (
    <div className="relative group w-full h-full min-h-[400px]">
      <img 
        src={imageUrl} 
        alt={altText} 
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 rounded-lg flex items-center justify-center">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/png, image/jpeg, image/webp"
        />
        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleUploadClick}
            className="bg-white/90 hover:bg-white text-brand-dark font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            Upload Image
          </button>
          {isCustomImage && (
            <button
              onClick={handleRemoveImage}
              className="mt-2 text-white text-sm bg-black/50 hover:bg-black/70 px-3 py-1 rounded-full transition"
            >
              Reset to default
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
