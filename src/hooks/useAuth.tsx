import { useEffect, useState } from 'react'
import { useAccessTokenStore } from '../store/auth'
import { http } from '../utils/http'

type ResponseType =
  | { access_token: string }
  | { message: string; statusCode: number }

export function useAuth() {
  const handleSetToken = useAccessTokenStore(store => store.setAccessToken)
  const [pin, setPin] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleClick = (key: number) => {
    setPin(prev => (prev.length >= 4 ? prev : `${prev}${key}`))
  }

  const handleReset = () => {
    setPin('')
  }

  const handleRemove = () => {
    setPin(prev => prev.slice(0, -1))
  }

  useEffect(() => {
    if (pin.length !== 4) {
      return
    }

    http
      .post<{ pin: string }, ResponseType>('/auth/verify', { pin })
      .then(result => {
        if ('statusCode' in result) {
          setPin('')
          setError(
            result.statusCode === 401
              ? '인증에 실패했습니다.'
              : '알 수 없는 문제가 발생했습니다.',
          )
        } else {
          handleSetToken(result.access_token)
        }
      })
  }, [handleSetToken, pin])

  return { pin, error, handleClick, handleReset, handleRemove }
}
