import { useSuspenseQuery } from '@tanstack/react-query'
import { useAccessTokenStore } from '../store/auth'
import { http } from '../utils/http'
import { AccidentType } from './useGetAccident'

export function useGetAccidentsByStreamKey(streamKey: string) {
  const token = useAccessTokenStore(store => store.accessToken)

  return useSuspenseQuery({
    queryKey: ['cctv-item', 'accidents', streamKey],
    queryFn: async () =>
      await http.get<AccidentType[]>(`/accident/stream/${streamKey}`, {
        Authorization: `Bearer ${token}`,
      }),
    refetchInterval: 1000,
  })
}
