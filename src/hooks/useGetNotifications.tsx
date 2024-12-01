import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useAccessTokenStore } from '../store/auth'
import { http } from '../utils/http'

type NotificationContent = {
  id: string
  title: string
  body: string
  createdAt: string // '2024-11-29T19:39:55.847Z'
  updatedAt: string // '2024-11-29T19:39:55.847Z'
}

export type Notification = {
  id: number
  isSent: boolean
  accidentId: number
  readedAt: string | null
  createdAt: string // '2024-11-29T19:40:36.120Z'
  updatedAt: string // '2024-11-29T19:40:36.120Z'
  notificationContent: NotificationContent
}

export type Response = {
  pageNum: number
  pageSize: number
  hasNext: boolean
  notifications: Array<Notification>
}

export function useGetNotifications() {
  const token = useAccessTokenStore(store => store.accessToken)

  return useSuspenseInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam }) =>
      await http.get<Response>(`/notification?pageNum=${pageParam}`, {
        Authorization: `Bearer ${token}`,
      }),
    initialPageParam: 1,
    getNextPageParam: last => (last.hasNext ? last.pageNum + 1 : undefined),
  })
}
