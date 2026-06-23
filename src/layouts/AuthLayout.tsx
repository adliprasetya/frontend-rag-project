import { Outlet } from 'react-router-dom'
import { ThemeToggle } from '@/shared/components/ThemeToggle'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  )
}
