import { Outlet, NavLink } from 'react-router-dom'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { CommandPalette } from '@/shared/components/CommandPalette'
import { cn } from '@/shared/utils'

const navItems = [
  { to: '/workspace', label: 'Workspace' },
  { to: '/documents', label: 'Documents' },
  { to: '/chat', label: 'Chat' },
  { to: '/settings', label: 'Settings' },
]

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold">AI Knowledge Base</h1>
          <ThemeToggle />
        </div>
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'block px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="text-xs text-gray-400 mt-4">
          Press <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">Ctrl+K</kbd>
        </p>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <CommandPalette />
    </div>
  )
}
