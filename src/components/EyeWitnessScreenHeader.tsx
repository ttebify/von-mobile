import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const EyeWitnessScreenHeader = ({ navigation, options }: any) => {
  return (
    <SafeAreaView>
      <View style={options.headerStyle}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Appbar.Action
            icon="chevron-left"
            onPress={() => navigation.goBack()}
            color="white"
            size={30}
          />
          <Text style={styles.text}>Eye Witness</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EyeWitnessScreenHeader;

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
});
