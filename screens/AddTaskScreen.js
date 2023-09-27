import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { broadcastPushNotification, createNotificationMessage, sendPushNotification } from "../services/NotificationsService";
import { useEffect, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../components/Input";
import ScreenContainer from "../components/ScreenContainer";
import { auth } from "../firebase";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const AddTaskScreen = () => {


  const navigation = useNavigation();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState(new Date());
  const [assignee, setAssignee] = useState();

  const handleDueDateChange = (event, newDate) => {
    setDueDate(newDate);
  };

  const sendAssigneeNotification = async (assignee) => {
    console.log('Sending new task notification to: ', assignee);

    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach(user => {
      const userData = user.data();
      // if (userData.uid != cuid) // temporarily broadcast to all to show it works
        users.push(userData);
    });

    const targetUser = users.find(user => user.uid == assignee.uid);

    const title = "New task";
    const body = "A new task was assigned to you!"    
    const message = createNotificationMessage(targetUser.expoPushToken, title, body);

    await sendPushNotification(message);
  }

  const broadcastUnassignedNotification = async () => {
    console.log('Broadcasting notifications about an unassigned task to all users');
    
    const cuid = auth.currentUser.uid;  
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach(user => {
      const userData = user.data();
      // if (userData.uid != cuid) // temporarily broadcast to all to show it works
        users.push(userData);
    });
    
    const targetPushTokens = users.filter(user => user.expoPushToken).map(user => user.expoPushToken);
    console.log('Target push tokens: ', targetPushTokens);
    
    const title = "New task";
    const body = "A new unasigned task was just added!"
    const messages = targetPushTokens.map(token => createNotificationMessage(token, title, body));

    await broadcastPushNotification(messages);
    // await sendPushNotification({to: "ExponentPushToken[X42xZQN4xjHpXehbx7Kfol]", title: "uwu", sound: "default", body: "oh yeah"})
  }

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
      .then(async () => {
        console.log("Task successfully submitted!");
        if (assignee) {
          await sendAssigneeNotification(assignee);
        }
        else {
          await broadcastUnassignedNotification();
        }
      })
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
