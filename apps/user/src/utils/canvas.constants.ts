// Canvas Dimensions (Increased for better visibility - Print-ready resolution at 300 DPI)
export const CANVAS_WIDTH = 1400; // Increased from 1200 for better visibility
export const CANVAS_HEIGHT = 2100; // Increased from 1800 for better visibility

// T-shirt Template Dimensions - Significantly increased for better visibility like Tapstitch
export const TSHIRT_WIDTH = 1100; // Significantly increased from 900
export const TSHIRT_HEIGHT = 1500; // Significantly increased from 1200
export const TSHIRT_X = (CANVAS_WIDTH - TSHIRT_WIDTH) / 2;
export const TSHIRT_Y = (CANVAS_HEIGHT - TSHIRT_HEIGHT) / 2;

// Image Constraints - Adjusted for larger canvas
export const MAX_IMAGE_DIMENSION = 600; // Increased from 500 for larger designs
export const MIN_IMAGE_DIMENSION = 50;
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
// Default Image Settings - Adjusted for larger t-shirt
export const DEFAULT_IMAGE_WIDTH = 250; // Increased from 200 for better visibility
export const DEFAULT_IMAGE_HEIGHT = 250; // Increased from 200 for better visibility

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

// Grid and Guidelines - Adjusted for better center fit
export const DESIGN_AREA_X = TSHIRT_X + TSHIRT_WIDTH * 0.15; // Reduced from 0.1
export const DESIGN_AREA_Y = TSHIRT_Y + TSHIRT_HEIGHT * 0.25; // Reduced from 0.2
export const DESIGN_AREA_RECT_WIDTH = TSHIRT_WIDTH * 0.7; // Reduced from 0.8
export const DESIGN_AREA_RECT_HEIGHT = TSHIRT_HEIGHT * 0.4; // Reduced from 0.5

// Image Offset Settings
export const IMAGE_OFFSET_INCREMENT = 30; // Increased from 20 for better spacing on larger canvas

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