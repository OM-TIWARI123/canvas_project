import { useRef, useCallback, useState, useEffect } from 'react';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  TSHIRT_X,
  TSHIRT_Y,
  TSHIRT_WIDTH,
  TSHIRT_HEIGHT,
  CANVAS_BACKGROUND_COLOR,
  TSHIRT_OUTLINE_COLOR,
  TSHIRT_OUTLINE_WIDTH,
  DESIGN_AREA_COLOR,
  DESIGN_AREA_LINE_WIDTH,
  DESIGN_AREA_X,
  DESIGN_AREA_Y,
  DESIGN_AREA_RECT_WIDTH,
  DESIGN_AREA_RECT_HEIGHT,
  SELECTED_IMAGE_BORDER_COLOR,
  SELECTED_IMAGE_BORDER_WIDTH,
  TSHIRT_IMAGE_PATH
} from '@/utils/canvas.constants';
import type { CanvasImage, UseCanvasDrawingReturn } from '@/types/canvas.types';

export function useCanvasDrawing(): UseCanvasDrawingReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tshirtImage, setTshirtImage] = useState<HTMLImageElement | null>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);

  // Load t-shirt PNG image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setTshirtImage(img);
    };
    img.onerror = () => {
      console.error('Failed to load t-shirt image');
      // Fallback to drawing outline if image fails to load
    };
    img.src = TSHIRT_IMAGE_PATH;
  }, []);

  const drawCanvas = useCallback((images: CanvasImage[], selectedImageId: string | null, showGuidelinesParam = showGuidelines) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background
    ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw t-shirt PNG image or fallback to outline
    if (tshirtImage && tshirtImage.complete) {
      drawTshirtImage(ctx);
    } else {
      drawTshirtOutline(ctx);
    }

    // Draw design area guidelines only if enabled
    if (showGuidelinesParam) {
      drawDesignArea(ctx);
    }

    // Draw all images
    drawImages(ctx, images, selectedImageId);
  }, [tshirtImage, showGuidelines]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, []);

  const downloadCanvas = useCallback(async (filename = 'tshirt-design.png'): Promise<void> => {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error('Canvas not found');
    }

    try {
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      throw new Error('Failed to download canvas');
    }
  }, []);

  const drawTshirtImage = (ctx: CanvasRenderingContext2D) => {
    if (!tshirtImage) return;
    
    // Draw the t-shirt PNG image centered on the canvas
    ctx.drawImage(
      tshirtImage,
      TSHIRT_X,
      TSHIRT_Y,
      TSHIRT_WIDTH,
      TSHIRT_HEIGHT
    );
  };

  const drawTshirtOutline = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = TSHIRT_OUTLINE_COLOR;
    ctx.lineWidth = TSHIRT_OUTLINE_WIDTH;
    ctx.setLineDash([]);
    
    // T-shirt shape
    ctx.beginPath();
    // Neck opening
    ctx.moveTo(TSHIRT_X + TSHIRT_WIDTH * 0.3, TSHIRT_Y);
    ctx.lineTo(TSHIRT_X + TSHIRT_WIDTH * 0.7, TSHIRT_Y);
    
    // Right shoulder
    ctx.lineTo(TSHIRT_X + TSHIRT_WIDTH, TSHIRT_Y + TSHIRT_HEIGHT * 0.15);
    ctx.lineTo(TSHIRT_X + TSHIRT_WIDTH, TSHIRT_Y + TSHIRT_HEIGHT * 0.85);
    
    // Bottom
    ctx.lineTo(TSHIRT_X, TSHIRT_Y + TSHIRT_HEIGHT * 0.85);
    ctx.lineTo(TSHIRT_X, TSHIRT_Y + TSHIRT_HEIGHT * 0.15);
    
    // Left shoulder
    ctx.lineTo(TSHIRT_X + TSHIRT_WIDTH * 0.3, TSHIRT_Y);
    ctx.stroke();
  };

  const drawDesignArea = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = DESIGN_AREA_COLOR;
    ctx.lineWidth = DESIGN_AREA_LINE_WIDTH;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(
      DESIGN_AREA_X, 
      DESIGN_AREA_Y, 
      DESIGN_AREA_RECT_WIDTH, 
      DESIGN_AREA_RECT_HEIGHT
    );
    ctx.setLineDash([]); // Reset dash pattern
  };

  const drawImages = (ctx: CanvasRenderingContext2D, images: CanvasImage[], selectedImageId: string | null) => {
    images.forEach((image) => {
      const img = new Image();
      img.onload = () => {
        // Draw selection border if this image is selected
        if (image.id === selectedImageId) {
          drawSelectionBorder(ctx, image);
        }
        
        // Draw the image
        ctx.drawImage(img, image.x, image.y, image.width, image.height);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${image.id}`);
      };
      img.src = image.src;
    });
  };

  const drawSelectionBorder = (ctx: CanvasRenderingContext2D, image: CanvasImage) => {
    ctx.strokeStyle = SELECTED_IMAGE_BORDER_COLOR;
    ctx.lineWidth = SELECTED_IMAGE_BORDER_WIDTH;
    ctx.setLineDash([]);
    ctx.strokeRect(
      image.x - SELECTED_IMAGE_BORDER_WIDTH / 2,
      image.y - SELECTED_IMAGE_BORDER_WIDTH / 2,
      image.width + SELECTED_IMAGE_BORDER_WIDTH,
      image.height + SELECTED_IMAGE_BORDER_WIDTH
    );
  };

  return {
    canvasRef,
    drawCanvas,
    clearCanvas,
    downloadCanvas,
    showGuidelines,
    setShowGuidelines,
  };
}