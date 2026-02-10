import React, { useEffect, useState } from 'react';

// Hooks
import { useCanvasDrawing } from '@/hooks/useCanvasDrawing';
import { useImageManagement } from '@/hooks/useImageManagement';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useCanvasInteraction } from '@/hooks/useCanvasInteraction';

// Components
import { Canvas } from '@/components/canvas/canvas';
import { ImageGallery } from '@/components/canvas/image-gallery';
import { ImageControls } from '@/components/canvas/image-controls';
import { DownloadControls } from '@/components/canvas/download-controls';

// Utils
import { generateDownloadFilename } from '@/utils/canvas-file.utils';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT,
  SUCCESS_MESSAGES 
} from '@/utils/canvas.constants';

// Types
import type { ProcessedImage } from '@/types/canvas.types';

export function CanvasDesign() {
  const fileInputRef = React.useRef<HTMLInputElement>(null!);
  const [imageWidth, setImageWidth] = useState(200);
  const [imageHeight, setImageHeight] = useState(200);

  // Initialize hooks
  const { canvasRef, drawCanvas, downloadCanvas, showGuidelines, setShowGuidelines } = useCanvasDrawing();
  const { 
    images, 
    selectedImageId, 
    selectedImage, 
    addImage, 
    deleteImage, 
    selectImage, 
    updateImage,
    centerImage,
    resizeImage,
    resizeImageMaintainingAspectRatio,
    hasImages 
  } = useImageManagement();
  
  const { processFiles } = useFileUpload();
  const { 
    isDragging, 
    dragOffset, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp 
  } = useCanvasInteraction();

  // Draw canvas whenever images or selection changes (with current guidelines setting)
  useEffect(() => {
    drawCanvas(images, selectedImageId, showGuidelines);
  }, [images, selectedImageId, showGuidelines, drawCanvas]);

  // Update width/height when selected image changes
  useEffect(() => {
    if (selectedImage) {
      setImageWidth(selectedImage.width);
      setImageHeight(selectedImage.height);
    }
  }, [selectedImage]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    try {
      const processedImages = await processFiles(files);
      
      processedImages.forEach((processedImage: ProcessedImage) => {
        addImage(processedImage);
      });

      console.log(SUCCESS_MESSAGES.IMAGE_UPLOADED);
    } catch (error) {
      console.error('Error uploading files:', error);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const clickedImageId = handleMouseDown(event, images);
    if (clickedImageId) {
      selectImage(clickedImageId);
    } else {
      // Deselect if clicking on empty area
      // This would be handled by the hook, but we can add additional logic here
    }
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const transform = handleMouseMove(event, selectedImageId);
    if (transform && selectedImageId) {
      updateImage(selectedImageId, {
        x: transform.x,
        y: transform.y,
      });
    }
  };

  const handleWidthChange = (newWidth: number) => {
    if (!selectedImage) return;
    
    setImageWidth(newWidth);
    resizeImageMaintainingAspectRatio(selectedImage.id, newWidth);
  };

  const handleHeightChange = (newHeight: number) => {
    if (!selectedImage) return;
    
    setImageHeight(newHeight);
    resizeImageMaintainingAspectRatio(selectedImage.id, undefined, newHeight);
  };

  const handleDownloadImage = async () => {
    try {
      // First draw the canvas without guidelines for clean download
      drawCanvas(images, selectedImageId, false);
      
      // Wait a moment for the canvas to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const filename = generateDownloadFilename();
      await downloadCanvas(filename);
      console.log(SUCCESS_MESSAGES.DESIGN_DOWNLOADED);
      
      // Redraw canvas with current guidelines setting for display
      drawCanvas(images, selectedImageId, showGuidelines);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleUploadImages = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">T-Shirt Design Canvas</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Image Gallery */}
          <div className="lg:col-span-1">
            <ImageGallery
              images={images}
              selectedImageId={selectedImageId}
              onSelectImage={selectImage}
              onDeleteImage={deleteImage}
              onUploadImages={handleUploadImages}
              fileInputRef={fileInputRef}
            />
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <Canvas
              canvasRef={canvasRef}
              images={images}
              selectedImageId={selectedImageId}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleMouseUp}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
            />
          </div>

          {/* Right Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <ImageControls
              selectedImage={selectedImage}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              onWidthChange={handleWidthChange}
              onHeightChange={handleHeightChange}
              onCenterImage={() => selectedImage && centerImage(selectedImage.id)}
              showGuidelines={showGuidelines}
              onToggleGuidelines={() => setShowGuidelines(!showGuidelines)}
            />
            
            <DownloadControls
              onDownload={handleDownloadImage}
              hasImages={hasImages}
            />
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileUpload}
          className="hidden"
          multiple
        />
      </div>
    </div>
  );
}