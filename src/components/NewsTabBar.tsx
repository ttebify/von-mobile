import { View, FlatList, TouchableOpacity, Animated } from "react-native";

export function NewsTabBar({ state, descriptors, navigation, position }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <FlatList
        data={state.routes}
        horizontal
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: route, index }) => {
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

              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0.6)),
          });
          const barOpacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          });

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={route.name}
            >
              <Animated.Text
                style={{ opacity, paddingHorizontal: 18, paddingVertical: 16 }}
              >
                {label}
              </Animated.Text>
              <Animated.View
                style={{
                  opacity: barOpacity,
                  backgroundColor: "#5294d6",
                  height: 2,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
