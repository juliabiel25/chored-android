import * as Notifications from 'expo-notifications';
import * as eva from "@eva-design/eva";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import AddTaskScreen from "./screens/AddTaskScreen";
import { ConfigContextProvider } from './ConfigContext';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import NotificationsSetupWrapper from './wrappers/NotificationsSetupWrapper';
import ProfileSettingsScreen from "./screens/ProfileMenuScreen";
import TaskDetilasScreen from "./screens/TaskDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// assign foreground notification handling
console.log('Setting up bg notification handling');
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
}); 

export default function App() {

  return (
    <ConfigContextProvider>
      <NotificationsSetupWrapper>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="AddTask" component={AddTaskScreen} />
              <Stack.Screen name="TaskDetails" component={TaskDetilasScreen} />
              <Stack.Screen
                name="ProfileSettings"
                component={ProfileSettingsScreen}
                />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>      
      </NotificationsSetupWrapper>
    </ConfigContextProvider>
  );
}
