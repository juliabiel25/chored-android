import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";

const CustomTopNavigation = ({ hideMenu, hideGoBack, style }) => {
  const navigation = useNavigation();
  const [canGoBack, setCanGoBack] = useState(navigation.canGoBack);

  useEffect(() => {
    setCanGoBack(navigation.canGoBack);
  }, [navigation]);

  const handleMenuClick = () => {
    // toggleDrawer();
    navigation.navigate("ProfileSettings");
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.topBar, style]}>
      <View style={styles.left}>
        {canGoBack && !hideGoBack && (
          <TouchableOpacity onPress={handleNavigateBack}>
            <Icon
              style={styles.icon}
              fill="#8F9BB3"
              name="arrow-ios-back-outline"
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.right}>
        {!hideMenu && (
          <TouchableOpacity onPress={handleMenuClick}>
            <Icon style={styles.icon} fill="#8F9BB3" name="menu-outline" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTopNavigation;

const styles = StyleSheet.create({
  container: {
    minHeight: 128
  },
  topBar: {
    padding: 20,
    paddingTop: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // zIndex: 3,
    // elevation: 3,
    backgroundColor: "#dde2ebff"
  },
  icon: {
    width: 28,
    height: 28
  }
});
