import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../hooks/useAuth'

export default function AuthScreen() {
  const { pin, error, handleClick, handleReset, handleRemove } = useAuth()

  return (
    <View style={style.container}>
      <View style={style.top}>
        <Text style={style.title}>PIN 번호를 입력해주세요.</Text>
        <View style={style.pin}>
          {Array.from({ length: 4 }).map((_, index) => {
            const isActive = pin.length >= index + 1

            return (
              <View
                style={[style.pinItem, isActive && style.pinItemActive]}
                key={index}
              >
                <Text style={style.pinText}>
                  {pin.length >= index + 1 ? '*' : ''}
                </Text>
              </View>
            )
          })}
        </View>

        {error && <Text style={style.errorText}>{error}</Text>}
      </View>

      <View style={style.bottom}>
        <View style={style.keyRow}>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(1)}
          >
            <Text style={style.keyButtonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(2)}
          >
            <Text style={style.keyButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(3)}
          >
            <Text style={style.keyButtonText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={style.keyRow}>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(4)}
          >
            <Text style={style.keyButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(5)}
          >
            <Text style={style.keyButtonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(6)}
          >
            <Text style={style.keyButtonText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={style.keyRow}>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(7)}
          >
            <Text style={style.keyButtonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(8)}
          >
            <Text style={style.keyButtonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(9)}
          >
            <Text style={style.keyButtonText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={style.keyRow}>
          <TouchableOpacity style={style.keyButton} onPress={handleReset}>
            <Icon name="rotate-ccw" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keyButton}
            onPress={() => handleClick(0)}
          >
            <Text style={style.keyButtonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.keyButton} onPress={handleRemove}>
            <Icon name="arrow-left" size={28} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    backgroundColor: '#ffffff',
  },
  title: { fontFamily: 'Pretendard-Bold', fontSize: 18 },
  top: { flexDirection: 'column', alignItems: 'center' },
  bottom: { display: 'flex', gap: 20 },
  pin: { flexDirection: 'row', gap: 10, marginTop: 40 },
  pinItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#868E96',
  },
  pinItemActive: {
    borderWidth: 2,
    borderColor: '#F76707',
    boxShadow: '0px 4px 6px rgba(253, 126, 20, 0.2)',
  },
  pinText: {
    marginTop: 18,
    fontFamily: 'Pretendard-Regular',
    fontSize: 40,
    lineHeight: 40,
    color: '#F76707',
  },
  errorText: {
    marginTop: 20,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: '#E03131',
  },
  keyRow: { display: 'flex', flexDirection: 'row', gap: 20 },
  keyButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
  keyButtonText: { fontFamily: 'Pretendard-Bold', fontSize: 28 },
})
