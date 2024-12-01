import React, { useRef } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'
import { STREAM_ENDPOINT } from '@env'

interface Props {
  streamKey: string
}

export default function Streaming({ streamKey }: Props) {
  const ref = useRef<WebView>(null)

  return (
    <View style={styles.container}>
      <WebView
        ref={ref}
        source={
          Platform.OS === 'ios'
            ? { html: require(`../assets/streaming/index.html`) }
            : { uri: 'file:///android_asset/index.html' }
        }
        style={styles.webview}
        allowsInlineMediaPlayback
        scrollEnabled={false}
        injectedJavaScript=""
        onLoadEnd={() =>
          ref.current?.postMessage(
            `${STREAM_ENDPOINT}/detect/hls/${streamKey}/index.m3u8`,
          )
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  webview: { flex: 1 },
})
