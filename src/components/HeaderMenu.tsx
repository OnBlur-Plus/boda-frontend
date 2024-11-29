import { ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {
  NavigationProp,
  NavigationState,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native'

const MENU_ICON = {
  alarm: <Icon name="bell" size={24} />,
  logout: <Icon name="log-out" size={24} />,
  prev: <Icon name="arrow-left" size={24} />,
} as const

interface HeaderMenuProps {
  children:
    | ReactNode
    | ((
        navigation: Omit<NavigationProp<ParamListBase>, 'getState'> & {
          getState(): NavigationState | undefined
        },
      ) => ReactNode)
}

interface MenuItemProps {
  type: keyof typeof MENU_ICON
  onPress: () => void
}

interface TitleProps {
  children: ReactNode
}

export default function HeaderMenu({ children }: HeaderMenuProps) {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {typeof children === 'function' ? children(navigation) : children}
    </View>
  )
}

HeaderMenu.Title = function Title({ children }: TitleProps) {
  return <Text style={styles.title}>{children}</Text>
}

HeaderMenu.MenuItem = function MenuItem({ type, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>{MENU_ICON[type]}</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  title: { fontFamily: 'Pretendard-Bold', fontSize: 18 },
})
