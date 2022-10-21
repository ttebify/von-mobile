import React from "react";
import { Provider } from "react-native-paper";
//import NavigationService from './navigation/NavigationService';
import { DefaultTheme } from "react-native-paper";

interface PaperProviderProps {
  children: React.ReactNode;
  theme?: typeof DefaultTheme;
}
export default function PaperProvider({
  children,
  theme = DefaultTheme,
  ...rest
}: PaperProviderProps) {
  return (
    <Provider theme={theme} {...rest}>
      {children}
    </Provider>
  );
}

/* const mapStateToProps = (state) => {
  const appIndex = state.globalState.currentApp || 0;

  const apps = state.globalState.apps || [];

  const theme = apps && apps[appIndex] && apps[appIndex]["theme"];

  
  return { theme, appIndex };
};

export default connect(mapStateToProps)(PaperProvider); */
