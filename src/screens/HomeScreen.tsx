import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { AppStackScreens } from '../App'
import AccidentItem from '../components/AccidentItem'
import ApiLoader from '../components/ApiLoader'
import Divider from '../components/Divider'
import { useGetAccidentsByDate } from '../hooks/useGetAccidentsByDate'
import { useGetCctvList } from '../hooks/useGetCctvList'
import { formatDistanceToNow } from '../utils/date'

const IMAGES = {
  good: require('../assets/image/good.png'),
  bad: require('../assets/image/bad.png'),
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <ApiLoader>
        <AccidentSummary />
        <Divider />
        <AccidentStatus />
        <Divider />
        <CctvStatus />
        <Divider />
      </ApiLoader>
    </ScrollView>
  )
}

function AccidentSummary() {
  const { data } = useGetAccidentsByDate()

  return (
    <View style={styles.wrapper}>
      <Image
        source={data.length > 0 ? IMAGES.bad : IMAGES.good}
        style={styles.image}
      />
      <Text style={styles.introText}>
        {data.length > 0
          ? `오늘 총 ${data.length}건의\n재해 알림이 발생했어요.`
          : '오늘은 재해 알림이\n하나도 발생하지 않았어요!'}
      </Text>
    </View>
  )
}

function AccidentStatus() {
  const { data } = useGetAccidentsByDate()
  const navigation = useNavigation()

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>금일 재해 알림</Text>
        {data.length > 3 && (
          <TouchableOpacity
            onPress={() => navigation.navigate(AppStackScreens.Notification)}
            style={styles.viewMore}
          >
            <Text style={styles.label}>더보기</Text>
            <Icon name="chevron-right" size={18} color="#858691" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.list}>
        {data.length > 0 ? (
          data.slice(0, 3).map(({ id, startAt, reason, level }) => {
            return (
              <AccidentItem
                id={id}
                reason={reason}
                description={formatDistanceToNow(new Date(startAt))}
                level={level}
                key={id}
              />
            )
          })
        ) : (
          <Text style={styles.empty}>재해 발생 내역이 존재하지 않습니다.</Text>
        )}
      </View>
    </View>
  )
}

function CctvStatus() {
  const { data } = useGetCctvList()
  const navigation = useNavigation()

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>CCTV 현황</Text>
        {data.length > 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate(AppStackScreens.CctvList)}
            style={styles.viewMore}
          >
            <Text style={styles.label}>전체 보기</Text>
            <Icon name="chevron-right" size={18} color="#858691" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.listHorizontal}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>전체 수량</Text>
          <Text style={styles.boxContent}>{data.length}대</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>라이브</Text>
          <Text style={styles.boxContent}>
            {data.filter(({ status }) => status === 'LIVE').length}대
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>대기</Text>
          <Text style={styles.boxContent}>
            {data.filter(({ status }) => status === 'IDLE').length}대
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  wrapper: { paddingVertical: 32, paddingHorizontal: 16 },
  image: { width: 100, height: 100, marginBottom: 16 },
  introText: { fontFamily: 'Pretendard-Bold', fontSize: 24, lineHeight: 32 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: { fontFamily: 'Pretendard-Bold', fontSize: 18 },
  list: { gap: 25 },
  listHorizontal: { flexDirection: 'row', gap: 8 },
  viewMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  label: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#858691',
  },
  empty: {
    paddingVertical: 32,
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  box: {
    flex: 1,
    gap: 10,
    padding: 16,
    backgroundColor: '#F5F5FD',
  },
  boxTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#858691',
  },
  boxContent: {
    marginLeft: 'auto',
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
})
