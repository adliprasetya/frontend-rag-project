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

## ⬜ Phase 3: Feature — Authentication
- [ ] Halaman Login
- [ ] JWT storage & auto-inject axios
- [ ] Auth guard (protected routes)
- [ ] Logout

## ⬜ Phase 4: Feature — Workspace
- [ ] List workspace
- [ ] Switch workspace
- [ ] Create/delete workspace

## ⬜ Phase 5: Feature — Documents
- [ ] Upload dokumen (PDF, MD, DOCX)
- [ ] Preview dokumen (PDF viewer, MD renderer)
- [ ] List dokumen per workspace
- [ ] Highlight search result chunks
- [ ] Scroll sync dengan AI response

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
