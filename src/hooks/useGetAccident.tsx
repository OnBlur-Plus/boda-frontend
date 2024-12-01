import { useSuspenseQuery } from '@tanstack/react-query'
import { useAccessTokenStore } from '../store/auth'
import { ACCIDENT_LEVEL, ACCIDENT_TYPE } from '../utils/constants'
import { http } from '../utils/http'
import { CctvType } from './useGetCctvItem'

export type AccidentType = {
  id: number
  startAt: string // "2024-11-30T02:49:38.000Z"
  endAt: string | null // "2024-11-30T02:49:38.000Z"
  type: (typeof ACCIDENT_TYPE)[keyof typeof ACCIDENT_TYPE]
  level: (typeof ACCIDENT_LEVEL)[keyof typeof ACCIDENT_LEVEL]
  reason: string
  videoUrl: string | null
  createdAt: string // "2024-11-29T17:50:00.553Z"
  updatedAt: string // "2024-11-29T17:50:27.049Z"
}

export function useGetAccident(id: number) {
  const token = useAccessTokenStore(store => store.accessToken)

  return useSuspenseQuery({
    queryKey: ['accident', id],
    queryFn: async () =>
      await http.get<AccidentType & { stream: CctvType }>(
        `/accident/detail/${id}`,
        { Authorization: `Bearer ${token}` },
      ),
  })
}
