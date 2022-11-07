import { Text, TouchableOpacity, View } from "react-native";
import React, { Fragment } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "./Spacer";

const icons: React.ComponentProps<typeof MaterialCommunityIcons>["name"][] = [
  "home-variant",
  "radio-tower",
  "video",
  "shape",
];

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              merge: true,
              params: undefined,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fragment>
              <MaterialCommunityIcons
                name={icons[index]}
                color={isFocused ? "rgba(4, 98, 171, 0.97)" : "#929292"}
                size={24}
              />
              <Spacer />
              <Text
                style={{
                  color: isFocused ? "rgba(4, 98, 171, 0.97)" : "#929292",
                  fontSize: 10,
                  fontWeight: "400",
                }}
              >
                {typeof label === "string" ? label : null}
              </Text>
            </Fragment>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;
