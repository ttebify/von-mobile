import React, { useCallback } from "react";
import { Share, StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { compose } from "redux";
import { WordPressClass } from "../builder/containers/WordPressPostsContainer";
import { cancelToken, getApi } from "../redux/api/action";
import MainMenu from "./MainMenuComp";

const PostScreenHeader = ({ navigation, title, link, options }: any) => {
  const _handleShare = useCallback(async () => {
    const template = `${title} ${link}`;

    console.log(link);

    try {
      await Share.share({
        message: template,
        url: link,
        title: title,
      });
    } catch (error) {
      console.error(error);
    }
  }, [title]);

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
          icon="share-variant"
          onPress={_handleShare}
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

const Post = compose<React.FC<any>>(
  connect(mapStateToProps, { getApi, cancelToken }),
  HeaderContainer
);
export default Post(PostScreenHeader);

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
});
