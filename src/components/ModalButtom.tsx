import {
  Modal,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect } from "react";
import { IconButton } from "react-native-paper";
import { Row } from "../layouts/FlexBox";

export type ModalBottomProps = {
  visible: boolean;
  setVisible: (arg: any) => any;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>; // Make it cutomizable
  modalTitle: string;
  modalFooter: React.ReactNode;
};

const ModalBottom = ({
  visible,
  setVisible,
  children,
  containerStyle,
  modalTitle,
  modalFooter,
}: ModalBottomProps) => {
  const dismiss = () => setVisible(false);

  useEffect(() => {
    // clears the modal
    return () => {
      dismiss();
    };
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      presentationStyle="overFullScreen"
      // The onRequestClose callback is called when the user taps the hardware back button on Android or the menu button on Apple TV.
      onRequestClose={dismiss}
    >
      <View style={styles.viewWrapper}>
        <Row
          style={{
            paddingVertical: 12,
            paddingRight: "6%",
            borderBottomWidth: 1,
            borderColor: "rgba(4, 80, 139, 0.19)",
          }}
        >
          <IconButton
            size={20}
            icon="close"
            color="rgba(4, 80, 139, 0.19)"
            style={{ borderWidth: 1, borderColor: "rgba(4, 80, 139, 0.19)" }}
            onPress={dismiss}
          />
          <Text
            style={{
              fontSize: 14,
              textAlign: "left",
              fontWeight: "300",
              paddingRight: 20,
            }}
          >
            {modalTitle}
          </Text>
        </Row>
        <ScrollView
          style={[styles.modalView, containerStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        <View style={styles.footerContainer}>{modalFooter}</View>
      </View>
    </Modal>
  );
};

export default ModalBottom;

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  modalView: {
    backgroundColor: "white",
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
  },
  closeSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
  },
  closeIconSection: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "rgba(4, 80, 139, 0.19)",
  },
});
