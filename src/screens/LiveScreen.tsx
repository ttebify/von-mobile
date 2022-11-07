import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Col, Row } from "../layouts/FlexBox";

interface RadioChannel {
  title: string;
  frequency: number;
  coverImage: any;
}
const radioChannels: RadioChannel[] = [
  {
    title: "English",
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  {
    title: "French",
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  {
    title: "Arabic",
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  {
    title: "Kiswahili",
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  {
    title: "Yoruba",
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  {
    title: "Igbo",
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  {
    title: "Hausa",
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  {
    title: "Fulfude",
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
];

export default function LiveScreen({ navigation }) {
  const { navigate } = navigation;
  const _renderItem = ({ item: channel }: { item: RadioChannel }) => {
    return (
      <View style={{ borderRadius: 10, overflow: "hidden", margin: "2%" }}>
        <TouchableOpacity
          style={{
            height: 70,
            elevation: 2,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
          }}
          key={channel.title}
          activeOpacity={0.9}
          onPress={() => {
            navigate("RadioChannelScreen");
          }}
        >
          <Row
            style={{
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Col
              style={{
                margin: 10,
                justifyContent: "center",
              }}
            >
              <Text style={styles.title}>{channel.title}</Text>
              <Text style={styles.frequency}>{channel.frequency}</Text>
            </Col>
            <View style={{ width: "30%" }}>
              <Card.Cover style={{ flex: 1 }} source={channel.coverImage} />
            </View>
          </Row>
        </TouchableOpacity>
      </View>
    );
  };

  return <FlatList data={radioChannels} renderItem={_renderItem} />;
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.88)",
    fontSize: 16,
    lineHeight: 17,
    marginBottom: 10,
  },
  frequency: {
    color: "rgba(4, 146, 220, 1)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "600",
  },
});
