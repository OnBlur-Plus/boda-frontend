import { useSuspenseQuery } from '@tanstack/react-query'
import { useAccessTokenStore } from '../store/auth'
import { http } from '../utils/http'
import { CctvType } from './useGetCctvItem'

export function useGetCctvList() {
  const token = useAccessTokenStore(store => store.accessToken)

  return useSuspenseQuery({
    queryKey: ['cctv-list'],
    queryFn: async () =>
      await http.get<CctvType[]>('/stream', {
        Authorization: `Bearer ${token}`,
      }),
  })
}
