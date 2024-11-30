import { useCallback } from 'react'
import { FlatList, Image, ListRenderItem, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppStackScreens } from '../App'
import ApiLoader from '../components/ApiLoader'
import Cctv from '../components/Cctv'
import { CctvType } from '../hooks/useGetCctvItem'
import { useGetCctvList } from '../hooks/useGetCctvList'

export default function CctvListScreen() {
  return (
    <View style={styles.container}>
      <ApiLoader>
        <List />
      </ApiLoader>
    </View>
  )
}

function List() {
  const { data } = useGetCctvList()
  const navigation = useNavigation()

  const renderItem = useCallback<ListRenderItem<CctvType>>(
    ({ item: { streamKey, title, subTitle, thumbnailUrl, status } }) => (
      <Cctv
        title={title}
        subTitle={subTitle}
        status={status}
        onPress={() =>
          navigation.navigate(AppStackScreens.CctvDetail, { streamKey })
        }
      >
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
      </Cctv>
    ),
    [navigation],
  )

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.border} />}
      keyExtractor={({ streamKey }) => streamKey}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  list: { flex: 1, padding: 16 },
  content: { paddingBottom: 20 },
  border: { height: 1, marginVertical: 32, backgroundColor: '#DEE2E6' },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: '#000000',
  },
})
