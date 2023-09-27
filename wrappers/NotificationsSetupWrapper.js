import * as Notifications from 'expo-notifications';

import { useEffect, useRef } from "react";

import { registerForPushNotificationsAsync } from "../services/NotificationsService";
import { updatePushToken } from '../services/NotificationsService';
import { useConfigContext } from '../ConfigContext';

const NotificationsSetupWrapper = ({ children }) => {
  const { setExpoPushToken, setNotification } = useConfigContext();
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {    
    // setup push notifications
    registerForPushNotificationsAsync().then(token => {
      // attempt to update push token in the firestore
      setExpoPushToken(token);
      updatePushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received', notification);
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response received: ', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  

  }, []);

  return (
    <>
    {children}
    </>
  )
}

export default NotificationsSetupWrapper;