import React from 'react';
import { Button } from '@repo/ui/components/base/button';
import { Card } from '@repo/ui/components/base/card';
import type { CanvasImage } from '@/types/canvas.types';
import { ImageIcon, TrashIcon } from './icons';

interface ImageGalleryProps {
  images: CanvasImage[];
  selectedImageId: string | null;
  onSelectImage: (id: string) => void;
  onDeleteImage: (id: string) => void;
  onUploadImages: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function ImageGallery({
  images,
  selectedImageId,
  onSelectImage,
  onDeleteImage,
  onUploadImages,
  fileInputRef,
}: ImageGalleryProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ImageIcon className="w-5 h-5 mr-2" />
        Image Gallery
      </h3>
      
      {/* Upload Button */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          multiple
        />
        <Button 
          onClick={onUploadImages}
          className="w-full"
          variant="default"
          size="sm"
        >
          Upload Images
        </Button>
      </div>

      {/* Image List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {images.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No images uploaded yet
          </p>
        ) : (
          images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              isSelected={selectedImageId === image.id}
              onSelect={() => onSelectImage(image.id)}
              onDelete={() => onDeleteImage(image.id)}
            />
          ))
        )}
      </div>
    </Card>
  );
}

interface ImageGalleryItemProps {
  image: CanvasImage;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

function ImageGalleryItem({
  image,
  isSelected,
  onSelect,
  onDelete,
}: ImageGalleryItemProps) {
  return (
    <div
      className={`relative p-2 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-3">
        <img
          src={image.src}
          alt={image.name}
          className="w-12 h-12 object-cover rounded"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {image.name}
          </p>
          <p className="text-xs text-gray-500">
            {Math.round(image.width)}×{Math.round(image.height)}
          </p>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8 text-red-500 hover:text-red-700"
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}