import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../App'
import AccidentItem from '../components/AccidentItem'
import ApiLoader from '../components/ApiLoader'
import Cctv from '../components/Cctv'
import Divider from '../components/Divider'
import { useGetAccidentsByStreamKey } from '../hooks/useGetAccidentsByStreamKey'
import { useGetCctvItem } from '../hooks/useGetCctvItem'
import { format } from 'date-fns'

interface Props {
  streamKey: string
}

export default function CctvDetailScreen({
  route: {
    params: { streamKey },
  },
}: NativeStackScreenProps<AppStackParamList, 'CctvDetail'>) {
  return (
    <ScrollView style={styles.container}>
      <ApiLoader>
        <CctvDetail streamKey={streamKey} />
        <Divider />
        <Accidents streamKey={streamKey} />
      </ApiLoader>
    </ScrollView>
  )
}

function CctvDetail({ streamKey }: Props) {
  const {
    data: { title, subTitle, thumbnailUrl, status },
  } = useGetCctvItem(streamKey)

  return (
    <View style={styles.wrapper}>
      <Cctv
        title={title}
        subTitle={subTitle}
        thumbnailUrl={thumbnailUrl}
        status={status}
      />
    </View>
  )
}

function Accidents({ streamKey }: Props) {
  const { data } = useGetAccidentsByStreamKey(streamKey)

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>재해 발생 내역</Text>

      <View style={styles.list}>
        {data.map(({ id, startAt, reason, level }) => (
          <AccidentItem
            id={id}
            reason={reason}
            description={format(
              new Date(startAt),
              'yyyy년 MM월 dd일 HH시 mm분',
            )}
            level={level}
            key={id}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  wrapper: { paddingVertical: 32, paddingHorizontal: 16 },
  title: { marginBottom: 30, fontFamily: 'Pretendard-Bold', fontSize: 18 },
  list: { gap: 25 },
})