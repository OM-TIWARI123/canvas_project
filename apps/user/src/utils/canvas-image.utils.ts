import {
  MAX_IMAGE_DIMENSION,
  MIN_IMAGE_DIMENSION,
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_HEIGHT,
  TSHIRT_X,
  TSHIRT_Y,
  TSHIRT_WIDTH,
  TSHIRT_HEIGHT,
  IMAGE_OFFSET_INCREMENT
} from './canvas.constants';
import type { CanvasImage, ProcessedImage, ImageTransform, ResizeOptions } from '@/types/canvas.types';
import { generateImageId } from './canvas-file.utils';

/**
 * Processes an image file and returns processed image data
 */
export async function processImageFile(file: File, existingImageCount: number = 0): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        try {
          const processedImage = processImageData(
            event.target?.result as string,
            img.width,
            img.height,
            file.name,
            existingImageCount
          );
          resolve(processedImage);
        } catch (error) {
          reject(new Error('Error processing image data'));
        }
      };
      
      img.onerror = () => {
        reject(new Error('Error loading image'));
      };
      
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Processes image data and calculates dimensions
 */
export function processImageData(
  src: string,
  originalWidth: number,
  originalHeight: number,
  name: string,
  existingImageCount: number = 0
): ProcessedImage {
  let width = originalWidth;
  let height = originalHeight;

  // Maintain aspect ratio and fit within max dimension
  if (width > height && width > MAX_IMAGE_DIMENSION) {
    height = (height * MAX_IMAGE_DIMENSION) / width;
    width = MAX_IMAGE_DIMENSION;
  } else if (height > MAX_IMAGE_DIMENSION) {
    width = (width * MAX_IMAGE_DIMENSION) / height;
    height = MAX_IMAGE_DIMENSION;
  }

  // Position new images with offset if there are existing images
  const offsetX = existingImageCount * IMAGE_OFFSET_INCREMENT;
  const offsetY = existingImageCount * IMAGE_OFFSET_INCREMENT;

  return {
    id: generateImageId(),
    src,
    width,
    height,
    originalWidth,
    originalHeight,
    name,
  };
}

/**
 * Calculates image position for centering on t-shirt
 */
export function calculateCenteredPosition(
  imageWidth: number,
  imageHeight: number
): { x: number; y: number } {
  const centerX = TSHIRT_X + (TSHIRT_WIDTH - imageWidth) / 2;
  const centerY = TSHIRT_Y + (TSHIRT_HEIGHT - imageHeight) / 2;
  
  return { x: centerX, y: centerY };
}

/**
 * Resizes image while maintaining aspect ratio
 */
export function resizeImageMaintainingAspectRatio(
  currentWidth: number,
  currentHeight: number,
  originalWidth: number,
  originalHeight: number,
  newWidth?: number,
  newHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  if (newWidth !== undefined) {
    return {
      width: newWidth,
      height: newWidth / aspectRatio,
    };
  }

  if (newHeight !== undefined) {
    return {
      width: newHeight * aspectRatio,
      height: newHeight,
    };
  }

  return { width: currentWidth, height: currentHeight };
}

/**
 * Checks if a point is within an image bounds
 */
export function isPointInImage(
  pointX: number,
  pointY: number,
  image: CanvasImage
): boolean {
  return (
    pointX >= image.x &&
    pointX <= image.x + image.width &&
    pointY >= image.y &&
    pointY <= image.y + image.height
  );
}

/**
 * Finds the topmost image at a given position
 */
export function findImageAtPosition(
  x: number,
  y: number,
  images: CanvasImage[]
): CanvasImage | null {
  // Reverse to get topmost image first
  for (const image of [...images].reverse()) {
    if (isPointInImage(x, y, image)) {
      return image;
    }
  }
  return null;
}

/**
 * Calculates drag offset for moving images
 */
export function calculateDragOffset(
  mouseX: number,
  mouseY: number,
  image: CanvasImage
): { x: number; y: number } {
  return {
    x: mouseX - image.x,
    y: mouseY - image.y,
  };
}

/**
 * Validates image dimensions
 */
export function validateImageDimensions(
  width: number,
  height: number,
  minWidth: number = MIN_IMAGE_DIMENSION,
  minHeight: number = MIN_IMAGE_DIMENSION,
  maxWidth: number = MAX_IMAGE_DIMENSION,
  maxHeight: number = MAX_IMAGE_DIMENSION
): { valid: boolean; error?: string } {
  if (width < minWidth || height < minHeight) {
    return { valid: false, error: 'Image dimensions are too small' };
  }

  if (width > maxWidth || height > maxHeight) {
    return { valid: false, error: 'Image dimensions are too large' };
  }

  return { valid: true };
}

/**
 * Converts canvas coordinates to image coordinates
 */
export function canvasToImageCoordinates(
  canvasX: number,
  canvasY: number,
  canvas: HTMLCanvasElement
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  return {
    x: (canvasX - rect.left) * scaleX,
    y: (canvasY - rect.top) * scaleY,
  };
}