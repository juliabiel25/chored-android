import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { doc, updateDoc } from "firebase/firestore";

import Input from "../components/Input";
import ScreenContainer from "../components/ScreenContainer";
import { auth } from "../firebase";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";

const TaskDetilasScreen = ({ route }) => {
  const navigation = useNavigation();
  const { task } = route.params;
  const [assignee, setAssignee] = useState({uid: task.assignee});
  
  console.log('assignee', assignee);
  
  console.log("Showing details of task: ", task);

  const handleSubmitTask = () => {
    console.log('Submiting changes to doc ', task.id);
    const taskRef = doc(db, "tasks", task.id);
    updateDoc(taskRef, {
      assignee: assignee.uid,
      assignedBy: auth.currentUser.uid
    })
    .then(console.log('Done'));
    
    navigation.replace("Home");
  };
  

  return (
    <ScreenContainer hideMenu>
      <View style={styles.header}>
        <Text style={styles.headerText}>{task.name}</Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          type="assignee"
          value={assignee}
          label="Task assignee"
          onChange={user => setAssignee(user)}
        />
      </View>
      
      <TouchableOpacity onPress={handleSubmitTask} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export default TaskDetilasScreen;

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between"
  },
  button: {
    backgroundColor: "#0782F9",
    padding: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  formContainer: {
    gap: 20    
  }
});
