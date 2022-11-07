import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";
import Spacer from "./Spacer";

function ImageInputList({ imageObjects, onRemoveImage, onAddImage }) {
  const scrollView = useRef<ScrollView>(null);

  return (
    <View>
      <ImageInput
        imageUri={null}
        onChangeImage={(imageObj) => onAddImage(imageObj)}
      />
      <Spacer size={10} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current?.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageObjects.map((imageObj: { uri: string }) => (
            <View key={imageObj.uri} style={styles.image}>
              <ImageInput
                imageUri={imageObj.uri}
                onChangeImage={() => onRemoveImage(imageObj.uri)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});
export default ImageInputList;
