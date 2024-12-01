import { formatDistanceToNow as formatDistanceToNowFns } from 'date-fns'
import { fromZonedTime } from 'date-fns-tz'
import { ko } from 'date-fns/locale'

export function formatDistanceToNow(date: Date): string {
  return formatDistanceToNowFns(fromZonedTime(date, 'Asia/Seoul'), {
    addSuffix: true,
    locale: ko,
  })
}
