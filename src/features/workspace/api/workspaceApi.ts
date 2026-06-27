import api from '@/shared/api/axios'

export interface Workspace {
  id: string
  name: string
  description: string | null
  ownerId: string
  createdAt: string
}

export interface CreateWorkspacePayload {
  name: string
  description?: string
}

export async function fetchWorkspaces(): Promise<Workspace[]> {
  const { data } = await api.get<Workspace[]>('/workspaces')
  return data
}

export async function createWorkspace(payload: CreateWorkspacePayload): Promise<Workspace> {
  const { data } = await api.post<Workspace>('/workspaces', payload)
  return data
}
