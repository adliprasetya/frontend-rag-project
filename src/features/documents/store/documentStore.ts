import { create } from 'zustand'
import { uploadDocument, fetchDocuments, type Document } from '../api/documentApi'

interface DocumentState {
  documents: Document[]
  isLoading: boolean
  isUploading: boolean
  error: string | null
  loadDocuments: (workspaceId: string) => Promise<void>
  uploadDocument: (file: File, workspaceId: string) => Promise<void>
  clearDocuments: () => void
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  isLoading: false,
  isUploading: false,
  error: null,

  loadDocuments: async (workspaceId: string) => {
    if (!workspaceId) return
    set({ isLoading: true, error: null })
    try {
      const documents = await fetchDocuments(workspaceId)
      set({ documents, isLoading: false })
    } catch {
      set({ error: 'Failed to load documents', isLoading: false })
    }
  },

  uploadDocument: async (file: File, workspaceId: string) => {
    set({ isUploading: true, error: null })
    try {
      const doc = await uploadDocument(file, workspaceId)
      set({ documents: [doc, ...get().documents], isUploading: false })
    } catch {
      set({ error: 'Failed to upload document', isUploading: false })
      throw new Error('Upload failed')
    }
  },

  clearDocuments: () => set({ documents: [], error: null }),
}))
