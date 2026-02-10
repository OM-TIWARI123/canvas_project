import React from 'react';
import { Button } from '@repo/ui/components/base/button';
import { Card } from '@repo/ui/components/base/card';
import { DownloadIcon } from './icons';

interface DownloadControlsProps {
  onDownload: () => void;
  disabled?: boolean;
  hasImages?: boolean;
}

export function DownloadControls({
  onDownload,
  disabled = false,
  hasImages = false,
}: DownloadControlsProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="border-t pt-6">
        <Button 
          onClick={onDownload}
          className="w-full"
          variant="default"
          disabled={disabled || !hasImages}
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          Download Design
        </Button>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Instructions:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Upload multiple images using the gallery</li>
          <li>Click an image to select it</li>
          <li>Drag images on canvas to position</li>
          <li>Use sliders to adjust size</li>
          <li>Download your design when ready</li>
        </ul>
      </div>
    </Card>
  );
}