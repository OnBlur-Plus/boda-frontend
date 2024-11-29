import { createElement } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import HeaderMenu from './HeaderMenu'

export default function Header({
  options: { title, headerRight },
}: NativeStackHeaderProps) {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {navigation.canGoBack() ? (
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
      ) : (
        <Image
          source={require('../assets/image/logo.png')}
          style={styles.logo}
        />
      )}

      {title && (
        <View style={styles.title}>
          <HeaderMenu.Title>{title}</HeaderMenu.Title>
        </View>
      )}

      {headerRight && (
        <View style={styles.right}>{createElement(headerRight)}</View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 96,
    height: 24,
  },
  title: {
    position: 'absolute',
    top: 0,
    left: '25%',
    right: '25%',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
