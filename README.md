# E-commerce Product Card - Design Studio

A stunning e-commerce interface built with React, Framer Motion, and Tailwind CSS featuring glassmorphic design, smooth entrance animations, dark mode support, and premium spacing.

## Features

✨ **Glassmorphic Design** - Modern frosted glass effect with backdrop blur
🎬 **Smooth Animations** - Entrance animations, hover effects, and interactive transitions
🌙 **Dark Mode** - Full dark mode support with system theme detection
📱 **Responsive** - Mobile-first design that works beautifully on all devices
⚡ **Performance Optimized** - Lazy animations and efficient rendering
♿ **Accessible** - Semantic HTML and keyboard navigation support
🎨 **Premium Feel** - Generous spacing, careful typography, and visual hierarchy

## Components

### SiteLoader
- Beautiful entrance animation with circular loader
- Animated orbiting dots and gradient effects
- Progress indicator bar
- Auto-dismiss after 3.5 seconds

### ProductCard
- Glassmorphic card container
- Image zoom on hover
- Wishlist button with heart animation
- Stock indicator with pulse animation
- Discount badge
- Rating and reviews display
- Add to cart and view buttons
- Shine effect on hover
- Staggered entrance animations

### App
- Navigation header with dark mode toggle
- Hero section with gradient text
- Product grid (responsive 1-3 columns)
- CTA section with subscription prompt
- Footer with company info
- Smooth page transitions

## Tech Stack

- **React 18** - UI library
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
xyz/
├── src/
│   ├── components/
│   │   ├── SiteLoader.jsx      # Entrance loader animation
│   │   └── ProductCard.jsx     # Product card component
│   ├── styles/
│   │   └── globals.css         # Global styles & glassmorphism
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # This file
```

## Customization

### Colors & Gradients
Edit the gradient colors in:
- `tailwind.config.js` - Design tokens
- `src/styles/globals.css` - Global styles

### Animation Speed
Adjust animation durations in:
- `src/components/SiteLoader.jsx` - Loader animations
- `src/components/ProductCard.jsx` - Card animations
- `src/App.jsx` - Page transitions

### Products Data
Modify `FEATURED_PRODUCTS` array in `src/App.jsx` to update product information.

### Spacing & Layout
Tailwind classes control spacing. Key customizations:
- `p-6` - Card padding
- `gap-6` - Grid spacing
- `rounded-2xl` - Border radius

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with -webkit- prefixes)
- Mobile browsers: Full support with touch optimizations

## Performance Tips

- Images use Unsplash CDN for fast loading
- Animations use GPU acceleration (transform & opacity)
- Backdrop filters have fallbacks for older browsers
- Lazy loading ready for implementation

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast dark mode
- Focus visible states on buttons

## License

MIT License - Feel free to use this design studio template for your projects!

---

**Built with GitHub Copilot Design Studio** - Creating premium UI experiences.
