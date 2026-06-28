import { useState, useRef } from 'react'
import { Modal } from '@/shared/components/ui/Modal'
import { Button } from '@/shared/components/ui/Button'

interface UploadModalProps {
  open: boolean
  onClose: () => void
  onUpload: (file: File) => Promise<void>
  isUploading: boolean
}

const ALLOWED_TYPES = ['.pdf', '.md', '.docx', '.txt']
const MAX_SIZE = 50 * 1024 * 1024

export default function UploadModal({ open, onClose, onUpload, isUploading }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = (f: File): string | null => {
    const ext = '.' + f.name.split('.').pop()?.toLowerCase()
    if (!ALLOWED_TYPES.includes(ext)) return 'Unsupported file type. Allowed: PDF, MD, DOCX, TXT'
    if (f.size > MAX_SIZE) return 'File exceeds 50MB limit'
    if (f.size === 0) return 'File is empty'
    return null
  }

  const handleFile = (f: File) => {
    const err = validate(f)
    if (err) { setError(err); setFile(null); return }
    setError('')
    setFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleSubmit = async () => {
    if (!file) return
    try {
      await onUpload(file)
      setFile(null)
      onClose()
    } catch { }
  }

  const handleClose = () => {
    setFile(null)
    setError('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Upload Document">
      <div className="space-y-4">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.md,.docx,.txt"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          />

          {file ? (
            <div className="space-y-1">
              <p className="font-medium text-sm">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-medium">Drop a file here or click to browse</p>
              <p className="text-xs text-gray-500">PDF, MD, DOCX, TXT up to 50MB</p>
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!file || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
