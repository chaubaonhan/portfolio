# Bao Nhan Chau — AI Engineer & NLP Researcher 

An immersive portfolio built around the path from NLP research to production AI systems.

[https://chaubaonhan.github.io](https://chaubaonhan.github.io/portfolio/)

## Experience

- Scroll-driven 3D room, avatar, holographic NLP lab, and contact scene
- First-author IEEE Access publication presented as a complete case study
- Enterprise AI assistant and knowledge-retrieval project stories
- A privacy-safe certification archive with verified IBM, Microsoft, and British Council credentials
- GSAP/Lenis motion, custom shaders, spatial sound, and responsive interactions
- Hash-based project routing that remains refresh-safe on GitHub Pages

## Stack

- Vue 3 + TypeScript + Vite
- Three.js + GLSL
- GSAP + Lenis
- Howler

## Run locally

Images and videos are kept in a private repository and are not part of this repo. With access, clone them into `src/media/` first:

```bash
git clone git@github.com:chaubaonhan/portfolio-media.git src/media
npm install
npm run dev
```

Production validation:

```bash
npm run typecheck
npm run build
```

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy.yml`, which checks out the private media repository with a read-only deploy key (`MEDIA_DEPLOY_KEY` secret) before building.

## Design attribution

The original interactive experience, 3D assets, animation system, and design were created by [David Heckhoff](https://david-hckh.com/) in [portfolio-2025](https://github.com/davidhckh/portfolio-2025). This adaptation preserves visible attribution and reworks the content and visual narrative for AI engineering and NLP research. See [license.md](./license.md).
