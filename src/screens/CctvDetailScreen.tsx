import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../App'
import AccidentItem from '../components/AccidentItem'
import ApiLoader from '../components/ApiLoader'
import Cctv from '../components/Cctv'
import Divider from '../components/Divider'
import Streaming from '../components/Streaming'
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
    data: { title, subTitle, status },
  } = useGetCctvItem(streamKey)

  return (
    <View style={styles.wrapper}>
      <Cctv title={title} subTitle={subTitle} status={status}>
        {status === 'LIVE' ? (
          <Streaming streamKey={streamKey} />
        ) : (
          <View style={styles.video}>
            <Text style={styles.videoText}>라이브 상태가 아닙니다.</Text>
          </View>
        )}
      </Cctv>
    </View>
  )
}

function Accidents({ streamKey }: Props) {
  const { data } = useGetAccidentsByStreamKey(streamKey)

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>재해 발생 내역</Text>

      <View style={styles.list}>
        {data.length > 0 ? (
          data.map(({ id, startAt, reason, level }) => (
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
          ))
        ) : (
          <Text style={styles.empty}>재해 발생 내역이 존재하지 않습니다.</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  wrapper: { paddingVertical: 32, paddingHorizontal: 16 },
  video: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  videoText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: '#ffffff',
  },
  title: { marginBottom: 30, fontFamily: 'Pretendard-Bold', fontSize: 18 },
  list: { gap: 25 },
  empty: {
    paddingVertical: 32,
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
})
