import React from 'react';
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import { Label } from '@repo/ui/components/base/label';
import { Card } from '@repo/ui/components/base/card';
import type { CanvasImage } from '@/types/canvas.types';
import { MoveIcon, CenterIcon } from './icons';

interface ImageControlsProps {
  selectedImage: CanvasImage | undefined;
  imageWidth: number;
  imageHeight: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onCenterImage: () => void;
  showGuidelines: boolean;
  onToggleGuidelines: () => void;
}

export function ImageControls({
  selectedImage,
  imageWidth,
  imageHeight,
  onWidthChange,
  onHeightChange,
  onCenterImage,
  showGuidelines,
  onToggleGuidelines,
}: ImageControlsProps) {
  if (!selectedImage) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <MoveIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            Select an image from the gallery to edit its properties
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MoveIcon className="w-5 h-5 mr-2" />
          Image Controls
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Selected: {selectedImage.name}
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="width">Width: {Math.round(imageWidth)}px</Label>
            <Input
              id="width"
              type="range"
              min="50"
              max="500"
              value={imageWidth}
              onChange={(e) => onWidthChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="height">Height: {Math.round(imageHeight)}px</Label>
            <Input
              id="height"
              type="range"
              min="50"
              max="500"
              value={imageHeight}
              onChange={(e) => onHeightChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onCenterImage}
          className="w-full"
          variant="outline"
          size="sm"
        >
          <CenterIcon className="w-4 h-4 mr-2" />
          Center Image
        </Button>
        
        <Button
          onClick={onToggleGuidelines}
          className="w-full"
          variant={showGuidelines ? "default" : "outline"}
          size="sm"
        >
          {showGuidelines ? "Hide" : "Show"} Guidelines
        </Button>
      </div>
    </Card>
  );
}