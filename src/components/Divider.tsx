import { StyleProp, View, ViewProps } from "react-native";
import React from "react";
interface DividerProps {
  size?: number;
  style?: StyleProp<ViewProps>;
  height?: number;
}
const Divider = ({ size = 20, style, height = 1 }: DividerProps) => {
  return (
    <View
      style={[
        {
          marginVertical: size,
          backgroundColor: "rgba(4, 80, 139, 0.19)",
          height,
        },
        style,
      ]}
    />
  );
};

export default Divider;
