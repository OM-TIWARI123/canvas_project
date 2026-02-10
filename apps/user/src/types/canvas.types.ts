// Canvas Image Interface
export interface CanvasImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  name: string;
}

// Canvas Constants
export interface CanvasConstants {
  CANVAS_WIDTH: number;
  CANVAS_HEIGHT: number;
  TSHIRT_WIDTH: number;
  TSHIRT_HEIGHT: number;
  TSHIRT_X: number;
  TSHIRT_Y: number;
  MAX_IMAGE_DIMENSION: number;
  MIN_IMAGE_DIMENSION: number;
  MAX_IMAGE_SIZE: number;
}

// File Upload Types
export interface FileUploadOptions {
  validTypes: string[];
  maxFileSize?: number;
  maxDimension?: number;
}

export interface ProcessedImage {
  id: string;
  src: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  name: string;
}

// Canvas State Types
export interface CanvasState {
  images: CanvasImage[];
  selectedImageId: string | null;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
}

// Drawing Options
export interface DrawingOptions {
  showGrid?: boolean;
  showOutline?: boolean;
  highlightSelected?: boolean;
}

// Image Manipulation Types
export interface ImageTransform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ResizeOptions {
  maintainAspectRatio: boolean;
  maxWidth?: number;
  maxHeight?: number;
}

// Error Types
export interface CanvasError {
  type: 'upload' | 'processing' | 'drawing' | 'download';
  message: string;
  details?: any;
}

// Hook Return Types
export interface UseCanvasDrawingReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  drawCanvas: (images: CanvasImage[], selectedImageId: string | null, showGuidelines?: boolean) => void;
  clearCanvas: () => void;
  downloadCanvas: (filename?: string) => Promise<void>;
  showGuidelines: boolean;
  setShowGuidelines: (show: boolean) => void;
}

export interface UseImageManagementReturn {
  images: CanvasImage[];
  selectedImageId: string | null;
  selectedImage: CanvasImage | undefined;
  addImage: (image: ProcessedImage) => void;
  updateImage: (id: string, updates: Partial<CanvasImage>) => void;
  deleteImage: (id: string) => void;
  selectImage: (id: string) => void;
  deselectImage: () => void;
  centerImage: (id: string) => void;
  resizeImage: (id: string, newWidth: number, newHeight: number) => void;
  resizeImageMaintainingAspectRatio: (id: string, newWidth?: number, newHeight?: number) => void;
  resetAllImages: () => void;
  getImageById: (id: string) => CanvasImage | undefined;
  getImageCount: () => number;
  hasImages: boolean;
}

export interface UseFileUploadReturn {
  processFiles: (files: FileList) => Promise<ProcessedImage[]>;
  processSingleFile: (file: File) => Promise<ProcessedImage | null>;
  validateFile: (file: File) => { valid: boolean; error?: string };
  getFileInfo: (file: File) => {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    extension: string;
  };
  isValidImageType: (fileType: string) => boolean;
}

export interface UseCanvasInteractionReturn {
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  handleMouseDown: (event: React.MouseEvent<HTMLCanvasElement>, images: CanvasImage[]) => string | null;
  handleMouseMove: (event: React.MouseEvent<HTMLCanvasElement>, selectedImageId: string | null) => ImageTransform | null;
  handleMouseUp: () => void;
  getImageAtPosition: (x: number, y: number, images: CanvasImage[]) => CanvasImage | null;
  resetInteraction: () => void;
}