import { Fragment } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../App'
import ApiLoader from '../components/ApiLoader'
import Divider from '../components/Divider'
import { useGetAccident } from '../hooks/useGetAccident'
import { ACCIDENT_LEVEL_LABEL, METADATA_BY_TYPE } from '../utils/constants'
import { format } from 'date-fns'

interface Props {
  id: number
}

export default function AccidentScreen({
  route: {
    params: { id },
  },
}: NativeStackScreenProps<AppStackParamList, 'Accident'>) {
  return (
    <ScrollView style={styles.container}>
      <ApiLoader>
        <Accident id={id} />
      </ApiLoader>
    </ScrollView>
  )
}

function Accident({ id }: Props) {
  const {
    data: { startAt, reason, level, type, videoUrl, stream },
  } = useGetAccident(id)

  return (
    <Fragment>
      <View style={styles.wrapper}>
        <Image source={METADATA_BY_TYPE[type].image} style={styles.image} />
        <Text style={styles.reason}>{METADATA_BY_TYPE[type].name}</Text>
        <Text style={styles.date}>
          {format(new Date(startAt), 'yyyy년 MM월 dd일 HH시 mm분 발생')}
        </Text>
      </View>

      <Divider />

      <View style={styles.wrapper}>
        <Text style={styles.title}>상세 정보</Text>

        <View style={styles.list}>
          <View style={styles.item}>
            <Text style={styles.label}>탐지한 CCTV</Text>
            <Text style={styles.value}>{stream.title}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>발생 위치</Text>
            <Text style={styles.value}>{stream.subTitle}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>재해 종류</Text>
            <Text style={styles.value}>{reason}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>심각도</Text>
            <Text style={styles.value}>{ACCIDENT_LEVEL_LABEL[level]}</Text>
          </View>
        </View>
      </View>

      {videoUrl && (
        <>
          <Divider />

          <View style={styles.wrapper}>
            <Text style={styles.title}>발생 시점 영상</Text>

            <Video
              source={{ uri: videoUrl }}
              style={styles.video}
              resizeMode="contain"
              controls
              paused
            />
          </View>
        </>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  wrapper: { paddingVertical: 32, paddingHorizontal: 16 },
  title: { fontFamily: 'Pretendard-Bold', fontSize: 18, marginBottom: 30 },
  image: { width: 120, height: 120 },
  reason: { fontFamily: 'Pretendard-Bold', fontSize: 24, marginTop: 16 },
  date: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: '#3F4047',
    marginTop: 8,
  },
  list: { display: 'flex', gap: 25 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: { fontFamily: 'Pretendard-Regular', fontSize: 16, color: '#858691' },
  value: { fontFamily: 'Pretendard-Bold', fontSize: 16 },
  video: {
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    borderRadius: 8,
  },
})
