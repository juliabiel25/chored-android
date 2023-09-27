import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { collection, getDocs, query, updateDoc, where } from "@firebase/firestore";

import Constants from "expo-constants";
import { Platform } from 'react-native';
import { auth } from '../firebase';
import { db } from '../firebase';

export const createNotificationMessage = (expoPushToken, title, body, data) => {
  const message = {
    to: expoPushToken.data,
    sound: 'default',
    title,
    body,
    data,
  };
  console.log('Notification message: ', message);
  return message;
}

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
export async function sendPushNotification(message) {
  console.log('Sending a push notification...');
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(console.log('Notification sent'));
}

export async function broadcastPushNotification(messages) {
  console.log('Broadcasting a push notification');
  messages.forEach(async (message) => await sendPushNotification(message));
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // get projectId from app config
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log('Generated expo push token: ', token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


export const updatePushToken = async (token) => {  
  console.log('Update push token called');
  
  if (!auth.currentUser || !token) {
    console.log('No logged in user or no push token was generated - cannot update the push token');
    return;
  };
    
  const uid = auth.currentUser.uid;  
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  
  const userRefs = [];
  querySnapshot.forEach(doc => userRefs.push(doc.ref));
    
  console.log('Updating push token of user: ', uid, ' to: ', token);
  updateDoc(userRefs[0], { expoPushToken: token })
  .then(console.log('User push token was updated'))
}