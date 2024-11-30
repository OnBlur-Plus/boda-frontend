import { useCallback, useEffect } from 'react'
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppStackScreens } from '../App'
import ApiLoader from '../components/ApiLoader'
import { Notification, useGetNotifications } from '../hooks/useGetNotifications'
import { useReadNotifications } from '../hooks/useReadNotifications'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <ApiLoader>
        <Notifications />
      </ApiLoader>
    </View>
  )
}

function Notifications() {
  const { mutate } = useReadNotifications()
  const { data, fetchNextPage } = useGetNotifications()
  const navigation = useNavigation()

  useEffect(() => {
    mutate()
  }, [mutate])

  const renderItem = useCallback<ListRenderItem<Notification>>(
    ({
      item: {
        createdAt,
        notificationContent: { title, body, accidentId },
      },
    }) => (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate(AppStackScreens.Accident, {
            id: accidentId,
          })
        }
      >
        <View>
          <View style={styles.itemHead}>
            <Text style={styles.head}>{title}</Text>
            <Text style={styles.head}>
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
                locale: ko,
              })}
            </Text>
          </View>
          <Text style={styles.body}>{body}</Text>
        </View>
      </TouchableWithoutFeedback>
    ),
    [navigation],
  )

  return (
    <FlatList
      data={data.pages.flatMap(page => page.notifications)}
      renderItem={renderItem}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.3}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      style={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  list: { flex: 1, paddingVertical: 32, paddingHorizontal: 16 },
  divider: { height: 40 },
  itemHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head: { fontFamily: 'Pretendard-Regular', fontSize: 14, color: '#858691' },
  body: { marginTop: 8, fontFamily: 'Pretendard-Bold', fontSize: 16 },
})
