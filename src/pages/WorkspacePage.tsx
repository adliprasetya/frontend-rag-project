import { useEffect, useState } from 'react'
import { useWorkspaceStore } from '@/features/workspace/store/workspaceStore'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { Card } from '@/shared/components/ui/Card'
import { Modal } from '@/shared/components/ui/Modal'

export default function WorkspacePage() {
  const { workspaces, activeWorkspace, isLoading, loadWorkspaces, createWorkspace, setActiveWorkspace } =
    useWorkspaceStore()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    loadWorkspaces()
  }, [loadWorkspaces])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setCreating(true)
    await createWorkspace({ name: name.trim(), description: description.trim() || undefined })
    setCreating(false)
    setOpen(false)
    setName('')
    setDescription('')
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Workspaces</h2>
        <Button onClick={() => setOpen(true)}>New Workspace</Button>
      </div>

      {isLoading && <p className="text-gray-500">Loading workspaces...</p>}

      {!isLoading && workspaces.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No workspaces yet.</p>
          <Button onClick={() => setOpen(true)}>Create your first workspace</Button>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((w) => (
          <Card
            key={w.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeWorkspace?.id === w.id
                ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                : ''
            }`}
            onClick={() => setActiveWorkspace(w)}
          >
            <h3 className="font-semibold text-lg mb-1">{w.name}</h3>
            {w.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {w.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Created {new Date(w.createdAt).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Workspace">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Name"
            placeholder="My Workspace"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Description (optional)"
            placeholder="What is this workspace about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={creating || !name.trim()}>
              {creating ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
