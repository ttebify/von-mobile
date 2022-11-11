import { Formik } from "formik";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Paragraph, TextInput } from "react-native-paper";
import { Row } from "../../layouts/FlexBox";
import {
  clearAnonymousCommenter,
  getAnonymousCommenter,
  saveAnonymousCommenter,
} from "../../utils";
import * as Yup from "yup";
import Spacer from "../Spacer";
import Collapsible from "react-native-collapsible";
import type { Comment, User } from "../../types";
import Divider from "../Divider";

interface Props {
  postCommtentHandler: (data: any) => Promise<any>;
  postId: number;
  addToOfflineComment: (data: {
    postId: number;
    comment: Comment;
  }) => Promise<any>;
}

const emptyUser = {
  author_name: "",
  author_email: "",
};

function CommentTextBox({
  postCommtentHandler,
  postId,
  addToOfflineComment,
}: Props) {
  const [submiting, setSubmiting] = useState(false);
  const [text, setText] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [initialValues, setInitialValues] = useState<User>(emptyUser);

  const ValidationSchema = Yup.object().shape({
    author_name: Yup.string().required("Required").trim(),
    author_email: Yup.string().email("Invalid").required("Required").trim(),
  });

  useEffect(() => {
    getAnonymousCommenter().then((user) => user && setInitialValues(user));
  }, []);

  const addComment = useCallback(async () => {
    if (submiting || text.length == 0) return;

    setSubmiting(true);
    getAnonymousCommenter()
      .then((user) => {
        if (user?.author_email.length) {
          setCollapsed(true);

          // Post comment
          const data = {
            content: text,
            post: postId,
            parent: 0,
            ...user,
          };

          return postCommtentHandler(data).then(async (res) => {
            const data = await res.data;
            if (data) {
              setText("");
              return addToOfflineComment({ postId, comment: data });
            }
          });
        } else {
          setCollapsed(false);
        }
      })
      .catch((err) => {
        console.log("Error adding comment", err);
      })
      .finally(() => {
        setSubmiting(false);
      });
  }, [text, submiting, postId]);

  const addUser = (values, { setSubmitting }) => {
    setCollapsed(true);
    saveAnonymousCommenter(values)
      .then(() => {
        setCollapsed(true);
      })
      .catch((err) => {
        console.log("Faild to save", err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const deleteAnonymousUser = () => {
    clearAnonymousCommenter();
    setInitialValues(emptyUser);
    setCollapsed(true);
  };

  return (
    <View>
      <Collapsible collapsed={collapsed}>
        <IconButton icon="close" onPress={() => setCollapsed(true)} />
        <View style={styles.commentSettingContainer}>
          <Paragraph>
            Before you can comment, enter your name and email
          </Paragraph>
          <View>
            <Formik
              validationSchema={ValidationSchema}
              initialValues={initialValues}
              enableReinitialize
              onSubmit={addUser}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isValid,
                isSubmitting,
              }) => (
                <Fragment>
                  <TextInput
                    label="Full name"
                    value={values.author_name}
                    defaultValue={initialValues.author_name}
                    onChangeText={handleChange("author_name")}
                    style={styles.textInput}
                    mode="outlined"
                    outlineColor="rgba(0, 0, 0, 0.23)"
                    activeOutlineColor="rgba(4, 146, 220, 1)"
                    error={Boolean(errors.author_name?.length)}
                  />
                  <TextInput
                    label="Email"
                    value={values.author_email}
                    defaultValue={initialValues.author_email}
                    onChangeText={handleChange("author_email")}
                    style={styles.textInput}
                    mode="outlined"
                    outlineColor="rgba(0, 0, 0, 0.23)"
                    activeOutlineColor="rgba(4, 146, 220, 1)"
                    error={Boolean(errors.author_email?.length)}
                  />
                  <Row style={{ justifyContent: "space-between" }}>
                    <Button
                      mode="contained"
                      style={styles.button}
                      onPress={deleteAnonymousUser}
                      color="#CF3200"
                    >
                      Delete
                    </Button>
                    <Button
                      mode="contained"
                      style={styles.button}
                      onPress={handleSubmit}
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                      color="rgba(4, 98, 171, 1)"
                    >
                      Save
                    </Button>
                  </Row>
                  <Divider />
                </Fragment>
              )}
            </Formik>
          </View>
        </View>
      </Collapsible>
      <TextInput
        mode="outlined"
        label="write a comment"
        value={text}
        onChangeText={(text) => setText(text)}
        multiline
        numberOfLines={4}
        style={{ width: "100%", backgroundColor: "white" }}
        outlineColor="rgba(0, 0, 0, 0.07)"
      />
      <Spacer size={5} />
      <Row style={{ position: "relative", justifyContent: "space-between" }}>
        <IconButton
          icon="cog-outline"
          color="rgba(4, 98, 171, 1)"
          onPress={() => setCollapsed(false)}
          size={20}
          style={{ margin: 0 }}
        />
        <Button
          icon="send"
          contentStyle={{ flexDirection: "row-reverse" }}
          disabled={submiting}
          onPress={addComment}
          color="rgba(4, 98, 171, 1)"
          mode="contained"
          loading={submiting}
        >
          Send
        </Button>
      </Row>
    </View>
  );
}

export default CommentTextBox;

const styles = StyleSheet.create({
  commentSettingContainer: {
    paddingHorizontal: "5%",
  },
  textInput: {
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
  },
  header: {},
  headerText: {},
  content: { backgroundColor: "red", width: "100%" },
});
