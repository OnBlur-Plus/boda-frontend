import { useSuspenseQuery } from '@tanstack/react-query'
import { useAccessTokenStore } from '../store/auth'
import { http } from '../utils/http'

export type CctvType = {
  streamKey: string
  title: string
  subTitle: string
  status: 'LIVE' | 'IDLE'
  thumbnailUrl: string
  createdAt: string // '2024-11-29T17:14:35.620Z'
  updatedAt: string // '2024-11-29T17:14:35.620Z'
}

export function useGetCctvItem(streamKey: string) {
  const token = useAccessTokenStore(store => store.accessToken)

  return useSuspenseQuery({
    queryKey: ['cctv-item', streamKey],
    queryFn: async () =>
      await http.get<CctvType>(`/stream/${streamKey}`, {
        Authorization: `Bearer ${token}`,
      }),
  })
}
