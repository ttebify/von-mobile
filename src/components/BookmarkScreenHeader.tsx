import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu, Provider } from "react-native-paper";
import OfflineDataContainer from "../containers/OfflineDataContainer";

const BookmarkScreenHeader = ({ navigation, options, clearBookmark }: any) => {
  const [visible, setVisible] = React.useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <SafeAreaView>
      <View style={[options.headerStyle]}>
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
          <Text style={styles.text}>Saved News</Text>
        </View>
        <Provider>
          <View
            style={{
              marginLeft: "auto",
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Appbar.Action
                  icon="dots-vertical"
                  onPress={openMenu}
                  color="white"
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  clearBookmark();
                }}
                title="Remove All"
              />
            </Menu>
          </View>
        </Provider>
      </View>
    </SafeAreaView>
  );
};

export default OfflineDataContainer(BookmarkScreenHeader);

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
});
