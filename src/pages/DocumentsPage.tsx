import { useEffect, useState } from 'react'
import { useWorkspaceStore } from '@/features/workspace/store/workspaceStore'
import { useDocumentStore } from '@/features/documents/store/documentStore'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import UploadModal from '@/features/documents/components/UploadModal'
import DocumentPreview from '@/features/documents/components/DocumentPreview'
import DocumentStatusBadge from '@/features/documents/components/DocumentStatusBadge'
import type { Document } from '@/features/documents/api/documentApi'

export default function DocumentsPage() {
  const { activeWorkspace } = useWorkspaceStore()
  const { documents, isLoading, isUploading, loadDocuments, uploadDocument } = useDocumentStore()
  const [uploadOpen, setUploadOpen] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null)

  useEffect(() => {
    if (activeWorkspace) {
      loadDocuments(activeWorkspace.id)
    }
  }, [activeWorkspace, loadDocuments])

  if (!activeWorkspace) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Documents</h2>
        <Card className="text-center py-12">
          <p className="text-gray-500">Select a workspace to view documents.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Documents</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {activeWorkspace.name}
          </p>
        </div>
        <Button onClick={() => setUploadOpen(true)}>Upload Document</Button>
      </div>

      {isLoading && <p className="text-gray-500">Loading documents...</p>}

      {!isLoading && documents.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No documents in this workspace.</p>
          <Button onClick={() => setUploadOpen(true)}>Upload your first document</Button>
        </Card>
      )}

      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setPreviewDoc(doc)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <FileIcon contentType={doc.contentType} />
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{doc.name}</p>
                <p className="text-xs text-gray-500">
                  {(doc.fileSize / 1024).toFixed(1)} KB &middot; {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <DocumentStatusBadge status={doc.status} />
          </div>
        ))}
      </div>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={(file) => uploadDocument(file, activeWorkspace.id)}
        isUploading={isUploading}
      />

      <DocumentPreview
        document={previewDoc}
        open={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
      />
    </div>
  )
}

function FileIcon({ contentType }: { contentType: string }) {
  const type = contentType.toLowerCase()
  if (type.includes('pdf')) return <span className="text-red-500 text-lg font-bold">PDF</span>
  if (type.includes('markdown') || type.includes('md')) return <span className="text-blue-500 text-lg font-bold">MD</span>
  if (type.includes('word') || type.includes('docx')) return <span className="text-blue-700 text-lg font-bold">DOC</span>
  return <span className="text-gray-500 text-lg font-bold">TXT</span>
}
