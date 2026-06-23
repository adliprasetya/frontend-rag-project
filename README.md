# AI Knowledge Base - Frontend

## Tech Stack

* React + TypeScript
* Vite
* TailwindCSS
* React Query
* Zustand

---

## Architecture

Feature-based structure:

```text id="fearch001"
src/
├── features/
├── shared/
├── layouts/
├── pages/
```

---

## Core Features

### 1. Authentication UI

* Login / logout
* JWT storage

### 2. Workspace UI

* List workspace
* Switch workspace

### 3. Document UI

* Upload document
* Preview document

### 4. Chat UI (Core)

* Chat interface seperti ChatGPT
* Markdown support
* Streaming response (optional)

---

## API Integration

* Axios instance
* Token interceptor
* Error handler

---

## State Management

* React Query → server state
* Zustand → UI state

---

## Performance

* Lazy loading routes
* Component memoization
* Virtualized chat list

---

## Run Locally

```bash id="ferun001"
npm install
npm run dev
```

---

## Build

```bash id="febuild001"
npm run build
```
