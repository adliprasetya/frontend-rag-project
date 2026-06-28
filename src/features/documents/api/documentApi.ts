import api from '@/shared/api/axios'

export type DocumentStatus = 'Pending' | 'Extracting' | 'Chunking' | 'Embedding' | 'Ready' | 'Failed'

export interface Document {
  id: string
  name: string
  contentType: string
  fileSize: number
  workspaceId: string
  status: DocumentStatus
  createdAt: string
}

export interface DocumentChunk {
  id: string
  documentId: string
  index: number
  content: string
  tokenCount: number
}

export interface DocumentDetail extends Document {
  chunks: DocumentChunk[]
}

export async function uploadDocument(file: File, workspaceId: string): Promise<Document> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('workspaceId', workspaceId)
  const { data } = await api.post<Document>('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function fetchDocuments(workspaceId: string): Promise<Document[]> {
  const { data } = await api.get<Document[]>('/documents', { params: { workspaceId } })
  return data
}

export async function fetchDocument(id: string): Promise<Document> {
  const { data } = await api.get<Document>(`/documents/${id}`)
  return data
}

export function getDocumentUrl(id: string): string {
  return `${api.defaults.baseURL}/documents/${id}/download`
}
