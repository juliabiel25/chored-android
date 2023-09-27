import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import Tile from "./Tile";

const TileList = ({ tasks, onCheck }) => {
  return (
    <View>
      <ScrollView style={styles.tileList}>
        {tasks.map(task => (
          <Tile key={task.id} task={task} onCheck={onCheck} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TileList;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "700"
  },
  tileList: {
    display: "flex",
    paddingTop: 10
  }
});
