import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import PostsContainer from "../containers/PostsContainer";

const SearchScreenHeader = ({
  navigation,
  options,
  enterSearch,
  searchTerm,
}: any) => {
  const [value, setValue] = useState("");
  return (
    <SafeAreaView>
      <View style={[options.headerStyle]}>
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
          <TextInput
            style={styles.textInputContainer}
            placeholder="Search posts"
            mode="flat"
            outlineColor="transparent"
            autoFocus
            value={value}
            defaultValue={searchTerm}
            onChangeText={(text) => setValue(text)}
            error={false}
            placeholderTextColor="rgba(245, 245, 245, 0.68)"
            activeUnderlineColor="rgba(245, 245, 245, 0.68)"
            theme={{ colors: { text: "rgba(245, 245, 245, 1)" } }}
          />
          <Appbar.Action
            icon="magnify"
            onPress={() => {
              if (value.length > 3) {
                enterSearch(value);
              }
            }}
            disabled={value.length < 3}
            color="white"
            size={30}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostsContainer(SearchScreenHeader);

const styles = StyleSheet.create({
  textInputContainer: {
    fontWeight: "600",
    fontSize: 16,
    width: "66%",
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
});
