import { create } from 'zustand'
import { fetchWorkspaces, createWorkspace, type Workspace, type CreateWorkspacePayload } from '../api/workspaceApi'

interface WorkspaceState {
  workspaces: Workspace[]
  activeWorkspace: Workspace | null
  isLoading: boolean
  error: string | null
  loadWorkspaces: () => Promise<void>
  createWorkspace: (payload: CreateWorkspacePayload) => Promise<void>
  setActiveWorkspace: (workspace: Workspace) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  activeWorkspace: null,
  isLoading: false,
  error: null,

  loadWorkspaces: async () => {
    set({ isLoading: true, error: null })
    try {
      const workspaces = await fetchWorkspaces()
      const activeId = localStorage.getItem('activeWorkspaceId')
      const active = workspaces.find((w) => w.id === activeId) || workspaces[0] || null
      set({ workspaces, activeWorkspace: active, isLoading: false })
    } catch {
      set({ error: 'Failed to load workspaces', isLoading: false })
    }
  },

  createWorkspace: async (payload: CreateWorkspacePayload) => {
    set({ error: null })
    try {
      const workspace = await createWorkspace(payload)
      const workspaces = [...get().workspaces, workspace]
      set({ workspaces, activeWorkspace: workspace })
      localStorage.setItem('activeWorkspaceId', workspace.id)
    } catch {
      set({ error: 'Failed to create workspace' })
    }
  },

  setActiveWorkspace: (workspace: Workspace) => {
    localStorage.setItem('activeWorkspaceId', workspace.id)
    set({ activeWorkspace: workspace })
  },
}))
