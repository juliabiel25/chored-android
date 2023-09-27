import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { CheckBox } from "@ui-kitten/components";

const Checkbox = ({ checked, handleToggle }) => {
  return (
    <CheckBox
      style={styles.checkbox}
      checked={checked}
      onChange={handleToggle}
    />
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    margin: 40
  }
});
