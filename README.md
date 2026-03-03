# Mezbaul Portfolio

Personal portfolio website for **Mezbaul Haque** (Engineering Operations Professional).

## Live Site
- https://mezbaul.bd

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript

## Features
- Responsive single-page layout
- Sticky navigation with active section highlight
- Smooth scrolling and section reveal animations
- Professional timeline-style experience cards
- Blog preview section with demo cards
- Contact section (email, phone, LinkedIn)
- SEO basics: meta tags, `robots.txt`, `sitemap.xml`
- SVG favicon

## Project Structure
- `index.html` - page content, metadata, and small interaction script
- `styles.css` - full UI styling and responsive rules
- `assets/` - CV PDF, favicon, and blog demo images
- `robots.txt` - crawler rules
- `sitemap.xml` - sitemap entry

## Run Locally
This is a static site. You can open `index.html` directly, or use a local server.

Example:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Deployment
Designed for static hosting (GitHub Pages, Netlify, Vercel static, etc.).

### GitHub Pages (quick setup)
1. Push this repository to GitHub.
2. Go to **Settings -> Pages**.
3. Set source to your default branch root.
4. Save and wait for publish.

## Notes
- Update `sitemap.xml` when adding new pages.
- Update social preview image tags in `index.html` if you replace cover assets.
