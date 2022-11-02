import { useScrollToTop } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import PostComp from "../components/PostComp";

function PostScreen({ navigation, route }: any) {
  const isFocused = navigation.isFocused();
  const id = route.params?.title ? route.params?.id : 0;

  const args = { navigation, isFocused, id };

  const ref = React.useRef(null);

  useScrollToTop(ref);

  return (
    <ScrollView style={{ flex: 1 }} ref={ref} key={id}>
      <PostComp {...args} />
    </ScrollView>
  );
}

export default PostScreen;
