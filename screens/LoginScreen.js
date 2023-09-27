import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "@firebase/auth";

import Input from "../components/Input";
import { updatePushToken } from '../services/NotificationsService';
import { useConfigContext } from '../ConfigContext';
import { useNavigation } from "@react-navigation/core";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {expoPushToken} = useConfigContext();
    
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const saveNewUserDoc = async user => {
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      createdAt: user.createdAt
    })
      .then(console.log("User successfully saved in the db"))
      .catch(err =>
        console.log(
          "ERROR: Could not save the user information to the db: ",
          err
        )
      );
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredentials => {
        const user = userCredentials.user;
        await saveNewUserDoc(user);
        console.log("Registered with:", user.email);
        
        updatePushToken(expoPushToken);
      })
      .catch(error => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Logged in with:", user.email);
      
      updatePushToken(expoPushToken);
    })
    .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container} >
      <View style={styles.formContainer}>
        <Input
          type="text"
          label="Email"
          value={email}
          onChange={text => setEmail(text)}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={text => setPassword(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonOutline: {
    backgroundColor: "#d3dee9",
    marginTop: 5
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16
  },
  formContainer: {
    width: "80%"
  }
});
