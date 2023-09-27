import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addDoc, collection } from "@firebase/firestore";

import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../components/Input";
import ScreenContainer from "../components/ScreenContainer";
import { auth } from "../firebase";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState(new Date());
  const [assignee, setAssignee] = useState();

  const handleDueDateChange = (event, newDate) => {
    setDueDate(newDate);
  };

  const handleSubmitTask = async () => {
    const docRef = await addDoc(collection(db, "tasks"), {
      name,
      description,
      dueDate,
      assignee: assignee?.uid,
      createdOn: new Date(),
      finished: false,
      assignedBy: assignee ? auth.currentUser.uid : undefined
    })
      .then(console.log("Task successfully submitted!"))
      .catch(err =>
        console.log(
          "An error occured while submitting a new task to firestore: ",
          err
        )
      );

    navigation.replace("Home");
  };

  return (
    <ScreenContainer hideMenu>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create a task</Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          value={name}
          label="Task name"
          onChange={nextValue => setName(nextValue)}
        />
        <Input
          // type="multiline"
          value={description}
          label="Task description"
          onChange={nextValue => setDescription(nextValue)}
        />
        {/* <Input
          type="datetime"
          value={dueDate}
          label="Task due date"
          onChange={handleDueDateChange}
        /> */}
        <Input
          type="assignee"
          value={assignee}
          label="Task assignee"
          onChange={user => setAssignee(user)}
        />
      </View>

      <TouchableOpacity onPress={handleSubmitTask} style={styles.button}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0782F9",
    padding: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
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
