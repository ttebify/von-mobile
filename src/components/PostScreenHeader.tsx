import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { compose } from "redux";
import { WordPressClass } from "../builder/containers/WordPressPostsContainer";
import MainMenu from "./MainMenuComp";

const PostScreenHeader = ({ navigation, /* title, link, */ options }: any) => {
  const [saved, setSaved] = useState(false);

  const _bookMarkPost = () => {
    setSaved((p) => !p);
  };

  return (
    <SafeAreaView>
      <View style={[options.headerStyle, { height: 50 }]}>
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
          <Text style={styles.text}>News</Text>
        </View>

        <Appbar.Action
          icon={saved ? "bookmark" : "bookmark-outline"}
          onPress={_bookMarkPost}
          color="white"
        />
      </View>
      <MainMenu navigation={navigation} />
    </SafeAreaView>
  );
};

const HeaderContainer = (Comp: React.FC<any>) =>
  class extends WordPressClass {
    componentDidMount() {
      const { route } = this.props;

      const postIndex = this.findPostIndex({ id: route.params.id });

      //post not found in store, will attempt to download it
      if (postIndex === -1) {
        this.fetchPosts({ id: route.params.id });
      }
    }

    render() {
      const { route, ...rest } = this.props;

      const data = this.getSinglePost({ id: route.params.id });

      const post = data ? this.preparePost(data) : ({} as any);

      var args = {
        id: route.params.id,
        link: post.link,
        title: route.params.title,
        ...rest,
      };

      return <Comp {...args} />;
    }
  };

const mapStateToProps = (state: any) => {
  const appIndex = state.globalState.currentApp || 0;

  return {
    url: state.globalState.url,
    posts: state.api[`posts-${appIndex}`],
    appIndex,
  };
};

const Post = compose<React.FC<any>>(connect(mapStateToProps), HeaderContainer);
export default Post(PostScreenHeader);

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
});
