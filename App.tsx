import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import PaperProvider from "./src/provider/PaperProvider";
import Provider from "./src/redux/Provider";
import AppNavigation from "./src/navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./src/redux/store";
import FrameBox from "./src/layouts/FrameBox";
import LoadingComp from "./src/components/LoadingComp";

export default function App() {
  return (
    <Provider>
      <PersistGate
        loading={
          <FrameBox>
            <LoadingComp />
          </FrameBox>
        }
        persistor={persistor}
      >
        <PaperProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              {Platform.OS === "ios" && <StatusBar style="auto" />}
              <AppNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
