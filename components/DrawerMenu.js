import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@ui-kitten/components";
import ProfilePicture from "./ProfilePicture";
import { auth } from "../firebase";

const DrawerMenu = ({ open, toggleDrawer }) => {
  const user = auth.currentUser;

  return (
    <View
      style={[
        styles.drawerContainer,
        open ? styles.drawerOpen : styles.drawerClosed
      ]}
    >
      <View style={styles.topBar}>
        <View style={styles.left}></View>
        <View style={styles.right}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Icon
              style={styles.icon}
              fill="#8F9BB3"
              name="arrow-back-outline"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.drawerContent}>
        <ProfilePicture />
        <Text style={styles.username}>
          {`Hey,\n${user?.displayName ?? user?.email.split("@")[0]}!`}
        </Text>
      </View>
    </View>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  drawerContainer: {
    height: "100%",
    backgroundColor: "#c1c9d6ff",
    padding: 20,
    paddingTop: 60,
    zIndex: 2,
    elevation: 2,
    position: "absolute",
    right: 0,
    width: "100%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  drawerOpen: {
    marginRight: "0%"
  },
  drawerClosed: {
    marginRight: "-100%"
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#c1c9d6ff"
  },
  icon: {
    width: 28,
    height: 28
  },
  drawerContent: {
    display: "flex",
    flexDirection: "column"
    // alignItems: "center"
  },
  username: {
    fontWeight: "700",
    fontSize: 30,
    paddingVertical: 30,
    paddingHorizontal: 20
  }
});
