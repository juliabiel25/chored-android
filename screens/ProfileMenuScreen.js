import { Menu, MenuItem } from "@ui-kitten/components";
import { StyleSheet, Text, View } from "react-native";

import { Icon } from "@ui-kitten/components";
import ProfilePicture from "../components/ProfilePicture";
import ScreenContainer from "../components/ScreenContainer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../firebase";
import { globalStyles } from "../styles/globalStyles";

const ProfileSettingsScreen = ({ open, toggleDrawer }) => {
  const user = auth.currentUser;
  const onLogoutPress = () => {};

  return (
    <ScreenContainer hideMenu style={styles.backgroundStyle}>
      <View style={[styles.drawerContent, globalStyles.verticalSpaceBetween]}>
        <>
          <ProfilePicture />
          <Text style={styles.username}>
            {`Hey,\n${user?.displayName ?? user?.email.split("@")[0]}!`}
          </Text>
        </>
        {/* <Menu>
          <MenuItem
            style={[styles.menuItemRed, styles.menuItem]}
            title="Logout"
            onPress={onLogoutPress}
          />
        </Menu> 
        signal 
        */}
      </View>
    </ScreenContainer>
  );
};

export default ProfileSettingsScreen;

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
  },
  menuItem: {
    backgroundColor: null
  },
  menuItemRed: {
    color: "#ff4848"
  },
  backgroundStyle: {
    backgroundColor: "hsl(212, 12%, 75%)"
  }
});
