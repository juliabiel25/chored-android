import { Card, Text } from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { CheckBox } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";

const Tile = ({ task, onCheck }) => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);

  const handleTileClick = () => {
    navigation.navigate("TaskDetails", { task: task });
  };

  const handleToggleCheckbox = nextChecked => {
    console.log('task checked: ', task); // id of the task is undefined oof
    onCheck(task);    
    // setChecked(nextChecked);
  };

  return (
    <TouchableOpacity style={styles.tile} onPress={handleTileClick}>
      <View style={globalStyles.horizontalSpaceBetween}>
        <CheckBox
          style={styles.checkbox}
          checked={checked}
          onChange={nextChecked => handleToggleCheckbox(nextChecked)}
        />
        <View style={[styles.tileContent]}>
          <Text style={styles.name}>{task.name}</Text>
          {/* <Text style={styles.dueDate}>{task.dueDate}</Text> */}
          {/* <Text style={styles.assignee}>{task.assignee}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Tile;

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#fff",
    // padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  name: {
    fontSize: 16,
    fontWeight: "700"
  },
  checkbox: {
    padding: 25
  },
  tileContent: {
    padding: 20
  }
});
