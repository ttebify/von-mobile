import { View } from "react-native";
import React from "react";
interface SpacerProps {
  size?: number;
}
const Spacer = ({ size = 2 }: SpacerProps) => {
  return <View style={{ marginVertical: size }} />;
};

export default Spacer;
