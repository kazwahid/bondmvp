# Images Folder for FlyingPosters Component

## 📁 How to Add Images

### **Step 1: Prepare Your Images**
- **Format**: Use `.jpg`, `.png`, or `.webp` formats
- **Size**: Recommended dimensions: 800x600px or 1200x800px
- **Quality**: High-quality images work best for the 3D effects
- **Theme**: Coffee shop related images (interiors, coffee, baristas, etc.)

### **Step 2: Add Images to This Folder**
1. Copy your image files into this `public/images/` folder
2. Rename them to match the pattern used in the code:
   - `coffee-shop-1.jpg`
   - `coffee-shop-2.jpg`
   - `coffee-shop-3.jpg`
   - `coffee-shop-4.jpg`
   - `coffee-shop-5.jpg`

### **Step 3: Update the Code (if needed)**
The main page (`app/page.tsx`) is already configured to use these image paths:
```tsx
<FlyingPosters 
  items={[
    '/images/coffee-shop-1.jpg',
    '/images/coffee-shop-2.jpg',
    '/images/coffee-shop-3.jpg',
    '/images/coffee-shop-4.jpg',
    '/images/coffee-shop-5.jpg'
  ]}
/>
```

### **Step 4: Image Requirements**
- **File Size**: Keep under 2MB for optimal performance
- **Aspect Ratio**: 4:3 or 16:9 works best
- **Content**: Coffee shop interiors, coffee art, baristas, cafe atmosphere
- **Resolution**: Minimum 800x600px, maximum 1920x1080px

### **Step 5: Test Your Images**
1. Start the development server: `npm run dev`
2. Navigate to the main page (`/`)
3. Scroll to the FlyingPosters section
4. Your images should now display with cool 3D effects!

## 🎨 Image Suggestions
- Modern coffee shop interiors
- Coffee art and latte designs
- Baristas in action
- Cozy cafe atmospheres
- Coffee equipment and tools
- Coffee beans and brewing processes

## ⚠️ Troubleshooting
- **Images not showing**: Check file paths and ensure images are in the correct folder
- **Slow loading**: Optimize image sizes and use WebP format when possible
- **Broken images**: Verify file names match exactly (case-sensitive)

## 🔄 Adding More Images
To add more than 5 images, update the `items` array in `app/page.tsx`:
```tsx
items={[
  '/images/coffee-shop-1.jpg',
  '/images/coffee-shop-2.jpg',
  '/images/coffee-shop-3.jpg',
  '/images/coffee-shop-4.jpg',
  '/images/coffee-shop-5.jpg',
  '/images/coffee-shop-6.jpg',  // Add more images here
  '/images/coffee-shop-7.jpg'
]}
```

Happy image adding! 🎉

