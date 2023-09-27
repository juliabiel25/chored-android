import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { Tab, TabBar } from "@ui-kitten/components";
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "@firebase/firestore";
import { useEffect, useState } from "react";

import ScreenContainer from "../components/ScreenContainer";
import { Text } from "@ui-kitten/components";
import TileList from "../components/TileList";
import { auth } from "../firebase";
import { db } from "../firebase";
import { sendPushNotification } from "../services/NotificationsService";
import { useConfigContext } from "../ConfigContext";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {  
  const {expoPushToken} = useConfigContext();  
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // update data after opening the homescreen by default
    updateData();
    
    // start a listener for changes on the tasks collection
    const unsubscribe = onSnapshot(collection(db, "tasks"), collection => {
      const source = collection.metadata.hasPendingWrites ? "Local" : "Server";
      console.log("Tasks update detected from source: ", source);
      updateData();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    updateData();
  }, [selectedIndex]);

  const updateData = async () => {    
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where('finished','==', false));
    const querySnapshot = await getDocs(q);
    
    const data = [];
    querySnapshot.forEach(doc => {
      const docData = doc.data();
      data.push({ id: doc.id, ...docData });      
    });
    // console.log("Retrieved tasks data:", data);

    const nextTasks = data.map(taskData => ({
      id: taskData.id,
      name: taskData.name,
      description: taskData.description,
      dueDate: Date(taskData.dueDate),
      assignee: taskData.assignee
    }));

    setTasks(nextTasks);
  };

  const handleAddTasks = () => {
    navigation.navigate("AddTask");
  };

  const handleTaskChecked = (task) => {
    console.log('Updating task ', task.id, task.name);
    const taskRef = doc(db, "tasks", task.id);
    updateDoc(taskRef, {
      finished: true
    })
    .then(console.log('Done'));
  }
  
  const userUnfinishedTasks = tasks.filter(task => !task?.finished && task.assignee === auth.currentUser.uid);
  const unnassignedUnfinishedTasks = tasks.filter(task => !task?.finished && !task.assignee);
  
  return (
    <ScreenContainer hideGoBack>
      <View style={styles.header}>
        <Text style={styles.headerText}>All tasks</Text>
        <TouchableOpacity onPress={handleAddTasks} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TabBar
        style={styles.tabBar}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <Tab title="My tasks" />
        <Tab title="Unassigned" />
      </TabBar>
      <TileList tasks={selectedIndex === 0 ? userUnfinishedTasks : unnassignedUnfinishedTasks} onCheck={handleTaskChecked}/>
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20
  },
  button: {
    backgroundColor: "#0782F9",
    height: 40,
    width: 40,
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
    justifyContent: "space-between"
  },
  tabBar: {
    backgroundColor: null
  }
});
