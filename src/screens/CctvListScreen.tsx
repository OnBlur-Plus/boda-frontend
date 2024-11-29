import { Fragment } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppStackScreens } from '../App'
import ApiLoader from '../components/ApiLoader'
import Cctv from '../components/Cctv'
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

  return (
    <ScrollView style={styles.list}>
      {data.map(
        ({ streamKey, title, subTitle, thumbnailUrl, status }, index, list) => (
          <Fragment key={streamKey}>
            <Cctv
              title={title}
              subTitle={subTitle}
              thumbnailUrl={thumbnailUrl}
              status={status}
              onPress={() =>
                navigation.navigate(AppStackScreens.CctvDetail, { streamKey })
              }
              key={streamKey}
            />
            {index !== list.length - 1 && <View style={styles.border} />}
          </Fragment>
        ),
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  indicator: { marginVertical: 'auto' },
  list: { flex: 1, padding: 16 },
  border: { height: 1, marginVertical: 32, backgroundColor: '#DEE2E6' },
})
