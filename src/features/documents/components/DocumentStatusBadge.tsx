import { cn } from '@/shared/utils'
import type { DocumentStatus } from '../api/documentApi'

interface StatusBadgeProps {
  status: DocumentStatus
}

const statusConfig: Record<DocumentStatus, { label: string; className: string }> = {
  Pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' },
  Extracting: { label: 'Extracting', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
  Chunking: { label: 'Chunking', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
  Embedding: { label: 'Embedding', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' },
  Ready: { label: 'Ready', className: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' },
  Failed: { label: 'Failed', className: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' },
}

export default function DocumentStatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', config.className)}>
      {config.label}
    </span>
  )
}
