import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import PaperProvider from "./src/provider/PaperProvider";
import Provider from "./src/redux/Provider";
import AppNavigation from "./src/navigation/MainNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./src/redux/store";
import FrameBox from "./src/layouts/FrameBox";
import LoadingComp from "./src/components/LoadingComp";
import Toast from "react-native-toast-message";
import InternetConnectionAlert from "react-native-internet-connection-alert";

export default function App() {
  return (
    <InternetConnectionAlert
      onChange={() => {
        // console.log("Connection State: ", connectionState);
      }}
      type="warn"
    >
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
                <StatusBar backgroundColor="white" style="dark" />
                <AppNavigation />
              </NavigationContainer>
            </SafeAreaProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
      <Toast position="bottom" visibilityTime={5000} />
    </InternetConnectionAlert>
  );
}
