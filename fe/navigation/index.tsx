import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import Home from "../screens/HomeScreen";
import BottomTab from "./BottomTab";
import PersonalRoomSchedule from "../screens/PersonalRoomSchedule";
import EditTask from "../screens/EditTask";
import AdminRoom from "../screens/AdminRoom";
import AdminRoomDetail from "../screens/AdminRoomSliders/AdminRoomDetail";
import RoomManagmentProfileSetti from "../screens/Profile";
import Settings from "../screens/Settings";
import AddTask from "../screens/AddTask";
import CreateRoom from "../screens/CreateRoom";
import EditRoom from "../screens/EditRoom";
import TaskDetail from "../screens/TaskDetail";
import RoomDetails from "../screens/RoomDetails";

import { RootStackParamList } from "../types";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="EditTask" component={EditTask} />
      <Stack.Screen name="AdminRoom" component={AdminRoom} />
      <Stack.Screen name="AdminRoomDetail" component={AdminRoomDetail} />
      <Stack.Screen name="RoomManagmentProfileSetti" component={RoomManagmentProfileSetti} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen name="CreateRoom" component={CreateRoom} />
      <Stack.Screen name="EditRoom" component={EditRoom} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="RoomDetails" component={RoomDetails} />
      <Stack.Screen name="PersonalRoomSchedule" component={PersonalRoomSchedule} />
    </Stack.Navigator>
  );
}
