import { create } from 'zustand'

interface AccessTokenState {
  accessToken: string | null
  setAccessToken: (accessToken: string) => void
  resetAccessToken: () => void
}

export const useAccessTokenStore = create<AccessTokenState>(set => ({
  accessToken: null,
  setAccessToken: (accessToken: string) => set({ accessToken }),
  resetAccessToken: () => set({ accessToken: null }),
}))
