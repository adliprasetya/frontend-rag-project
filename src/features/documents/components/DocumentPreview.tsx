import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Modal } from '@/shared/components/ui/Modal'
import type { Document } from '../api/documentApi'

interface DocumentPreviewProps {
  document: Document | null
  open: boolean
  onClose: () => void
}

export default function DocumentPreview({ document, open, onClose }: DocumentPreviewProps) {
  const [rawContent, setRawContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!document || !open) return
    const ext = document.name.split('.').pop()?.toLowerCase()

    if (ext === 'pdf') {
      setRawContent('')
      setLoading(false)
      return
    }

    if (ext === 'md' || ext === 'txt') {
      setLoading(true)
      fetch(document.name)
        .then((r) => r.text())
        .then(setRawContent)
        .catch(() => setRawContent('*Preview not available*'))
        .finally(() => setLoading(false))
      return
    }

    setRawContent('*Preview not available for this file type*')
    setLoading(false)
  }, [document, open])

  const renderPreview = () => {
    if (!document) return null
    const ext = document.name.split('.').pop()?.toLowerCase()

    if (ext === 'pdf') {
      return (
        <iframe
          src={`/api/documents/${document.id}/download`}
          className="w-full h-[70vh] rounded-lg border border-gray-200 dark:border-gray-700"
          title={document.name}
        />
      )
    }

    if (ext === 'md') {
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{rawContent}</ReactMarkdown>
        </div>
      )
    }

    return (
      <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-h-[70vh] overflow-auto">
        {rawContent}
      </pre>
    )
  }

  return (
    <Modal open={open} onClose={onClose} title={document?.name ?? ''} className="max-w-4xl">
      {loading ? (
        <p className="text-gray-500 text-sm">Loading preview...</p>
      ) : (
        renderPreview()
      )}
    </Modal>
  )
}
