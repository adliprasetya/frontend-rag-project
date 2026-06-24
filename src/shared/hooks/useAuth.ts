import { create } from 'zustand'
import api from '@/shared/api/axios'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  fetchProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,

  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.accessToken)
    set({ token: data.accessToken, isAuthenticated: true })
    await get().fetchProfile()
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },

  fetchProfile: async () => {
    try {
      const { data } = await api.get('/auth/me')
      set({ user: data })
    } catch {
      get().logout()
    }
  },
}))

export function useAuth() {
  return useAuthStore()
}
