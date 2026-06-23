# AI Knowledge Base - Frontend Skill Map

## 1. Core Stack

* React + TypeScript
* Vite
* TailwindCSS
* React Query
* Zustand
* Axios / Fetch API

---

## 2. Core Frontend Skills

### 2.1 Component Design

* Atomic design (UI components → feature components → pages)
* Reusable component patterns
* Props composition vs inheritance

### 2.2 State Management

* Local state (useState, useReducer)
* Server state (React Query)
* Global state (Zustand)

### 2.3 Routing

* React Router v6+
* Protected routes (Auth guard)
* Nested layout system

### 2.4 Form Handling

* Controlled vs uncontrolled components
* Validation (Zod / Yup)
* Form abstraction layer

---

## 3. Feature-Based Architecture

```text
src/
├── features/
│   ├── auth/
│   ├── workspace/
│   ├── documents/
│   ├── chat/
│   └── settings/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── services/
├── layouts/
└── pages/
```

---

## 4. API Integration Layer

* Centralized API client
* Error handling middleware
* Request/response interceptor
* Token injection (JWT)

---

## 5. Chat UI (Core Feature)

### Requirements:

* Real-time message rendering
* Streaming response (optional)
* Markdown renderer
* Code highlight support

### UI Structure:

* Chat list sidebar
* Message window
* Input box with attachments

---

## 6. Document Viewer

* PDF preview
* Markdown preview
* Highlight search result chunks
* Scroll sync with AI response

---

## 7. Performance Optimization

* Lazy loading routes
* Memoization (React.memo, useMemo)
* Code splitting per feature
* Virtualized list (chat/messages)

---

## 8. UI/UX Focus

* Minimalist dashboard
* Dark mode support
* Responsive layout
* Command palette (Ctrl + K)

---

## 9. Testing

* Unit test: Vitest
* Component test: React Testing Library
* API mocking

---

## 10. Frontend Goal

Membangun UI yang:

* Cepat
* Modular
* Mudah di-scale
* Fokus ke chat-based interaction
