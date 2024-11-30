import { useEffect, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import { useAccessTokenStore } from '../store/auth'
import { http } from '../utils/http'

type ResponseType =
  | { accessToken: string; isDeviceTokenRequired: boolean }
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

  const handleRequestPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )

      return result === PermissionsAndroid.RESULTS.GRANTED
    } else if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      return enabled
    }

    return false
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
          handleSetToken(result.accessToken)

          if (!result.isDeviceTokenRequired) {
            return
          }

          handleRequestPermission().then(async isGranted => {
            if (isGranted) {
              const deviceToken = await messaging().getToken()

              await http.post<{ deviceToken: string }>(
                `/notification`,
                { deviceToken },
                { Authorization: `Bearer ${result.accessToken}` },
              )
            }
          })
        }
      })
      .catch((err: Error) => {
        console.error(err)
      })
  }, [handleSetToken, pin])

  return { pin, error, handleClick, handleReset, handleRemove }
}
