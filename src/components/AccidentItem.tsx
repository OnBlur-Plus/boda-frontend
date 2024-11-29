import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { AppStackScreens } from '../App'
import { ACCIDENT_LEVEL } from '../utils/constants'

interface Props {
  id: number
  reason: string
  description: string
  level: (typeof ACCIDENT_LEVEL)[keyof typeof ACCIDENT_LEVEL]
}

export default function AccidentItem({
  id,
  reason,
  description,
  level,
}: Props) {
  const navigation = useNavigation()

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(AppStackScreens.Accident, { id })}
    >
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <View style={styles.itemHead}>
            <Text style={styles.reason}>{reason}</Text>
            {level === ACCIDENT_LEVEL.HIGH && (
              <Text style={styles.level}>심각도 높음</Text>
            )}
          </View>
          <Text style={styles.date}>{description}</Text>
        </View>

        <Icon name="chevron-right" size={24} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: { flex: 1 },
  itemHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  date: { fontFamily: 'Pretendard-Regular', fontSize: 14, color: '#868E96' },
  reason: { fontFamily: 'Pretendard-Bold', fontSize: 16 },
  level: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: '#ffffff',
    backgroundColor: '#FFA94D',
  },
})
