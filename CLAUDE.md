# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive animated avatar portfolio website. An animated character plays on a canvas, synchronized to audio clips ("thoughts"), with background music and scenery. Built as a static Next.js site deployed to GitHub Pages.

## Build & Dev Commands

- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` — production build (copies CreateJS from node_modules to public/scripts, then runs `next build`)
- `npm run lint` — runs Next.js linting
- `npm start` — serves the production build locally

No test framework is configured.

## Deployment

Pushes to `main` trigger a GitHub Actions workflow (`.github/workflows/nextjs.yml`) that builds and deploys to GitHub Pages. The build outputs static files to `./out`.

## Architecture

### Routing

The app uses Next.js file-based routing. Pages are defined by `page.tsx` files in the `app/` directory structure (`/`, `/break`, `/avatarShop`). The root page (`app/page.tsx`) renders the avatar experience directly.

### Context Provider Hierarchy

The avatar page nests three React Context providers in this order (outermost first):

1. **Interaction** (`interaction-context.tsx`) — tracks whether the user has clicked the entry overlay (required for browser autoplay policies)
2. **DataProvider** (`avatar/data-context.tsx`) — fetches avatar metadata and animation instructions from external JSON, selects a random avatar, filters its instructions
3. **AudioProvider** (`audio-context.tsx`) — manages an `<audio>` element, exposes playback state (`playing`, `ended`, `canPlayThrough`) and a `changeSource()` method

Custom hooks: `useInteract()`, `useData()`, `useAudio()`

### Animation Pipeline

The avatar rendering flows through these components:

1. **AvatarComponent** (`avatar.tsx`) — loads CreateJS via `next/script`, instantiates the `Avatar` class from `public/scripts/avatar-library.js`, renders a `<canvas>`, handles window resize scaling (55%-75%)
2. **Initializer** (`initializer.tsx`) — orchestrates the loop: waits for avatar + audio + data to be ready, sets the audio source, starts background music, and on audio `ended` picks a new random avatar
3. **Animator** (`animator.tsx`) — runs a 30 FPS `requestAnimationFrame` loop synchronized to `audioRef.currentTime`, looks up the current instruction by binary-searching the sorted instruction intervals, calls `avatar.go(instructionJson)` to pose the avatar

### External Data

Avatar data is fetched at runtime from a separate GitHub Pages repo:
- `https://mjcrockett.github.io/mjcrockett-static-data/data/Avatar.json` — avatar metadata (Id, Title, Audio filename, IsActive)
- `https://mjcrockett.github.io/mjcrockett-static-data/data/AvatarInstruction.json` — timestamped pose instructions per avatar

Both use `fetch` with `cache: 'force-cache'`.

### CreateJS Integration

CreateJS is loaded as an external script (not bundled). The build step copies it from `node_modules/createjs/builds/1.0.0/createjs.min.js` to `public/scripts/`. A custom `avatar-library.js` in `public/scripts/` provides the `Avatar` class that constructs the character from sprite images and exposes `go()` (apply pose) and `transformSet()`/`updateStage()` (scaling). The avatar fires a custom `avataronready` window event when the canvas is initialized.

### Iframe Pages

`/break` and `/avatarShop` are simple pages that embed external sites via full-viewport iframes pointing to other GitHub Pages repos (`mjcrockett.github.io/standby/` and `mjcrockett.github.io/avatar-shop/`).

## Tech Stack

- Next.js 15 (App Router, `reactStrictMode: false`)
- React 19
- TypeScript (strict)
- Tailwind CSS 4 + Bootstrap 5 / React-Bootstrap
- CreateJS for canvas animation
- Path alias: `@/*` maps to project root

## Key Conventions

- All interactive components use `'use client'` directive
- CSS Modules for component-scoped styles (`*.module.css`)
- Avatar model properties use PascalCase (matching the external JSON schema): `Id`, `Title`, `Audio`, `AvatarId`, `Interval`, `InstructionJson`
