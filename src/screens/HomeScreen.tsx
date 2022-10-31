import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import theme from "../customTheme";
import WordPress from "../builder/components/WordPressPostsComp";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const HomeScreen = function ({ navigation }: any) {
  const [appIsReady, setAppIsReady] = useState(false);
  const isFocused = navigation.isFocused();

  const app = navigation.state?.params || {};

  const { colors } = theme();

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ backgroundColor: colors.background, flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <WordPress navigation={navigation} app={app} isFocused={isFocused} />
    </View>
  );
};

export default HomeScreen;
