import { useMutation } from '@tanstack/react-query'
import { useAccessTokenStore } from '../store/auth'
import { http } from '../utils/http'

export function useReadNotifications() {
  const token = useAccessTokenStore(store => store.accessToken)

  return useMutation({
    mutationFn: async () =>
      await http.post(
        `/notification/read`,
        {},
        { Authorization: `Bearer ${token}` },
      ),
  })
}
