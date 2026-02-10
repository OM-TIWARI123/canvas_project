import { useState, useCallback } from 'react';
import type { 
  CanvasImage, 
  UseCanvasInteractionReturn, 
  ImageTransform 
} from '@/types/canvas.types';
import { 
  findImageAtPosition,
  calculateDragOffset,
  canvasToImageCoordinates
} from '@/utils/canvas-image.utils';

export function useCanvasInteraction(): UseCanvasInteractionReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const handleMouseDown = useCallback((
    event: React.MouseEvent<HTMLCanvasElement>,
    images: CanvasImage[]
  ): string | null => {
    const canvas = event.currentTarget;
    const coords = canvasToImageCoordinates(event.clientX, event.clientY, canvas);
    
    // Find the topmost image at the click position
    const clickedImage = findImageAtPosition(coords.x, coords.y, images);
    
    if (clickedImage) {
      setSelectedImageId(clickedImage.id);
      setIsDragging(true);
      setDragOffset(calculateDragOffset(coords.x, coords.y, clickedImage));
      return clickedImage.id;
    } else {
      // Deselect if clicking on empty area
      setSelectedImageId(null);
      return null;
    }
  }, []);

  const handleMouseMove = useCallback((
    event: React.MouseEvent<HTMLCanvasElement>,
    selectedImageId: string | null
  ): ImageTransform | null => {
    if (!isDragging || !selectedImageId) return null;

    const canvas = event.currentTarget;
    const coords = canvasToImageCoordinates(event.clientX, event.clientY, canvas);
    
    const newX = coords.x - dragOffset.x;
    const newY = coords.y - dragOffset.y;

    return {
      x: newX,
      y: newY,
      width: 0, // Width doesn't change during drag
      height: 0, // Height doesn't change during drag
    };
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const getImageAtPosition = useCallback((
    x: number,
    y: number,
    images: CanvasImage[]
  ): CanvasImage | null => {
    return findImageAtPosition(x, y, images);
  }, []);

  const resetInteraction = useCallback(() => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    setSelectedImageId(null);
  }, []);

  return {
    isDragging,
    dragOffset,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getImageAtPosition,
    resetInteraction,
  };
}