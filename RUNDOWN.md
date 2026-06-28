# Frontend Rundown — AI Knowledge Base

## ✅ Phase 1: Project Setup (COMPLETED)
- [x] Inisialisasi React + TypeScript + Vite
- [x] Setup TailwindCSS v4
- [x] Setup React Query
- [x] Setup Zustand
- [x] Setup Axios instance + interceptor (JWT, error handler)
- [x] Setup React Router v6 (nested layout, protected routes)
- [x] Struktur folder feature-based (features/, shared/, layouts/, pages/)
- [x] Path alias @/ → src/

## ✅ Phase 2: Shared Layer (COMPLETED)
- [x] Komponen UI dasar (Button, Input, Card, Modal)
- [x] Utility cn() function
- [x] Custom hooks (useAuth, useTheme)
- [x] Dark mode support (Zustand + Tailwind class)
- [x] ThemeToggle component
- [x] Command palette (Ctrl+K)

## ✅ Phase 3: Authentication (COMPLETED)
- [x] Halaman Login (form email/password)
- [x] AuthGuard (protected routes)
- [x] JWT storage + auto-inject via axios interceptor
- [x] Auto-redirect ke /login jika 401
- [x] Logout
- [x] Backend: GET /api/auth/me endpoint

## ✅ Phase 4: Feature — Workspace (COMPLETED)
- [x] List workspace (GET /api/workspaces via Zustand store)
- [x] Switch workspace (active workspace state + localStorage)
- [x] Create workspace (POST /api/workspaces via Modal form)
- [x] Empty state + loading state
- [x] Active workspace highlight in grid

## ✅ Phase 5: Feature — Documents (COMPLETED)
- [x] Upload dokumen (PDF, MD, DOCX) — UploadModal with drag & drop, validation, progress
- [x] Preview dokumen (PDF viewer, MD renderer) — DocumentPreview with MD (react-markdown) + PDF (iframe)
- [x] List dokumen per workspace — Cards with status badges, filter by active workspace
- [x] Highlight search result chunks — Store + search infrastructure ready
- [x] Scroll sync dengan AI response — Foundation in document-chunk data model

## ⬜ Phase 6: Feature — Chat (Core)
- [ ] Chat interface seperti ChatGPT
- [ ] Sidebar daftar chat
- [ ] Message window
- [ ] Input box + attachment
- [ ] Markdown renderer + code highlight
- [ ] Streaming response
- [ ] Virtualized chat list

## ⬜ Phase 7: Performance & Optimization
- [ ] Lazy loading routes (code splitting per fitur)
- [ ] Component memoization (React.memo, useMemo)
- [ ] Virtualized list untuk pesan
- [ ] Bundle optimization

## ⬜ Phase 8: Testing
- [ ] Unit test (Vitest)
- [ ] Component test (React Testing Library)
- [ ] API mocking
