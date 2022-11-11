import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Headline, IconButton, Text } from "react-native-paper";
import { Col, Row } from "../layouts/FlexBox";
import AudioWaves from "../../assets/audio-waves.svg";
import FrameBox from "../layouts/FrameBox";
import { Audio, AVPlaybackStatus } from "expo-av";
import LoadingComp from "../components/LoadingComp";

interface RadioChannel {
  [index: string]: {};
}
const radioChannelMap: RadioChannel = {
  "VON English Broadcast": {},
  French: {},
  Arabic: {},
  Kiswahili: {},
  Yoruba: {},
  Igbo: {},
  Hausa: {},
  Fulfude: {},
};

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  playThroughEarpieceAndroid: true,
});

function RadioChannelScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("VON English Broadcast");
  const [items, setItems] = useState(
    Object.keys(radioChannelMap).map((key: string) => ({
      label: key,
      value: key,
    }))
  );
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLoaded] = useState(false);

  const sound = useRef(new Audio.Sound());

  const loadAudio = async () => {
    setLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          {
            uri: "http://50.116.99.96:8000/stream",
          },
          {
            isLooping: false,
          },
          false
        );

        if (result.isLoaded === false) {
          setLoading(false);
          setLoaded(false);
        } else {
          sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
          setLoading(false);
          setLoaded(true);
          const result = await sound.current.getStatusAsync();
          if (result.isLoaded) {
            if (result.isPlaying === false) {
              sound.current.playAsync();
              setPlaying(true);
            }
          }
        }
      } catch (error) {
        setLoading(false);
        setLoaded(false);
      }
    } else {
      setLoading(false);
      setLoaded(true);
    }
  };

  const pauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.unloadAsync();
          setPlaying(false);
        }
      }
    } catch (error) {
      setPlaying(true);
    }
  };

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      setLoaded(false);
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      setLoaded(true);

      if (playbackStatus.isPlaying) {
        setPlaying(true);
      } else {
        setPlaying(false);
      }
    }
  };

  useEffect(() => {
    loadAudio();

    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  return (
    <View
      style={{
        paddingTop: "3%",
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
            <Image
              source={require("../../assets/adaptive-icon.png")}
              style={{ width: 200, height: 200 }}
            />
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
        <View style={styles.controlsCOntainer}>
          <Row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <IconButton
              icon="skip-previous"
              size={35}
              onPress={() => {}}
              disabled
            />
            {loading ? (
              <LoadingComp />
            ) : (
              <IconButton
                icon={playing ? "pause-circle" : "play-circle"}
                color="rgba(4, 98, 171, 1)"
                size={35}
                onPress={playing ? pauseAudio : loadAudio}
              />
            )}
            <IconButton
              icon="skip-next"
              size={35}
              onPress={() => {}}
              disabled
            />
          </Row>
        </View>
        <View>
          {Object.entries(radioChannelMap)
            .filter(([key]) => key !== value)
            .map(([title]) => (
              <View
                key={title}
                style={{
                  borderRadius: 3,
                  overflow: "hidden",
                  marginVertical: 6,
                  opacity: 0.7,
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
                    </Col>
                    <AudioWaves height={34} width={34} />
                  </Row>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
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
    marginVertical: 20,
    borderRadius: 30,
  },
});
