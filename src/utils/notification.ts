import notifee from '@notifee/react-native'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

export const displayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  await notifee.requestPermission()

  const channelAnoucement = await notifee.createChannel({
    id: 'default',
    name: 'noti',
  })

  if (
    !remoteMessage.data ||
    !remoteMessage.notification?.title ||
    !remoteMessage.notification?.body
  )
    return

  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId: channelAnoucement,
      smallIcon: 'ic_notification',
      color: '#FFA94D',
    },
  })
}
