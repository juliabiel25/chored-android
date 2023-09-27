import {
  Divider,
  Icon,
  List,
  ListItem,
  Modal,
  Text
} from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const AssigneePicker = ({ value, onChange, style }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    updateUsers();
  }, []);

  useEffect(() => {
    console.log("users: ", users);
  }, [users]);

  const updateUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = [];
    querySnapshot.forEach(user => data.push(user.data()));
    const nextUsers = data.filter(user => user.uid !== currentUser.uid);
    console.log("next users: ", nextUsers);
    setUsers([currentUser, ...nextUsers]);
  };

  const handleSelectUser = user => {
    console.log("Selected user: ", user?.email);
    onChange(user);
    setPopupOpen(false);
  };

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = item => {
    const user = item.item;
    return (
      <View>
        <ListItem
          style={styles.listItem}
          title={user?.displayName ?? user?.email}
          // accessoryLeft={renderItemIcon}
          onPress={() => handleSelectUser(user)}
        />
        {user.uid === currentUser.uid && <Divider />}
      </View>
    );
  };

  return (
    <View>
      <Modal
        visible={popupOpen}
        // backdropStyle={styles.backdrop}
        onBackdropPress={() => setPopupOpen(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.header}>Select the assignee</Text>
          <List style={styles.container} data={users} renderItem={renderItem} />
          <TouchableOpacity
            onPress={() => {
              onChange(null);
              setPopupOpen(false);
            }}
            style={styles.redButton}
          >
            <Text style={styles.redText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setPopupOpen(true)}
        style={styles.button}
      >
        <Text>{value?.displayName ?? value?.email ?? "Select"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AssigneePicker;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0000000e",
    padding: 10,
    borderRadius: 7
  },
  icon: {
    width: 50,
    heigh: 50
  },
  modal: {
    width: 350,
    marginTop: 50,
    maxHeight: 620,
    padding: 30,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  backdrop: {
    backgroundColor: "#29343d3a"
  },
  header: {
    fontWeight: 700,
    fontSize: 25
  },
  container: {
    backgroundColor: null,
    paddingVertical: 20
  },
  listItem: {
    backgroundColor: "#f2f2f5a2",
    marginVertical: 4,
    borderRadius: 10
  },
  valueTag: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline"
  },
  redText: {
    color: "red"
  },
  redButton: {
    backgroundColor: "#ff000027",
    padding: 10,
    borderRadius: 10
  }
});
