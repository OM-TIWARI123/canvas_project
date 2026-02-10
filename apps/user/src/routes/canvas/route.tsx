import { createFileRoute } from '@tanstack/react-router';
import { CanvasDesign } from './(routes)/design';

export const Route = createFileRoute('/canvas')({
  component: CanvasDesign,
});
