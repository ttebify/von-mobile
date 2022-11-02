import React, { useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

export default function RadioScreen({ navigation }) {
  const ref = useRef<WebView | null>(null);

  const clearAudioHack = useCallback(() => {
    if (ref.current) {
      const pause = `
                window.location.href = "http://www.radio.garden/listen/voice-of-nigeria/k05gCdlw";
            
                true;
            `;
      ref.current.injectJavaScript(pause);
    } else {
      console.warn("No ref on the webview...");
    }
  }, [ref.current]);

  /**
   * Listener on the navigation.
   *
   */
  useEffect(() => {
    if (navigation) {
      return navigation.addListener("tabPress", clearAudioHack);
    }
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "http://www.radio.garden/listen/voice-of-nigeria/k05gCdlw",
        }}
        automaticallyAdjustContentInsets={false}
        style={{ width: "100%" }}
        ref={(instance) => (ref.current = instance)}
      />
    </View>
  );
}
