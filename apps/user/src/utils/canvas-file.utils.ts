import { VALID_IMAGE_TYPES, MAX_IMAGE_SIZE, ERROR_MESSAGES } from './canvas.constants';
import type { FileUploadOptions, ProcessedImage } from '@/types/canvas.types';

/**
 * Validates if a file is an acceptable image type
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!VALID_IMAGE_TYPES.includes(file.type as any)) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_FILE_TYPE };
  }

  // Check file size
  if (file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: ERROR_MESSAGES.FILE_TOO_LARGE };
  }

  return { valid: true };
}

/**
 * Validates multiple files and returns valid ones
 */
export function validateMultipleFiles(files: FileList): { validFiles: File[]; errors: string[] } {
  const validFiles: File[] = [];
  const errors: string[] = [];

  Array.from(files).forEach((file) => {
    const validation = validateImageFile(file);
    if (validation.valid) {
      validFiles.push(file);
    } else {
      errors.push(`${file.name}: ${validation.error}`);
    }
  });

  return { validFiles, errors };
}

/**
 * Generates a unique ID for images
 */
export function generateImageId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Creates a file input element for image selection
 */
export function createImageFileInput(
  onChange: (files: FileList) => void,
  multiple = true
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = VALID_IMAGE_TYPES.join(',');
  input.multiple = multiple;
  input.style.display = 'none';
  
  input.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      onChange(target.files);
    }
  });

  return input;
}

/**
 * Formats file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Extracts file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Checks if file is an image based on extension
 */
export function isImageFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  const validExtensions = ['png', 'jpg', 'jpeg'];
  return validExtensions.includes(ext);
}

/**
 * Creates a download link for canvas content
 */
export function createDownloadLink(canvas: HTMLCanvasElement, filename: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  return link;
}

/**
 * Generates a unique filename for downloads
 */
export function generateDownloadFilename(prefix = 'tshirt-design'): string {
  const timestamp = Date.now();
  return `${prefix}-${timestamp}.png`;
}