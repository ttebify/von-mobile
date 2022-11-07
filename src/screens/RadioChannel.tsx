import React, { Fragment, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Card, Headline, Subheading, Text } from "react-native-paper";
import { Col, Row } from "../layouts/FlexBox";

interface RadioChannel {
  [index: string]: {
    frequency: number;
    coverImage: any;
  };
}
const radioChannelMap: RadioChannel = {
  English: {
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  French: {
    frequency: 93.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  Arabic: {
    frequency: 92.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  Kiswahili: {
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  Yoruba: {
    frequency: 98,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  Igbo: {
    frequency: 98.88,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  Hausa: {
    frequency: 98.3,
    coverImage: require("../../assets/radio-bgs.png"),
  },
  Fulfude: {
    frequency: 9,
    coverImage: require("../../assets/radio-bgs.png"),
  },
};

function RadioChannelScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("English");
  const [items, setItems] = useState(
    Object.keys(radioChannelMap).map((key: string) => ({
      label: key,
      value: key,
    }))
  );

  return (
    <Fragment>
      <View style={{ paddingHorizontal: "3%", paddingVertical: "10%" }}>
        <DropDownPicker
          multiple={false}
          open={open}
          min={0}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={value}
          closeAfterSelecting={true}
          closeOnBackPressed={true}
          mode="BADGE"
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderWidth: 0,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#fff",
            borderWidth: 0,
            borderTopWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.23)",
          }}
        />
        <Card.Cover
          source={radioChannelMap[value].coverImage}
          style={{ borderRadius: 10, marginVertical: 20, height: "25%" }}
        />
        <Headline
          style={{
            textAlign: "center",
            fontSize: 32,
            fontWeight: "600",
            color: "rgba(0, 0, 0, 0.72)",
          }}
        >
          {value}
        </Headline>
        <Subheading
          style={{ textAlign: "center", color: "rgba(4, 146, 220, 1)" }}
        >
          {radioChannelMap[value].frequency}
        </Subheading>
        <ScrollView
          style={{ borderRadius: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(radioChannelMap)
            .filter(([key]) => key !== value)
            .map(([title, value]) => (
              <View
                key={title}
                style={{ borderRadius: 10, overflow: "hidden", margin: "2%" }}
              >
                <TouchableOpacity
                  style={{
                    height: 70,
                    elevation: 2,
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch",
                  }}
                  key={title}
                  activeOpacity={0.9}
                  onPress={() => {
                    setValue(title);
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
                      <Text style={styles.title}>{title}</Text>
                      <Text style={styles.frequency}>{value.frequency}</Text>
                    </Col>
                    <View style={{ width: "30%" }}>
                      <Card.Cover
                        style={{ flex: 1 }}
                        source={value.coverImage}
                      />
                    </View>
                  </Row>
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
      </View>
    </Fragment>
  );
}

export default RadioChannelScreen;

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
