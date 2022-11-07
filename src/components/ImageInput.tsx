import React from "react";
import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";

/* const requestPermission = async () => {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!granted)
    Alert.alert("You need to enable permission to access the Library");
}; */

function ImageInput({ imageUri, onChangeImage }) {
  const handlePress = async () => {
    if (!imageUri) {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.6,
          allowsMultipleSelection: true,
        });
        if (!result.cancelled) {
          if (result.selected) {
            result.selected.forEach((res) => {
              onChangeImage(res);
            });
          } else {
            onChangeImage(result);
          }
        }
      } catch (error) {}
    } else {
      Alert.alert(
        "Remove Image",
        "Are you sure you want to remove this Image?",
        [{ text: "Yes", onPress: () => onChangeImage() }, { text: "No" }]
      );
    }
  };

  return imageUri ? (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <MaterialCommunityIcons
          name="close"
          size={30}
          color={"red"}
          style={{ position: "absolute" }}
        />
      </View>
    </TouchableOpacity>
  ) : (
    <Button
      onPress={handlePress}
      mode="outlined"
      icon="plus"
      color="rgba(0, 0, 0, 0.72)"
    >
      Attach Files
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    overflow: "hidden",
    flexDirection: "row",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ImageInput;
