import { useSuspenseQuery } from '@tanstack/react-query'
import { useAccessTokenStore } from '../store/auth'
import { http } from '../utils/http'
import { AccidentType } from './useGetAccident'

export function useGetAccidentsByDate() {
  const token = useAccessTokenStore(store => store.accessToken)

  return useSuspenseQuery({
    queryKey: ['accident', 'date'],
    queryFn: async () =>
      await http.get<AccidentType[]>(`/accident/date`, {
        Authorization: `Bearer ${token}`,
      }),
  })
}
