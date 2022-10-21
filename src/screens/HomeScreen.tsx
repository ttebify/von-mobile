import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import theme from "../customTheme";
import ScreenRotate from "../layouts/ScreenRotate";
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
        await new Promise((resolve) => setTimeout(resolve, 5000));
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
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      onLayout={onLayoutRootView}
    >
      <View style={{ backgroundColor: colors.background }}>
        <WordPress navigation={navigation} app={app} isFocused={isFocused} />
        <ScreenRotate />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
