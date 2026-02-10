import { useCallback } from 'react';
import type { UseFileUploadReturn, ProcessedImage } from '@/types/canvas.types';
import { 
  validateImageFile, 
  generateImageId 
} from '@/utils/canvas-file.utils';
import { processImageFile } from '@/utils/canvas-image.utils';
import { VALID_IMAGE_TYPES } from '@/utils/canvas.constants';

export function useFileUpload(): UseFileUploadReturn {
  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    return validateImageFile(file);
  }, []);

  const processFiles = useCallback(async (files: FileList): Promise<ProcessedImage[]> => {
    const processedImages: ProcessedImage[] = [];
    const errors: string[] = [];

    // Convert FileList to Array and process each file
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      try {
        // Validate file
        const validation = validateFile(file);
        if (!validation.valid) {
          errors.push(`${file.name}: ${validation.error}`);
          continue;
        }

        // Process the image file
        const processedImage = await processImageFile(file, processedImages.length);
        processedImages.push(processedImage);
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`${file.name}: ${errorMessage}`);
      }
    }

    // Log errors if any (could be enhanced with toast notifications)
    if (errors.length > 0) {
      console.warn('File upload errors:', errors);
    }

    return processedImages;
  }, [validateFile]);

  const processSingleFile = useCallback(async (file: File): Promise<ProcessedImage | null> => {
    try {
      const validation = validateFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      return await processImageFile(file, 0);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error processing file ${file.name}:`, errorMessage);
      return null;
    }
  }, [validateFile]);

  const getFileInfo = useCallback((file: File) => {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      extension: file.name.split('.').pop()?.toLowerCase() || '',
    };
  }, []);

  const isValidImageType = useCallback((fileType: string): boolean => {
    return VALID_IMAGE_TYPES.includes(fileType as any);
  }, []);

  return {
    processFiles,
    processSingleFile,
    validateFile,
    getFileInfo,
    isValidImageType,
  };
}