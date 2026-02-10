import React, { useEffect } from 'react';
import { Card } from '@repo/ui/components/base/card';
import type { CanvasImage } from '@/types/canvas.types';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  images: CanvasImage[];
  selectedImageId: string | null;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  width?: number;
  height?: number;
}

export function Canvas({
  canvasRef,
  images,
  selectedImageId,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  width = 1200,
  height = 1800,
}: CanvasProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border border-gray-300 rounded-lg shadow-lg max-w-full h-auto cursor-pointer"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        />
      </div>
    </Card>
  );
}