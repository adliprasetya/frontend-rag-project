import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/shared/utils'

const commands = [
  { label: 'Go to Workspace', path: '/workspace' },
  { label: 'Go to Documents', path: '/documents' },
  { label: 'Go to Chat', path: '/chat' },
  { label: 'Go to Settings', path: '/settings' },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()),
  )

  const execute = useCallback(
    (path: string) => {
      navigate(path)
      setOpen(false)
      setQuery('')
    },
    [navigate],
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!open) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        execute(filtered[selectedIndex].path)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, filtered, selectedIndex, execute])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          placeholder="Search commands..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border-b border-gray-200 dark:border-gray-800 bg-transparent px-4 py-3 text-sm outline-none"
        />
        <ul className="max-h-64 overflow-auto p-2 space-y-1">
          {filtered.map((cmd, i) => (
            <li
              key={cmd.path}
              onClick={() => execute(cmd.path)}
              className={cn(
                'px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors',
                i === selectedIndex
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800',
              )}
            >
              {cmd.label}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-400">No results</li>
          )}
        </ul>
      </div>
    </div>
  )
}
