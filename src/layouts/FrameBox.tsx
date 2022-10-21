import React from "react";
import { View, ViewStyle } from "react-native";
import styles from "./styles";

interface FrameBoxProps {children: React.ReactNode; style?: ViewStyle}
const FrameBox = ({ children, style = {} }: FrameBoxProps) => {
  var { frameBox } = styles;

  return (
    <View
      style={{
        ...frameBox,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default FrameBox;
