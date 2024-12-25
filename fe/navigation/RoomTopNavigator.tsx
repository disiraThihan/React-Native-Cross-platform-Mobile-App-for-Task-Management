import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../screens/HomeScreen";
import EditTask from "../screens/EditTask";
import Colors from "../constants/Colors";
import AdminRoomDetail from "../screens/AdminRoomSliders/AdminRoomDetail";
import AdminRoomSchedule from "../screens/AdminRoomSliders/AdminRoomSchedule";
import AdminUserManage from "../screens/AdminRoomSliders/AdminUserManagment";
import AdminCreatedTasks from "../screens/AdminRoomSliders/AdminTaskManagment";
import { useGetroomQuery } from "../Redux/API/rooms.api.slice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setRoom } from "../Redux/slices/roomSlice";
import TagButton from "../components/TagButton";

const Tab = createMaterialTopTabNavigator();

const screenListData = [
  { label: "DETAILS", component: AdminRoomDetail },
  { label: "MEMBERS", component: AdminUserManage },
  { label: "TASKS", component: AdminCreatedTasks },
];

const TopBarWithTabs: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(screenListData[0]?.label);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => (
          <View style={styles.tabBar}>
            {screenListData.map(({ label }) => (
              <TagButton
                isSelected={selectedTab === label}
                onClick={() => {
                  setSelectedTab(label);
                  navigation.navigate(label as any);
                }}
              >
                {label}
              </TagButton>
            ))}
          </View>
        )}
      >
        {screenListData.map(({ component, label }) => (
          <Tab.Screen name={label} component={component} />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent", // Set the background color of the tab bar
    paddingHorizontal: 20,
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: Colors.purpletext, // Set the background color of each tab button
    borderRadius: 10, // Set the border radius for rounded corners
  },
  tabBarButtonText: {
    fontWeight: "bold",
  },
});

export default TopBarWithTabs;
