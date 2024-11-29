import React, { useEffect } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './components/Header'
import HeaderMenu from './components/HeaderMenu'
import AccidentScreen from './screens/AccidentScreen'
import AuthScreen from './screens/AuthScreen'
import CctvDetailScreen from './screens/CctvDetailScreen'
import CctvListScreen from './screens/CctvListScreen'
import HomeScreen from './screens/HomeScreen'
import NotificationScreen from './screens/NotificationScreen'
import { useAccessTokenStore } from './store/auth'

const SPLASH_SHOW_TIME = 3000
const queryClient = new QueryClient()

export const AppStackScreens = {
  Auth: 'Auth',
  Home: 'Home',
  Notification: 'Notification',
  CctvList: 'CctvList',
  CctvDetail: 'CctvDetail',
  Accident: 'Accident',
} as const

export type AppStackParamList = {
  [AppStackScreens.Auth]: undefined
  [AppStackScreens.Home]: undefined
  [AppStackScreens.Notification]: undefined
  [AppStackScreens.CctvList]: undefined
  [AppStackScreens.CctvDetail]: { streamKey: string }
  [AppStackScreens.Accident]: { id: number }
}

const Stack = createNativeStackNavigator<AppStackParamList>()

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
})

export default function App() {
  const accessToken = useAccessTokenStore(store => store.accessToken)
  const resetAccessToken = useAccessTokenStore(store => store.resetAccessToken)

  useEffect(() => {
    setTimeout(() => BootSplash.hide({ fade: true }), SPLASH_SHOW_TIME)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

          <SafeAreaView style={style.container}>
            <Stack.Navigator screenOptions={{ header: Header }}>
              {!accessToken ? (
                <Stack.Screen
                  name={AppStackScreens.Auth}
                  component={AuthScreen}
                  options={{ headerShown: false }}
                />
              ) : (
                <>
                  <Stack.Screen
                    name={AppStackScreens.Home}
                    component={HomeScreen}
                    options={{
                      headerRight: () => (
                        <HeaderMenu>
                          {({ navigate }) => (
                            <>
                              <HeaderMenu.MenuItem
                                type="alarm"
                                onPress={() =>
                                  navigate(AppStackScreens.Notification)
                                }
                              />
                              <HeaderMenu.MenuItem
                                type="logout"
                                onPress={resetAccessToken}
                              />
                            </>
                          )}
                        </HeaderMenu>
                      ),
                    }}
                  />
                  <Stack.Screen
                    name={AppStackScreens.Notification}
                    component={NotificationScreen}
                    options={{ title: '알림 센터' }}
                  />
                  <Stack.Screen
                    name={AppStackScreens.CctvList}
                    component={CctvListScreen}
                    options={{ title: 'CCTV 목록' }}
                  />
                  <Stack.Screen
                    name={AppStackScreens.CctvDetail}
                    component={CctvDetailScreen}
                    options={{ title: 'CCTV 상세 정보' }}
                  />
                  <Stack.Screen
                    name={AppStackScreens.Accident}
                    component={AccidentScreen}
                    options={{ title: '재해 상세 정보' }}
                  />
                </>
              )}
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
