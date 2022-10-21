import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import PaperProvider from "./src/provider/PaperProvider";
import Provider from "./src/redux/Provider";
import AppNavigation from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            {Platform.OS === "ios" && <StatusBar style="auto" />}
            <AppNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
