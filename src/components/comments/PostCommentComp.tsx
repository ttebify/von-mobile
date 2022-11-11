import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import FrameBox from "../../layouts/FrameBox";
import HTML from "react-native-render-html";
import { width } from "../../layouts/dimensions";
import Spacer from "../Spacer";

interface CommentProps {
  comments: any[];
  fetching: boolean;
  fetchCommentsHandler: () => void;
}

const tagsStyles = {
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(120, 120, 120, 1)",
    fontWeight: "400" as const,
  },
};

function PostComments({
  comments,
  fetching,
  fetchCommentsHandler,
}: CommentProps) {
  if (fetching) {
    return (
      <FrameBox style={{ padding: 30 }}>
        <Spacer size={30} />
        <Text>Fetching comments...</Text>
      </FrameBox>
    );
  } else if (!fetching && comments.length === 0) {
    return (
      <View style={{ padding: 30 }}>
        <Text style={{ textAlign: "center", marginVertical: 10 }}>
          There are currently no approved comments for this post.
        </Text>
        <Button
          icon="refresh"
          mode="outlined"
          uppercase={false}
          onPress={fetchCommentsHandler}
        >
          Fetch comments
        </Button>
      </View>
    );
  } else
    return (
      <View>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.container}>
            <Text>{comment.author}</Text>
            <Text style={styles.date}>{comment.date}</Text>
            <HTML
              contentWidth={width}
              source={{ html: comment.content }}
              tagsStyles={tagsStyles}
            />
            {comment.status === "hold" && (
              <Text style={styles.smallText}>
                Your comment is awaiting moderation.
              </Text>
            )}
          </View>
        ))}
      </View>
    );
}

export default PostComments;

const styles = StyleSheet.create({
  actionButtons: {
    margin: 6,
    borderWidth: 2,
    borderRadius: 20,
  },
  container: {
    marginBottom: 10,
    backgroundColor: "rgba(240, 240, 240, 1)",
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
    elevation: 10,
    shadowColor: "rgba(0, 0, 0, 0.07)",
  },
  date: {
    fontSize: 12,
    opacity: 0.6,
  },
  content: {
    color: "rgba(174, 174, 174, 1)",
  },
  smallText: {
    fontSize: 10,
    color: "rgba(4, 98, 171, 1)",
  },
});
