import { useState, useCallback, useMemo } from 'react';
import type { 
  CanvasImage, 
  ProcessedImage, 
  UseImageManagementReturn 
} from '@/types/canvas.types';
import { 
  calculateCenteredPosition,
  resizeImageMaintainingAspectRatio 
} from '@/utils/canvas-image.utils';
import { 
  TSHIRT_X, 
  TSHIRT_Y, 
  TSHIRT_WIDTH, 
  TSHIRT_HEIGHT,
  IMAGE_OFFSET_INCREMENT 
} from '@/utils/canvas.constants';

export function useImageManagement(): UseImageManagementReturn {
  const [images, setImages] = useState<CanvasImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const selectedImage = useMemo(
    () => images.find(img => img.id === selectedImageId),
    [images, selectedImageId]
  );

  const addImage = useCallback((processedImage: ProcessedImage) => {
    const offsetX = images.length * IMAGE_OFFSET_INCREMENT;
    const offsetY = images.length * IMAGE_OFFSET_INCREMENT;
    const centerPos = calculateCenteredPosition(processedImage.width, processedImage.height);

    const newImage: CanvasImage = {
      ...processedImage,
      x: centerPos.x + offsetX,
      y: centerPos.y + offsetY,
    };

    setImages(prev => [...prev, newImage]);
    
    // Auto-select the newly added image
    setSelectedImageId(newImage.id);
  }, [images.length]);

  const updateImage = useCallback((id: string, updates: Partial<CanvasImage>) => {
    setImages(prev => prev.map(image => 
      image.id === id ? { ...image, ...updates } : image
    ));
  }, []);

  const deleteImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    
    // Deselect if the deleted image was selected
    if (selectedImageId === id) {
      setSelectedImageId(null);
    }
  }, [selectedImageId]);

  const selectImage = useCallback((id: string) => {
    setSelectedImageId(id);
  }, []);

  const deselectImage = useCallback(() => {
    setSelectedImageId(null);
  }, []);

  const centerImage = useCallback((id: string) => {
    const image = images.find(img => img.id === id);
    if (!image) return;

    const centerPos = calculateCenteredPosition(image.width, image.height);
    updateImage(id, { x: centerPos.x, y: centerPos.y });
  }, [images, updateImage]);

  const resizeImage = useCallback((id: string, newWidth: number, newHeight: number) => {
    const image = images.find(img => img.id === id);
    if (!image) return;

    updateImage(id, { width: newWidth, height: newHeight });
  }, [images, updateImage]);

  const resizeImageMaintainingAspectRatio = useCallback((id: string, newWidth?: number, newHeight?: number) => {
    const image = images.find(img => img.id === id);
    if (!image) return;

    const newDimensions = resizeImageMaintainingAspectRatioUtil(
      image.width,
      image.height,
      image.originalWidth,
      image.originalHeight,
      newWidth,
      newHeight
    );

    updateImage(id, { width: newDimensions.width, height: newDimensions.height });
  }, [images, updateImage]);

  const resetAllImages = useCallback(() => {
    setImages([]);
    setSelectedImageId(null);
  }, []);

  const getImageById = useCallback((id: string) => {
    return images.find(img => img.id === id);
  }, [images]);

  const getImageCount = useCallback(() => {
    return images.length;
  }, [images]);

  const hasImages = useMemo(() => images.length > 0, [images]);

  return {
    images,
    selectedImageId,
    selectedImage,
    addImage,
    updateImage,
    deleteImage,
    selectImage,
    deselectImage,
    centerImage,
    resizeImage,
    resizeImageMaintainingAspectRatio,
    resetAllImages,
    getImageById,
    getImageCount,
    hasImages,
  };
}

// Rename the imported function to avoid naming conflict
const resizeImageMaintainingAspectRatioUtil = resizeImageMaintainingAspectRatio;