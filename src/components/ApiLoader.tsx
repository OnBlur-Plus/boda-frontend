import { ReactNode, Suspense } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

interface Props {
  children: ReactNode
}

export default function ApiLoader({ children }: Props) {
  return (
    <Suspense
      fallback={<ActivityIndicator size="large" style={styles.indicator} />}
    >
      {children}
    </Suspense>
  )
}

const styles = StyleSheet.create({
  indicator: { marginVertical: 'auto' },
})
