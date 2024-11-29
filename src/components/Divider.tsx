import { StyleSheet, View } from 'react-native'

export default function Divider() {
  return <View style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 16,
    backgroundColor: '#EEEEF9',
  },
})
