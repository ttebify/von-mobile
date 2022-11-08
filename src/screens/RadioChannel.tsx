import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Headline, IconButton, Subheading, Text } from "react-native-paper";
import { Col, Row } from "../layouts/FlexBox";
import AudioWaves from "../../assets/audio-waves.svg";
import AudioWavesLarge from "../../assets/audio-waves-large.svg";
import FrameBox from "../layouts/FrameBox";

interface RadioChannel {
  [index: string]: {
    frequency: number;
  };
}
const radioChannelMap: RadioChannel = {
  English: {
    frequency: 98.3,
  },
  French: {
    frequency: 93.3,
  },
  Arabic: {
    frequency: 92.3,
  },
  Kiswahili: {
    frequency: 98.3,
  },
  Yoruba: {
    frequency: 98,
  },
  Igbo: {
    frequency: 98.88,
  },
  Hausa: {
    frequency: 98.3,
  },
  Fulfude: {
    frequency: 9,
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
    <View
      style={{
        paddingTop: "5%",
        flex: 1,
      }}
    >
      <View style={{ paddingHorizontal: "3%" }}>
        <DropDownPicker
          multiple={false}
          open={open}
          min={0}
          value={value}
          items={items}
          disabled
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
            borderColor: "rgba(0, 0, 0, 0.23)",
            elevation: 5,
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: "3%" }}
        overScrollMode="never"
      >
        <LinearGradient
          colors={["rgba(4, 146, 220, 1)", "rgba(4, 98, 171, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[
            {
              borderRadius: 10,
              marginVertical: 20,
              height: 235,
            },
          ]}
        >
          <FrameBox>
            <AudioWavesLarge />
          </FrameBox>
        </LinearGradient>

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
        <View>
          {Object.entries(radioChannelMap)
            .filter(([key]) => key !== value)
            .map(([title, value]) => (
              <View
                key={title}
                style={{
                  borderRadius: 3,
                  overflow: "hidden",
                  marginVertical: 6,
                }}
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
                  disabled
                >
                  <Row
                    style={{
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <Col
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.title}>{title}</Text>
                      <Text style={styles.frequency}>{value.frequency}</Text>
                    </Col>
                    <AudioWaves height={54} width={54} />
                  </Row>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
      <View style={styles.controlsCOntainer}>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <IconButton
            icon="skip-previous"
            size={35}
            onPress={() => {}}
            disabled
          />
          <IconButton
            icon="play-circle"
            color="rgba(4, 98, 171, 1)"
            size={35}
            onPress={() => {}}
          />
          <IconButton icon="skip-next" size={35} onPress={() => {}} disabled />
        </Row>
      </View>
    </View>
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
  controlsCOntainer: {
    backgroundColor: "white",
    height: 60,
    paddingHorizontal: "10%",
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: "#000000",
    elevation: 4,
    marginTop: 1,
  },
});
