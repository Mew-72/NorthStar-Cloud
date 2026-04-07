# Northstar Operations Cloud

Northstar is a bold, Bauhaus-inspired fictional SaaS landing page built with React, Vite, and Tailwind CSS.

## Overview

This project includes:
- A high-contrast editorial hero
- Geometric motion accents
- Branded content sections (insights, capabilities, process, social proof)
- Pricing and FAQ sections
- Responsive layout for desktop and mobile

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- PostCSS + Autoprefixer

## Local Development

Prerequisites:
- Node.js 18+ recommended
- npm

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src
	├── AcmeApp.jsx
	├── main.jsx
	└── styles
		└── globals.css
```

## Branding Notes

- Browser title and favicon are set in index.html.
- Main page copy and section content are in src/AcmeApp.jsx.
- Global design tokens/utilities and animations are in src/styles/globals.css.

## GitHub Publish

If this repo is already connected to GitHub, push updates with:

```bash
git add .
git commit -m "Update README and branding"
git push
```

If you are publishing for the first time:

```bash
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
```

## Deployment

Vercel:
1. Import the GitHub repository.
2. Framework preset: Vite.
3. Build command: npm run build.
4. Output directory: dist.
5. Deploy.

Netlify:
1. Connect repository.
2. Build command: npm run build.
3. Publish directory: dist.
4. Deploy site.

## License

MIT
