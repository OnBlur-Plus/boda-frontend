import { ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { CctvType } from '../hooks/useGetCctvItem'

interface Props {
  title: string
  subTitle: string
  status: CctvType['status']
  children: ReactNode
  onPress?: () => void
}

export default function Cctv({
  title,
  subTitle,
  status,
  children,
  onPress,
}: Props) {
  return (
    <View>
      {children}

      <View style={styles.info}>
        <View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            {status === 'LIVE' && <Text style={styles.live}>Live</Text>}
          </View>

          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>

        {onPress && (
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>자세히 보기</Text>
            <Icon name="chevron-right" size={16} color="#858691" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  titleWrapper: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontFamily: 'Pretendard-Bold', fontSize: 20 },
  live: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: '#ffffff',
    backgroundColor: '#E63F41',
  },
  subTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: '#3F4047',
    marginTop: 4,
  },
  button: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  buttonText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#858691',
  },
})
