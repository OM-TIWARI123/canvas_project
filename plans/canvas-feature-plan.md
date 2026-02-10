# 2D Canvas T-Shirt Design Feature Plan

## Overview
Create a separate route in `apps/user/routes` folder for a 2D canvas t-shirt design feature with image upload, manipulation, and download capabilities.

## Project Structure
```
apps/user/src/routes/
├── canvas/
│   ├── route.tsx (main route file)
│   └── (routes)/
│       └── design.tsx (canvas component)
```

## Technical Requirements

### 1. Route Structure
- Create new route folder: `apps/user/src/routes/canvas/`
- Main route file: `route.tsx` using TanStack Router
- Component file: `(routes)/design.tsx`

### 2. Canvas Features
- **Upload Button**: File input for image selection (PNG, JPG, JPEG)
- **T-shirt Canvas**: 2D canvas with t-shirt template outline
- **Image Manipulation**: 
  - Drag and drop positioning
  - Resize with aspect ratio maintenance
  - Center alignment options
- **Dimension Controls**: 
  - Width slider (50-500px)
  - Height slider (50-500px)
  - Real-time preview updates
- **Download Feature**: 
  - High-quality PNG export
  - Print-ready resolution (300 DPI equivalent)
  - Automatic filename generation

### 3. Technical Implementation

#### Canvas Setup
```typescript
// Canvas dimensions for print quality
const CANVAS_WIDTH = 1200; // 4 inches at 300 DPI
const CANVAS_HEIGHT = 1800; // 6 inches at 300 DPI
const TSHIRT_WIDTH = 800;  // T-shirt template width
const TSHIRT_HEIGHT = 1000; // T-shirt template height
```

#### Image Handling
- FileReader API for image upload
- Canvas 2D context for rendering
- Image object for manipulation
- Maintain aspect ratio during resizing

#### Controls Implementation
- Range inputs for width/height adjustment
- Real-time canvas updates
- Min/max constraints for dimensions
- Reset functionality

#### Download Functionality
- Canvas toDataURL() method
- High-quality image export
- Automatic filename: `tshirt-design-{timestamp}.png`

### 4. UI/UX Design
- Left side: Canvas area with t-shirt template
- Right side: Control panel with upload and adjustments
- Clean, intuitive interface
- Responsive design considerations

### 5. Print-Quality Considerations
- High-resolution canvas (300 DPI equivalent)
- Proper color space handling
- Sharp image rendering
- Accurate dimension representation

## Implementation Steps

1. **Create Route Structure**
   - Create canvas folder and route files
   - Set up TanStack Router configuration

2. **Implement Canvas Component**
   - HTML5 Canvas setup
   - T-shirt template drawing
   - Image upload functionality

3. **Add Image Manipulation**
   - Drag and drop positioning
   - Resize functionality
   - Aspect ratio maintenance

4. **Create Control Panel**
   - Upload button
   - Dimension sliders
   - Download button

5. **Implement Download Feature**
   - High-quality export
   - Filename generation
   - Print-ready optimization

6. **Testing and Quality Assurance**
   - Image upload testing
   - Canvas manipulation testing
   - Download quality verification
   - Print-readiness validation

## File Structure Plan

### apps/user/src/routes/canvas/route.tsx
```typescript
import { createFileRoute } from '@tanstack/react-router';
import { CanvasDesign } from './(routes)/design';

export const Route = createFileRoute('/canvas')({
  component: CanvasDesign,
});
```

### apps/user/src/routes/canvas/(routes)/design.tsx
Main component with canvas functionality, image upload, manipulation controls, and download feature.

## Next Steps
After plan approval, implement the feature in Code mode following this structured approach.