import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import CustomTopNavigation from "./CustomTopNavigation";
import { useState } from "react";
import DrawerMenu from "./DrawerMenu";
import { KeyboardAvoidingView } from "react-native";

const ScreenContainer = ({
  children,
  hideNavigation,
  hideMenu,
  hideGoBack,
  style
}) => {
  const navigation = useNavigation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerOpen = () => {
    setDrawerOpen(prev => !prev);
  };

  return (
    <KeyboardAvoidingView style={[styles.screenContainer, style]}>
      <TouchableWithoutFeedback
        style={styles.dismissKeyboard}
        onClick={() => Keyboard.dismiss()}
      >
        <View>
          {!hideNavigation && (
            <CustomTopNavigation
              hideMenu={hideMenu}
              hideGoBack={hideGoBack}
              style={style}
            />
          )}
          <View style={styles.padding}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  screenContainer: {
    minHeight: "100%",
    backgroundColor: "#dde2ebff"
  },
  padding: {
    padding: 20
  },
  dismissKeyboard: {
    zIndex: 10,
    height: "100%",
    width: "100%",
    backgroundColor: "red"
  }
});
