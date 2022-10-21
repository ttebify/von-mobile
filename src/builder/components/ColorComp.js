import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Colors, Text } from "react-native-paper";
import { default as Box } from "../../layouts/ResponsiveBox";

const ColorComp = () => {

  const keys = Object.keys(Colors);

  const showColor = keys.map((key) => (
    <Box
      key={key}
      style={{
        backgroundColor: Colors[key],
        pWidth: 20,
        pHeight: 10,
        margin: 5,
      }}
    >
      <Text>{key}</Text>
    </Box>
  ));

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: "yellow",
        }}
      >
        {showColor}
      </Box>
    </ScrollView>
  );
};

export default ColorComp;
