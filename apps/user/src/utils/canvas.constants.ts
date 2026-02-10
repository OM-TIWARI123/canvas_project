// Canvas Dimensions (Print-ready resolution at 300 DPI)
export const CANVAS_WIDTH = 1200; // 4 inches at 300 DPI
export const CANVAS_HEIGHT = 1800; // 6 inches at 300 DPI

// T-shirt Template Dimensions
export const TSHIRT_WIDTH = 800;
export const TSHIRT_HEIGHT = 1000;
export const TSHIRT_X = (CANVAS_WIDTH - TSHIRT_WIDTH) / 2;
export const TSHIRT_Y = (CANVAS_HEIGHT - TSHIRT_HEIGHT) / 2;

// Image Constraints
export const MAX_IMAGE_DIMENSION = 500;
export const MIN_IMAGE_DIMENSION = 50;
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const DEFAULT_IMAGE_WIDTH = 200;
export const DEFAULT_IMAGE_HEIGHT = 200;

// File Upload Settings
export const VALID_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'] as const;
export const MAX_FILES_PER_UPLOAD = 10;

// Canvas Styling
export const CANVAS_BACKGROUND_COLOR = '#f8f9fa';
export const TSHIRT_OUTLINE_COLOR = '#333';
export const TSHIRT_OUTLINE_WIDTH = 3;
export const DESIGN_AREA_COLOR = '#666';
export const DESIGN_AREA_LINE_WIDTH = 2;
export const SELECTED_IMAGE_BORDER_COLOR = '#3b82f6';
export const SELECTED_IMAGE_BORDER_WIDTH = 3;

// Grid and Guidelines
export const DESIGN_AREA_X = TSHIRT_X + TSHIRT_WIDTH * 0.1;
export const DESIGN_AREA_Y = TSHIRT_Y + TSHIRT_HEIGHT * 0.2;
export const DESIGN_AREA_RECT_WIDTH = TSHIRT_WIDTH * 0.8;
export const DESIGN_AREA_RECT_HEIGHT = TSHIRT_HEIGHT * 0.5;

// Image Offset Settings
export const IMAGE_OFFSET_INCREMENT = 20;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: 'Please upload PNG or JPG image files only.',
  FILE_TOO_LARGE: 'File size must be less than 10MB.',
  IMAGE_PROCESSING_ERROR: 'Error processing image. Please try again.',
  CANVAS_DRAWING_ERROR: 'Error drawing on canvas.',
  DOWNLOAD_ERROR: 'Error downloading image.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  IMAGE_UPLOADED: 'Image uploaded successfully.',
  IMAGE_DELETED: 'Image deleted successfully.',
  DESIGN_DOWNLOADED: 'Design downloaded successfully.',
} as const;

// File Naming
export const DOWNLOAD_FILENAME_PREFIX = 'tshirt-design';
export const DOWNLOAD_FILENAME_TIMESTAMP_FORMAT = 'timestamp';

// T-shirt Template
export const TSHIRT_IMAGE_PATH = '/tshirt.png';
export const TSHIRT_IMAGE_ALT = 'T-shirt Template';