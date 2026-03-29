# Todo Notes App ([Русский](../README.md))

SPA note-taking application with todo lists, built with Nuxt 4 (Composition API).

## Stack

- **Nuxt 4** (Vue 3, Composition API, TypeScript)
- **Pinia** — state manager + persistedstate (localStorage)
- **PrimeVue** — UI components (cards, buttons, modals)
- **SCSS** — styling
- **VueUse** — `useRefHistory` for undo/redo

## Features

**Main page:**
- List of all notes with todo preview
- Create, edit, delete notes

**Edit page:**
- Edit title and todos
- Add / remove / edit todos
- Mark todos as completed
- Undo / Redo (Ctrl+Z / Ctrl+Shift+Z)
- Save / cancel editing / delete (with confirmation)

**Other:**
- State persisted in localStorage (data available after page reload)
- Responsive layout (mobile / desktop)

## Run with Docker

```bash
docker compose up
```

The app will be available at [http://localhost:3000](http://localhost:3000).

To stop:

```bash
docker compose down
```

> Uses [Docker Compose V2](https://docs.docker.com/compose/migrate/) (`docker compose` command). The legacy [`docker-compose`](https://github.com/docker/compose/tree/v1) (V1) also works for now, but is not recommended — support may break in the future.

### Standalone run (no repository cloning required)

The `docker-standalone/` directory contains a `Dockerfile` and `docker-compose.yaml` that clone the repository from GitHub and build the project autonomously. Copy these two files to any directory and run `docker compose up` — the source code and dependencies will be fetched automatically.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run generate
```

Output — static files in `.output/public`.

## Architecture notes

The project is intentionally over-engineered for demonstration purposes. Business logic is split into two feature modules (`note-editor`, `notes-list`) following Feature-Sliced Design principles — in a real project of this scale they would be a single module. Static files are served via nginx with SPA routing and caching configuration, although a simple `npx serve` would suffice for a project of this size.
