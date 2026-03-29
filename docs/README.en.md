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
docker-compose up
```

The app will be available at [http://localhost:3000](http://localhost:3000).

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
