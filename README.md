# mjcrockett.github.io

A web developer portfolio featuring an interactive animated avatar that delivers audio-synchronized performances. The avatar character speaks random "thoughts" while performing choreographed animations on a canvas, backed by background music and scenery.

## Features

- **Animated Avatar** — A canvas-based character built from sprite parts, posed in real-time at 30 FPS using CreateJS
- **Audio-Synced Animations** — Each "thought" is an audio clip paired with timestamped pose instructions, so the avatar's movements stay in sync with what it's saying
- **Random Performances** — The avatar cycles through different thoughts automatically, picking a new one each time
- **Background Scenes** — Forest, city, desert, and trailer park backdrops with looping background music
- **Avatar Shop** — Customize the avatar's appearance
- **Break Page** — A standby/idle screen

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- CreateJS (canvas animation)
- Bootstrap 5 / React-Bootstrap
- Tailwind CSS 4

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — click the entry overlay to start the experience.

## Deployment

Deployed to GitHub Pages via GitHub Actions. Pushes to `main` trigger an automatic build and deploy.
